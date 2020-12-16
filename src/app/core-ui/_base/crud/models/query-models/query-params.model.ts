import { isArray } from 'lodash';

export class QueryParamsModel {
	// fields
	filter: any;
	sortOrder: string; // asc || desc
	sortField: string;
	pageNumber: number;
  pageSize: number;
  serviceId: number;

	// constructor overrides
	constructor(
    _filter: any,
		_sortOrder: string = 'asc',
		_sortField: string = '',
		_pageNumber: number = 0,
    _pageSize: number = 10,
    _serviceId?: number
  ) {
		this.filter = _filter;
		this.sortOrder = _sortOrder;
		this.sortField = _sortField;
		this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
    this.serviceId = _serviceId;
	}

	getParamString(pageIndexName: string = 'pi', pageSizeName: string = 'ps', sortByName: string = 's'): string {
		let params = '';

		if (this.filter) {
			if (isArray(this.filter)) {
				this.filter.forEach((f) => {
					params += this.serialize(f);
				});
			} else {
				params = this.serialize(this.filter);
			}
		}

		params += `${pageIndexName}=${this.pageNumber}&${pageSizeName}=${this.pageSize}&${sortByName}=${this.sortField} ${this.sortOrder}`;

		return params;
	}

	serialize(paramObject: any) {
		let str = [];
		for (var p in paramObject)
			if (paramObject.hasOwnProperty(p)) {
				str.push(`${p}=${paramObject[p] || ''}`);
			}
		return str.join('&') + '&';
	}
}
