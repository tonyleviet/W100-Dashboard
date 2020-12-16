// Angular
import { RouterModule } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTabsModule,
  MatNativeDateModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDividerModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_DATA
} from "@angular/material";
// NgBootstrap
import {
  NgbModule,
  NgbDropdownModule,
  NgbTabsetModule,
  NgbTooltipModule,
  NgbToastModule
} from "@ng-bootstrap/ng-bootstrap";
// Perfect Scrollbar
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// Core module
import { CoreUIModule } from "@core-ui/core-ui.module";
// Format MatDatePicker
// import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
// import { AppDateAdapter, APP_DATE_FORMATS } from '@app/shared/utils/index';


// CRUD Partials
import {
  ActionNotificationComponent,
  AlertComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent,
  ConfirmDialog
} from "./content/crud";
// Layout partials
import {
  ContextMenu2Component,
  ContextMenuComponent,
  LanguageSelectorComponent,
  NotificationComponent,
  QuickActionComponent,  QuickPanelComponent,
  ScrollTopComponent,
  SearchDefaultComponent,
  SearchDropdownComponent,
  SearchResultComponent,
  SplashScreenComponent,
  StickyToolbarComponent,
  Subheader1Component,
  SubheaderSearchComponent,
  UserProfile2Component
} from "./layout";
// General
import { NoticeComponent } from "./content/general/notice/notice.component";
import { PortletModule } from "./content/general/portlet/portlet.module";
// Errpr
import { ErrorComponent } from "./content/general/error/error.component";
// Extra module
import { WidgetModule } from "./content/widgets/widget.module";
// SVG inline
import { InlineSVGModule } from "ng-inline-svg";
import { CartComponent } from "./layout/topbar/cart/cart.component";

export const PARTIALS_MODULE_ENTRY_COMPONENTS = [
  AlertComponent,
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent,
  ConfirmDialog
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    CoreUIModule,
    PortletModule,
    WidgetModule,

    // angular material modules
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,

    // ng-bootstrap modules
    NgbModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    NgbToastModule
  ],
  exports: [
    WidgetModule,
    PortletModule,

    ScrollTopComponent,
    NoticeComponent,
    PARTIALS_MODULE_ENTRY_COMPONENTS,

    // topbar components
    ContextMenu2Component,
    ContextMenuComponent,
    QuickPanelComponent,
    ScrollTopComponent,
    SearchResultComponent,
    SplashScreenComponent,
    StickyToolbarComponent,
    Subheader1Component,
    SubheaderSearchComponent,
    LanguageSelectorComponent,
    NotificationComponent,
    QuickActionComponent,
    SearchDefaultComponent,
    SearchDropdownComponent,
    UserProfile2Component,
    CartComponent,

    // angular material modules
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,

    // ng-bootstrap modules
    NgbModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    NgbToastModule,

    ErrorComponent
  ],
  entryComponents: [
    PARTIALS_MODULE_ENTRY_COMPONENTS
  ],
  declarations: [
    ScrollTopComponent,
    NoticeComponent,
    PARTIALS_MODULE_ENTRY_COMPONENTS,

    // topbar components
    ContextMenu2Component,
    ContextMenuComponent,
    QuickPanelComponent,
    ScrollTopComponent,
    SearchResultComponent,
    SplashScreenComponent,
    StickyToolbarComponent,
    Subheader1Component,
    SubheaderSearchComponent,
    LanguageSelectorComponent,
    NotificationComponent,
    QuickActionComponent,
    SearchDefaultComponent,
    SearchDropdownComponent,
    UserProfile2Component,
    CartComponent,

    ErrorComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    // TODO: khanh.ln should update this for datetime customization
    // { provide: NgxMatDateAdapter, useClass: AppDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class PartialsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PartialsModule,
      providers: []
    }
  }
}
