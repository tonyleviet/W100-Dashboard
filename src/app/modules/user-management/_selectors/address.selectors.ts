import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { each } from 'lodash';

import { QueryResultsModel } from '@app/core-ui/_base/crud';

import { AddressState } from '../_reducers/address.reducers';
import { AddressModel } from '../_models/address.model';

export const selectAddressState = createFeatureSelector<AddressState>('address');

export const selectAddressById = (id: number) => createSelector(
  selectAddressState,
  addressState => addressState.entities[id]
)

export const selectAddressPageLoading = createSelector(
	selectAddressState,
	addressState => addressState.listLoading
);

export const selectAddressActionLoading = createSelector(
  selectAddressState,
  AddressState => AddressState.actionsLoading
);

export const selectAddressInStore = createSelector(
	selectAddressState,
	AddressState => {
		const items: AddressModel[] = [];

		each(AddressState.entities, element => {
			items.push(element);
    });

		return new QueryResultsModel(items, AddressState.totalCount, '');
	}
);

export const selectAddressList = createSelector(
  selectAddressState,
  AddressState => {
		const items: AddressModel[] = [];

		each(AddressState.entities, element => {
			items.push(element);
    });

    return items;
  }
);

export const selectHasAddressInStore = createSelector(
  selectAddressState,
  queryResult => {
      if (!queryResult.totalCount) {
          return false;
      }

      return true;
  }
);

export const getAddressError = createSelector(
  selectAddressState,
  AddressState => AddressState.error
);
export const getAddressResponse = createSelector(
  selectAddressState,
  AddressState => AddressState.response
);
