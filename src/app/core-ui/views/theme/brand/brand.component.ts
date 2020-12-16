// Angular
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, ToggleOptions } from '@core-ui/_base/layout';
import { HtmlClassService } from '../html-class.service';

@Component({
	selector: 'kt-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./index.scss'],
})
export class BrandComponent implements OnInit, AfterViewInit {
	// Public properties
	headerLogo: string;
	headerStickyLogo: string;

	@HostBinding('class') classes: string = 'kt-header__brand kt-grid__item';

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	constructor(private layoutConfigService: LayoutConfigService, public htmlClassService: HtmlClassService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		//Vinh custom this
		this.headerLogo = './assets/media/logos/united-family-logos.png';//this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
	}

	/**
	 * On after view init
	 */
	ngAfterViewInit(): void {}
}
