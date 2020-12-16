import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  IStore,
  IService,
} from "@app/modules/user-management/_models/user.model";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material";
import { FormControl, FormBuilder } from "@angular/forms";
import { debounceTime, startWith, map } from "rxjs/operators";
import { find } from "lodash";
import { AdminConfig } from '@app/core';


@Component({
  selector: "assign-store-form",
  templateUrl: "./assign-store-form.component.html",
  styleUrls: ["./assign-store-form.component.scss"],
})
export class AssignStoreFormComponent implements OnInit {
  @Input() listAllStores?: IStore[] = [];
  @Input() listServices?: IService[] = [];
  @Input() assignedStores?: Set<number> = new Set([]);
  @Input() loading$ = new BehaviorSubject<boolean>(false);
  @Input() shouldReset$ = new BehaviorSubject<boolean>(false);
  @Output() handleAssignStoreSubmit = new EventEmitter();
  @Output() handleSelectingStore = new EventEmitter();

  // Store
  @ViewChild("storeCodeInput", { static: false }) storeCodeInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("storeAuto", { static: false }) matAutocomplete: MatAutocomplete;
  public storeCodeCtrl = new FormControl();
  public filteredStores$: Observable<IStore[]>;
  public selectedStore: IStore;
  public userPin: string;
  public servicesSelected: number[];
  public ipValue: string;

  adminConfig = AdminConfig;

  private subscriptions: Subscription[];

  constructor( private _fb: FormBuilder,) {
    this.servicesSelected = [];
    this.subscriptions = [];
  }

  ngOnInit() {
    this.userPin = '000000';
    this.filteredStores$ = this.storeCodeCtrl.valueChanges.pipe(
      debounceTime(100),
      startWith(null),
      map((kw: string) => (kw ? this._storeFilter(kw) : []))
    );

    const resetSubscribe = this.shouldReset$.subscribe((shouldDoReset) => {
      if (shouldDoReset) {
        this.onClearSelectedStore();
      }
    });

    this.subscriptions.push(resetSubscribe);

  }

  getServiceName(serviceId: number) {
    if (!serviceId) {
      return "--";
    }

    const found = find(this.listServices, { ServiceId: serviceId });

    if (!found) {
      return "--";
    }

    return found.ServiceName;
  }

  storeSelected(event: MatAutocompleteSelectedEvent): void {
    const store: IStore = event.option.value;

    if (store) {
      this.selectedStore = store;
      this.handleSelectingStore.emit(store);
    }
  }

  onPermissionChange($e) {
    if ($e && $e.value) {
      this.servicesSelected = $e.value;
    }
  }

  onClearSelectedStore() {
    this.storeCodeInput.nativeElement.value = "";
    this.selectedStore = null;
    this.userPin = "000000";
    this.servicesSelected = [];
  }

  displayACStoreFn(store: IStore) {
    if (!store) {
      return "";
    }

    return `${store.Name} - StoreCode: ${store.StoreCode} - Zipcode: ${store.ZipCode}`;
  }

  onSubmit() {
    if (this.pinValid === false) {
      return;
    }

    if (this.selectedStore) {
      this.handleAssignStoreSubmit.emit({
        store: this.selectedStore,
        pin: this.userPin,
        services: this.servicesSelected,
      });
    }
  }
  get pinValid() {
    if (this.userPin === undefined || this.userPin === null) {
      return true;
    }
    return !!this.userPin.match(AdminConfig.regex.userPIN);
  }

  private _storeFilter(value: string): IStore[] {
    if (typeof value !== "string") {
      return;
    }

    const filterValue = value.toLowerCase();

    return this.listAllStores.filter(
      (store) =>
        (store.Name.toLowerCase().indexOf(filterValue) !== -1 ||
          (store.StoreCode + "").indexOf(filterValue) !== -1 ||
          store.ZipCode.indexOf(filterValue) !== -1) &&
        this.assignedStores.has(store.StoreId) === false
    );
  }
}
