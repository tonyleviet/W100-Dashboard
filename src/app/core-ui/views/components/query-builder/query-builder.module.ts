import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaskModule } from 'ngx-mask';
import {
    QueryInputDirective,
    QueryFieldDirective,
    QueryEntityDirective,
    QueryOperatorDirective,
    QueryButtonGroupDirective,
    QuerySwitchGroupDirective,
    QueryRemoveButtonDirective,
    QueryEmptyWarningDirective,
    QueryArrowIconDirective,
} from './components/query-builder';
import { PartialsModule } from '../../partials/partials.module';
import { JsonEditorModule } from '../json-editor/json-editor.module';
import { QueryBuilderComponent } from './components/query-builder/query-builder.component';
import { ElsQueryBuilderComponent } from './components/els-query-builder/els-query-builder.component';
import { QueryEditorModalComponent } from './components/query-editor-modal/query-editor-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    PartialsModule.forRoot(),
    AngularSplitModule.forChild(),
    JsonEditorModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    QueryBuilderComponent,
    ElsQueryBuilderComponent,
    QueryInputDirective,
    QueryOperatorDirective,
    QueryFieldDirective,
    QueryEntityDirective,
    QueryButtonGroupDirective,
    QuerySwitchGroupDirective,
    QueryRemoveButtonDirective,
    QueryEmptyWarningDirective,
    QueryArrowIconDirective,
    QueryEditorModalComponent
  ],
  exports: [
    QueryBuilderComponent,
    ElsQueryBuilderComponent,
    QueryInputDirective,
    QueryOperatorDirective,
    QueryFieldDirective,
    QueryEntityDirective,
    QueryButtonGroupDirective,
    QuerySwitchGroupDirective,
    QueryRemoveButtonDirective,
    QueryEmptyWarningDirective,
    QueryArrowIconDirective
  ],
  providers: [
  ],
  entryComponents: [
    QueryEditorModalComponent
  ]
})
export class QueryBuilderModule { }
