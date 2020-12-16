// Angular
import { Injectable, OnDestroy } from '@angular/core';
// RxJS
import { BehaviorSubject, Subscription, combineLatest, Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
// Object path
import * as objectPath from 'object-path';
// Services
import { environment } from '@env/environment';

import { AppState } from '@app/core-ui/reducers';
import { currentUser } from '@app/modules/auth';

import { MenuConfigService } from './menu-config.service';

import { PermissionService } from '@app/modules/permission-management/services/permission.service';
import * as PermissionActions from '@app/modules/permission-management/_actions/permission.action';
import * as PermissionSelector from '@app/modules/permission-management/_selectors/permission.selector';
import { UserModel } from '@app/modules/user-management/_models/user.model';
import { MenuItemsModel } from '../models/menu-config.model';

@Injectable()
export class MenuAsideService implements OnDestroy {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	isLoading$: Observable<boolean> = of(true);

	unsubscribe: Subscription[] = [];

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(
		private menuConfigService: MenuConfigService,
		private permissionService: PermissionService,
		private store: Store<AppState>
		) {
			this.composeMenu();
	}

	/**
	 * Load menu list
	 */
	loadAllMenuItems() {
		// get menu list
		return objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
	}

	composeMenu() {
    const getMenuDataSubscription = this.store.pipe(select(PermissionSelector.selectPermissionMenuConfig))
      .subscribe((response: MenuItemsModel[]) => {
        const menuConfig = this.loadAllMenuItems();
        if (menuConfig && menuConfig.length > 0) {
          response.push(...menuConfig);
        }

        this.menuList$.next(response);
        this.isLoading$ = of(false);
      });
    this.unsubscribe.push(getMenuDataSubscription);
	}

	ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
