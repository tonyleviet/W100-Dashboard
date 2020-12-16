import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as components from './components/index';

const routes: Routes = [
  { 
    path: "roles",
    children: [
      { path: '', component: components.RoleListComponent, data: { title: "Roles" } },
      { path: ':roleName/users', component: components.RoleUsersComponent, data: {} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule {}
