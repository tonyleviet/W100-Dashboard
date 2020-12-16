// Anglar
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// Layout Directives
// Services
import {
	ContentAnimateDirective,
	FirstLetterPipe,
	GetObjectPipe,
	HeaderDirective,
	JoinPipe,
	MenuDirective,
	OffcanvasDirective,
	SafePipe,
	ScrollTopDirective,
	SparklineChartDirective,
	TabClickEventDirective,
	TimeElapsedPipe,
	ToggleDirective,
  StickyDirective,
  DynamicPipe,
} from './_base/layout';

import { EcomList } from './views/components/list';
import { Modal } from './views/components/modal';
import { CoreUIPaginator } from './views/components/paginator';
import { DXPImage } from './views/components/dxp-img';

@NgModule({
	imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
  ],
	declarations: [
    // directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
    FirstLetterPipe,
    DynamicPipe,

    // Components,
    EcomList,
    Modal,
		CoreUIPaginator,
		DXPImage
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
    FirstLetterPipe,
    DynamicPipe,
    // Components
    EcomList,
    Modal,
		CoreUIPaginator,
		DXPImage
	],
  providers: [
    DynamicPipe,
    CurrencyPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class CoreUIModule {
}
