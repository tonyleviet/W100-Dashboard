// Angular
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxSmartModalModule } from 'ngx-smart-modal';

// Partials
import { PartialsModule } from '@core-ui/views/partials/partials.module';

// Perfect Scroll bar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Hammer JS
import 'hammerjs';

// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// State
import { metaReducers, reducers } from '@core-ui/reducers';

// CRUD
import {
  HttpUtilsService,
  LayoutUtilsService,
  TypesUtilsService,
  ModuleUtilsService
} from '@core-ui/_base/crud';

// Config
import { LayoutConfig } from '@core-ui/_config/layout.config';

// Layout Services
import {
	DataTableService,
	// FakeApiService,
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService,
  DynamicPipe
} from '@core-ui/_base/layout';
import { CacheModule } from 'ionic-cache';

// Auth
import { AuthModule } from "@module/auth/components/auth.module";
import { AuthService } from '@module/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';

import { CoreUIModule } from '@core-ui/core-ui.module';
import { ThemeModule } from "@core-ui/views/theme/theme.module";
import { APP_COMPONENTS } from '@core-ui/views/components/index';
import { PermissionService } from './modules/permission-management/services/permission.service';
import { PermissionEffects } from './modules/permission-management/_effects/permission.effect';
import { permissionReducers } from './modules/permission-management/_reducers/permission.reducer';
import { CurrencyPipe } from '@angular/common';
import { loadingReducer } from './core-ui/reducers/loading.reducers';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300,
};


export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

@NgModule({
  declarations: [
		AppComponent,
		...APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule.forRoot(),
    AuthModule.forRoot(),
    NgxPermissionsModule.forRoot(),
		PartialsModule,
    CoreUIModule,
    CdkTableModule,
    OverlayModule,
    NgbModule,
		EffectsModule.forRoot([PermissionEffects]),
		StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature("permissions", permissionReducers),
    StoreModule.forFeature("loading", loadingReducer),
		StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
		StoreDevtoolsModule.instrument(),
		TranslateModule.forRoot(),
    CacheModule.forRoot(),
    NgxSmartModalModule.forRoot(),

		ThemeModule,
  ],
  providers: [
    AuthService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService], multi: true
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		PermissionService,
		HttpUtilsService,
		TypesUtilsService,
    LayoutUtilsService,
    ModuleUtilsService,
    DynamicPipe,
    CurrencyPipe
  ],
  exports: [...APP_COMPONENTS],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }
