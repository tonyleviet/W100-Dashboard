import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import {
  UserModel,
  IStore,
  IAddUserStoreBody,
  IStoreAssignedUser,
  IService,
} from "@app/modules/user-management/_models/user.model";
import { BehaviorSubject, Subscription, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@app/core-ui/reducers";
import {
  FetchAllStoresAction,
  FetchUserStoresAction,
  AddUserStoreAction,
  RemoveUserStoreAction,
  FetchStoreDetailsAction,
  UpdateUserStoreAction,
  FetchAllServicesAction,
} from "@app/modules/user-management/_actions/user.actions";
import {
  selectAllStores,
  selectStoresAssigned,
  selectAssignStoreAction,
  selectStoreDetails,
  selectAllServices
} from "@app/modules/user-management/_selectors/user.selectors";
import { FormControl } from "@angular/forms";
import { skip } from "rxjs/operators";
import { MatDialog } from '@angular/material';
import { EditAssignedStoreDialogComponent } from './edit-assigned-store-dialog/edit-assigned-store-dialog.component';

@Component({
  selector: "user-assign-stores-tab",
  templateUrl: "./assign-stores.component.html",
  styleUrls: ["./assign-stores.component.scss"],
})
export class AssignStoresComponent implements OnInit, OnDestroy {
  @Input("user") userData: UserModel;
  @Input("active") isActive: boolean = false;

  public fetchAllStoresLoading$: BehaviorSubject<boolean>;
  public fetchAssignedStoresLoading$: BehaviorSubject<boolean>;

  // Store
  public storeCodeCtrl = new FormControl();
  public listStoreCodes: Set<number>;
  public listAllStores: IStore[];
  public shouldResetAssignStoreForm$: BehaviorSubject<boolean>;
  public listStoreAssigned: IStoreAssignedUser[];
  public listServices: IService[];
  public services$: Observable<IService[]>;
  public listServices$: BehaviorSubject<IService[]>;

  private isAssignAction: boolean; // Detect on assign store action
  private subscriptions: Subscription[];

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.fetchAllStoresLoading$ = new BehaviorSubject<boolean>(true);
    this.fetchAssignedStoresLoading$ = new BehaviorSubject<boolean>(true);
    this.shouldResetAssignStoreForm$ = new BehaviorSubject<boolean>(false);
    this.listAllStores = [];
    this.listServices = [];
    this.listServices$ = new BehaviorSubject<IService[]>([]);
    this.listStoreCodes = new Set<number>();
    this.subscriptions = [];
    this.isAssignAction = false;
  }

  ngOnInit() {
    this.fetchServices();
    this.fetchAssignedStores();
    this.subscribeStoreDetails();
    this.subscribeStore();
    this.subscribeFetchAllServicesAction();
    this.subscribeUserStores();
    this.subscribeAssignStoreAction();
  }

  fetchServices() {
    this.store.dispatch(new FetchAllServicesAction());
  }

  subscribeFetchAllServicesAction() {
    this.services$ = this.store.pipe(select(selectAllServices));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((u) => u.unsubscribe());
  }

  onStoreSelecting(data: IStore) {
    if (data) {
      this.fetchAllStoresLoading$.next(true);
      this.store.dispatch(
        new FetchStoreDetailsAction({ storeId: data.StoreId })
      );
    }
  }

  onAssignStoreSubmit(
    data: {
      store: IStore;
      pin: string;
      services: number[];
  }) {
    const body: IAddUserStoreBody = {
      userId: this.userData.UserId,
      storeId: data.store.StoreId,
      storeCode: data.store.StoreCode,
      pin: data.pin,
      acl: {
        Services: data.services,
      },
    };

    this.store.dispatch(new AddUserStoreAction({ data: body }));
    this.fetchAllStoresLoading$.next(true);
    this.isAssignAction = true;
  }

  onUpdateStore(body: IAddUserStoreBody) {
    this.store.dispatch(new UpdateUserStoreAction({ data: body }));
  }

  onUnAssignStore(assignedStore: IStoreAssignedUser) {
    if (!this.userData || !assignedStore) {
      return;
    }

    this.store.dispatch(
      new RemoveUserStoreAction({
        userId: this.userData.UserId,
        storeId: assignedStore.StoreId,
      })
    );
  }

  onOpenEditDialog(assignedStore: IStoreAssignedUser) {
    if (!assignedStore) {
      return;
    }

    this.store.dispatch(
      new FetchStoreDetailsAction({ storeId: assignedStore.StoreId })
    );

    this.dialog.open(EditAssignedStoreDialogComponent, {
      width: "400px",
      panelClass: "",
      data: {
        services$: this.listServices$,
        store: assignedStore,
      },
    });
  }

  private subscribeStore() {
    this.store.dispatch(new FetchAllStoresAction());

    // Get All stores
    const storeSubscription = this.store
      .pipe(select(selectAllStores))
      .subscribe((stores) => {
        if (stores) {
          this.listAllStores = [...stores];
        }

        this.fetchAllStoresLoading$.next(false);
      });

    this.subscriptions.push(storeSubscription);
  }

  private subscribeUserStores() {
    const assignedStoresSubscribe = this.store
      .pipe(select(selectStoresAssigned))
      .subscribe((stores) => {
        if (stores) {
          this.listStoreAssigned = stores;

          stores.forEach((store) => {
            this.listStoreCodes.add(+store.StoreCode);
          });
        }

        this.fetchAssignedStoresLoading$.next(false);
      });

    this.subscriptions.push(assignedStoresSubscribe);
  }

  private subscribeStoreDetails() {
    const serviceSubscribe = this.store
      .pipe(select(selectStoreDetails))
      .subscribe((store) => {
        if (store && store.StoreServices && store.StoreServices.length) {
          this.listServices = store.StoreServices;
          this.listServices$.next(store.StoreServices);
        }

        this.fetchAllStoresLoading$.next(false);
      });

    this.subscriptions.push(serviceSubscribe);
  }

  private fetchAssignedStores() {
    if (this.userData) {
      this.fetchAssignedStoresLoading$.next(true);
      this.store.dispatch(
        new FetchUserStoresAction({ userId: this.userData.UserId })
      );
    }
  }

  private subscribeAssignStoreAction() {
    const assignActionSubscribe = this.store
      .pipe(skip(1), select(selectAssignStoreAction))
      .subscribe((isSuccess) => {
        if (isSuccess !== null) {
          this.fetchAllStoresLoading$.next(false);

          if (isSuccess === true) {
            this.fetchAssignedStores();

            // Reset assign form
            if (this.isAssignAction) {
              this.shouldResetAssignStoreForm$.next(true);
              this.isAssignAction = false;
            }
          }
        }
      });

    this.subscriptions.push(assignActionSubscribe);
  }
}
