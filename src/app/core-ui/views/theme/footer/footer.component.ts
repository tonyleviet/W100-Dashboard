// Angular
import { Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService } from '@core-ui/_base/layout';
// Object-Path
import * as objectPath from 'object-path';

import { environment } from '@env/environment';

@Component({
	selector: 'kt-footer',
	templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
	// Public properties
	today: number = Date.now();
  fluid: boolean;
  environment: string = environment.environment;
	version: string = environment.version;
	buildVersion: string = environment.buildVersion;
	buildDate: string = environment.buildDate;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayouConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();

		// footer width fluid
		this.fluid = objectPath.get(config, 'footer.self.width') === 'fluid';
	}
}
