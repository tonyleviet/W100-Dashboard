import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  IStoreAssignedUser,
  IService,
  IAddUserStoreBody,
} from "@app/modules/user-management/_models/user.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "@app/core-ui/reducers";
import { UpdateUserStoreAction } from "@app/modules/user-management/_actions/user.actions";
import { BehaviorSubject, Subscription } from "rxjs";
import { skip } from "rxjs/operators";
import { selectAssignStoreAction } from "@app/modules/user-management/_selectors/user.selectors";
import { includes, find } from 'lodash';
import { AdminConfig } from '@app/core';

@Component({
  selector: "edit-assigned-store-dialog",
  templateUrl: "./edit-assigned-store-dialog.component.html",
  styleUrls: ["./edit-assigned-store-dialog.component.scss"],
})
export class EditAssignedStoreDialogComponent implements OnInit, OnDestroy {
  public loading$: BehaviorSubject<boolean>;
  public frm: FormGroup;

  public services: IService[];

  adminConfig = AdminConfig;

  private subscriptions: Subscription[];

  constructor(
    private _dialogRef: MatDialogRef<EditAssignedStoreDialogComponent>,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { store: IStoreAssignedUser; services$: BehaviorSubject<IService[]> }
  ) {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.subscriptions = [];
  }
  ngOnInit() {
    this.subscribeAssignStoreAction();
    this._createFrom();

    if (this.data) {

      this._mappingData();
    }

    const serviceSubscription = this.data.services$.subscribe((services) => {
      if (services && services.length) {
        this.services = services;
      }
    });

    this.subscriptions.push(serviceSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((u) => u.unsubscribe());
  }

  get f() {
    if (!this.frm) return {};
    return this.frm.controls;
  }

  getServiceName(serviceId: number) {
    if (!serviceId) {
      return "--";
    }

    const found = find(this.services, { ServiceId: serviceId });

    if (!found) {
      return "--";
    }

    return found.ServiceName;
  }

  onSubmit() {
    if (!this.frm.valid || this.pinValid === false) {
      return;
    }
    this.loading$.next(true);
    this._store.dispatch(
      new UpdateUserStoreAction({ data: this._composeSubmitData() })
    );
  }

  get pinValid() {
    const userPin = this.f.pin.value;

    if (userPin === undefined || userPin === null) {
      return true;
    }

    return !!userPin.toString().match(AdminConfig.regex.userPIN);
  }

  private _composeSubmitData(): IAddUserStoreBody {
    const { pin, acl } = this.f,
      { StoreId, UserId } = this.data.store;
    return {
      storeId: StoreId,
      userId: UserId,
      pin: pin.value,
      acl: {
        Services: acl.value
      },
    };
  }

  private _createFrom() {
    this.frm = this._fb.group({
      pin: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ])
      ),
      acl: new FormControl(
        '',
        Validators.compose([
          Validators.required,

        ])
      )
    });
  }

  private _mappingData() {
    const { PIN, ACL } = this.data.store;
    // TODO: assign data for acl

    this.f.pin.setValue(PIN);
    this.f.acl.setValue(ACL ? ACL.Services : []);
  }

  private subscribeAssignStoreAction() {
    const assignActionSubscribe = this._store
      .pipe(skip(1), select(selectAssignStoreAction))
      .subscribe((isSuccess) => {
        if (isSuccess !== null) {
          if (isSuccess === true) {
            this._dialogRef.close();
          } else {
            this.loading$.next(false);
          }
        }
      });

    this.subscriptions.push(assignActionSubscribe);
  }
}
