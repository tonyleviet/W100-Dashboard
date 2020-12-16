import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  IStoreAssignedUser,
  IStore,
  IService,
} from "@app/modules/user-management/_models/user.model";
import { BehaviorSubject } from "rxjs";
import { LayoutUtilsService } from "@app/core-ui/_base/crud";
import { find, includes } from "lodash";

@Component({
  selector: "store-assigned-list",
  templateUrl: "./store-assigned-list.component.html",
  styleUrls: ["./store-assigned-list.component.scss"],
})
export class StoreAssignedListComponent {
  @Input() storesAssigned: IStoreAssignedUser[];
  @Input() loading$ = new BehaviorSubject<boolean>(false);
  @Input() listAllStores?: IStore[] = [];
  @Input() listServices?: IService[] = [];
  @Input() services?: IService[] = [];
  @Output() handleUnassignStore = new EventEmitter();
  @Output() handleUpdateStore = new EventEmitter();
  @Output() handleOpenEditDialog = new EventEmitter();

  public displayedColumns: string[] = [
    "storeCode",
    "storeName",
    "permission",
    "action",
  ];

  constructor(
    private _layoutUtilsService: LayoutUtilsService,
  ) { }

  getStoreNameById(storeId: number) {
    const found = find(this.listAllStores, { StoreId: storeId });

    if (!found) {
      return "--";
    }

    return found.Name;
  }

  getServiceNames(serviceIds: number[]) {
    if (!serviceIds || serviceIds.length <= 0) {
      return "--";
    }

    return this.services
      .filter((svc) => includes(serviceIds, svc.ServiceId))
      .map((svc) => svc.ServiceName)
      .join(", ");
  }

  onEdit(assignedStore: IStoreAssignedUser) {
    this.handleOpenEditDialog.emit(assignedStore);
  }

  onUnassign(assignedStore: IStoreAssignedUser) {
    const title = "Unassign Store";
    const description = `Are you sure you want to unassign this store?`;
    const waitDescription = "Store is unassigning...";

    const dialogRef = this._layoutUtilsService.deleteElement(
      title,
      description,
      waitDescription,
      { okText: "Unassign", cancelText: "Cancel" }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      this.handleUnassignStore.emit(assignedStore);
    });
  }
}
