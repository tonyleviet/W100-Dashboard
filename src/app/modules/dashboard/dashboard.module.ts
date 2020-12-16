// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreUIModule } from '@core-ui/core-ui.module';
import { PartialsModule } from '@core-ui/views/partials/partials.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreUIModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
