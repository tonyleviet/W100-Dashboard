// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '@core-ui/reducers';
import { currentUser, Logout } from '@module/auth';
import { UserModel } from '@app/modules/user-management/_models/user.model';

@Component({
	selector: 'kt-user-profile2',
  templateUrl: './user-profile2.component.html',
  styles: [`
    ::ng-deep .kt-header__topbar-username {
      display: block !important;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class UserProfile2Component implements OnInit {
	// Public properties
	user$: Observable<UserModel>;
	// http://everyknightshoulddesign.blogspot.com/2013/08/beautiful-color-palettes-their-hex-codes.html
	colorRange: string[] = ['#69D2E7', '#A7DBDB', '#E0E4CC', '#F38630', '#FA6900'];
	badgeBg: string;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>) {
		this.badgeBg = this.colorRange[Math.floor(Math.random() * this.colorRange.length)];
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}
}
