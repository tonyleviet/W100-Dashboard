import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as components from './components/index';

const routes: Routes = [
  // { path: '', component: SettingComponent },
  {
    path: 'settings',
    children: [
      { path: '', component: components.SettingComponent }
    ]
  },
  {
    path: 'users', data: { title: 'User' },
    children: [
      { path: 'new', component: components.UserFormComponent, data: { title: 'Create' } },
      { path: ':id/edit', component: components.UserFormComponent, data: { title: 'Edit' } },
      { path: ':id/detail', component: components.UserFormComponent, data: { title: 'Review' } },
      { path: '', component: components.UserListComponent, data: { title: 'Users' } }
    ]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
