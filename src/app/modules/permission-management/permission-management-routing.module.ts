import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PermissionManagementComponent } from "./components/permissions/list/permission-management.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "permissions",
        component: PermissionManagementComponent,
        data: { title: "Permission Management" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionManagementRoutingModule {}
