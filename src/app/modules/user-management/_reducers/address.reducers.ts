import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { QueryParamsModel } from '@app/core-ui/_base/crud';

import { AddressModel } from '../_models/address.model';
import { AddressActions, AddressActionTypes } from '../_actions/address.actions';

export interface AddressState extends EntityState<AddressModel> {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
  response: any;
  error: any;
}
export const adapter: EntityAdapter<AddressModel> = createEntityAdapter<AddressModel>({
	selectId: (address: AddressModel) => address.CS_ContactID
});

const initialAddressState: AddressState = adapter.getInitialState({
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
  response: null,
  error: null
});

export function addressReducer(
  state = initialAddressState,
  action: AddressActions
): AddressState {
  switch (action.type) {
    case AddressActionTypes.ADDRESS_PAGE_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading
      };
    case AddressActionTypes.ADDRESS_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        actionsLoading: action.payload.isLoading
      };
    case AddressActionTypes.ADDRESS_LOAD:
      return {
        ...initialAddressState,
      };
    case AddressActionTypes.ADDRESS_CREATE:
    case AddressActionTypes.ADDRESS_UPDATE:
    case AddressActionTypes.ADDRESS_DELETE:
      return {
        ...state,
        response: null, error: null
      };
    case AddressActionTypes.ADDRESS_LOAD_SUCCESS:
      return adapter.addMany(action.payload.address, {
        ...state,
        totalCount: action.payload.address.length
      });
    case AddressActionTypes.ADDRESS_CREATED_SUCCESS:
      return adapter.addOne(action.payload.address, {
        ...state,
        response: action.payload.response
      });
    case AddressActionTypes.ADDRESS_UPDATE_SUCCESS:
      return adapter.updateOne(action.payload.partial, {
        ...state,
        response: action.payload.response
      });
    case AddressActionTypes.ADDRESS_DELETE_SUCCESS:
      return adapter.removeOne(action.payload.contactId, {
        ...state,
        response: action.payload.response
      });
    case AddressActionTypes.ADDRESS_LOAD_FAILURE:
    case AddressActionTypes.ADDRESS_CREATE_FAILURE:
    case AddressActionTypes.ADDRESS_UPDATE_FAILURE:
    case AddressActionTypes.ADDRESS_DELETE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}
export const getAddressState = createFeatureSelector<AddressState>('address');
