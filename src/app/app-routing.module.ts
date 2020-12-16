import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { BaseComponent } from "@core-ui/views/theme/base/base.component";
import { ErrorPageComponent } from "@core-ui/views/theme/content/error-page/error-page.component";

// Auth
import { AuthGuard } from "@module/auth";
import { SERVICES, SERVICES_ID } from './shared/enum/enum';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("@module/auth/components/auth.module").then(m => m.AuthModule)
  },
  {
    path: "file-manager",
    loadChildren: () =>
      import("@core-ui/views/components/file-manager/file-manager.module").then(
        m => m.FileManagerModule
      )
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("@module/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("@module/user-management/user-management.module").then(
            m => m.UserManagementModule
          )
      },
      {
        path: "permission-management",
        loadChildren: () =>
          import(
            "@module/permission-management/permission-management.module"
          ).then(m => m.PermissionManagementModule)
      },
      {
        path: "role-management",
        loadChildren: () =>
          import("@module/role-management/role-management.module").then(
            m => m.RoleManagementModule
          )
      },
      {
        path: "e-marketing",
        loadChildren: () =>
          import("./modules/e-marketing/e-marketing.module").then(
            m => m.EMarketingModule
          )
      },
      {
        path: "dxp-commerce",
        loadChildren: () =>
          import("./modules/e-com/e-com.module").then(
            m => m.EComModule
          )
      },
      {
        path: "customers",
        loadChildren: () =>
          import("./modules/e-com/e-com.module").then(
            m => m.EComModule
          )
      },
      {
        path: "scan-go",
        loadChildren: () =>
          import("./modules/e-com/e-com.module").then(
            m => m.EComModule
          ),
        data: {
          service: SERVICES.scanAndGo,
          serviceId: SERVICES_ID.scanAndGo
        }
      },
      {
        path: "catering",
        loadChildren: () =>
          import("./modules/e-com/e-com.module").then(
            m => m.EComModule
          ),
        data: {
          service: SERVICES.onlineOrder,
          serviceId: SERVICES_ID.onlineOrder
        }
      },
      {
        path: "promotion",
        loadChildren: () =>
          import("./modules/promotion/promotion.module").then(
            m => m.PromotionModule
          )
      },
      {
        path: "error/403",
        component: ErrorPageComponent,
        data: {
          type: "error-v6",
          code: 403,
          title: "403... Access forbidden",
          desc:
            "Looks like you don't have permission to access for requested page.<br> Please, contact administrator",
          return: '/dashboard'
        }
      },
      {
        path: "error/404",
        component: ErrorPageComponent,
        data: {
          type: "error-v2",
          code: 404,
          title: "404... Page not found",
          desc:
            "Sorry, but the page you are looking for is not found. Please, make sure you have typed the current URL",
          return: '/dashboard'
        }
      },
      { path: "error/:type", component: ErrorPageComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "error/404", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "error/404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
