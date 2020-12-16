// Angular
import { Component, HostBinding } from '@angular/core';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '@core-ui/reducers';
import { Logout } from '@module/auth';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

	@HostBinding('class') classes: string = 'kt-header__topbar kt-grid__item';

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>) {
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}
}
