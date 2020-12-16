/** Angular */
import { Injectable } from '@angular/core';
import { Router, UrlTree, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

import * as moment from 'moment';
import { AdminConfig } from '@core/index';
import { ModulesEnum } from '@app/shared/enum/enum';
import { map, values, isEmpty } from 'lodash';
import { CurrencyPipe, formatNumber, formatCurrency } from '@angular/common';

@Injectable()
export class TypesUtilsService {
	/**
	 * Convert number to string and addinng '0' before
	 *
	 * @param value: number
	 */
	padNumber(value: number) {
		if (this.isNumber(value)) {
			return `0${value}`.slice(-2);
		} else {
			return '';
		}
	}

	/**
	 * Checking value type equals to Number
	 *
	 * @param value: any
	 */
	isNumber(value: any): boolean {
		return !isNaN(this.toInteger(value));
	}

	/**
	 * Covert value to number
	 *
	 * @param value: any
	 */
	toInteger(value: any): number {
		return parseInt(`${value}`, 10);
	}

	/**
	 * Convert date to string with 'MM/dd/yyyy' format
	 *
	 * @param date: Date
	 */
	dateFormat(date: Date): string {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();
		if (date) {
			return `${month}/${day}/${year}`;
		}

		return '';
	}

	/**
	 * Convert Date to string with custom format 'MM/dd/yyyy'
	 *
	 * @param date: any
	 */
	dateCustomFormat(date: any): string {
		let stringDate: string = '';
		if (date) {
			stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';

			stringDate += date.year;
        }
        return stringDate;
	}

	/**
	 * Convert string to DateFormatter (For Reactive Forms Validators)
	 *
	 * @param dateInStr: string (format => 'MM/dd/yyyy')
	 */
	getDateFormatterFromString(dateInStr: string): any {
		if (dateInStr && dateInStr.length > 0) {
			const dateParts = dateInStr.trim().split('/');
			return [
				{
					year: this.toInteger(dateParts[2]),
					month: this.toInteger(dateParts[0]),
					day: this.toInteger(dateParts[1])
				}
			];
		}

		const _date = new Date();
		return [
			{
				year: _date.getFullYear(),
				month: _date.getMonth() + 1,
				day: _date.getDay()
			}
		];
	}

	/**
	 * Convert string to Date
	 *
	 * @param dateInStr: string (format => 'MM/dd/yyyy')
	 */
	getDateFromString(dateInStr: string = ''): Date {
		if (dateInStr && dateInStr.length > 0) {
			const dateParts = dateInStr.trim().split('/');
			const year = this.toInteger(dateParts[2]);
			const month = this.toInteger(dateParts[0]);
			const day = this.toInteger(dateParts[1]);
			// tslint:disable-next-line:prefer-const
			let result = new Date();
			result.setDate(day);
			result.setMonth(month - 1);
			result.setFullYear(year);
			return result;
		}

		return new Date();
	}


	/**
	 * Convert Date to string with format 'MM/dd/yyyy'
	 * @param _date: Date?
	 */
	getDateStringFromDate(_date: Date = new Date()): string {
		const month = _date.getMonth() + 1;
		const year = _date.getFullYear();
		const date = _date.getDate();
		return `${month}/${date}/${year}`;
  }

  /**
   * Convert DateTime value from API return to Short Date
   * @param date: DateTime value from API return. Ex: 2019-12-18T20:51:15.76
   *
   * return short Date with format 'MM/DD/YYYY'
   */
  convertToShortDate(date: string | Date): string {
    if (date){
      return moment(date, AdminConfig.format.apiDateTime).format(AdminConfig.format.date);
    } else {
      return '';
    }
  }

  /**
   * Convert DateTime value from API return to Full Date Time
   * @param dateApi DateTime value from API return. Ex: 2019-12-18T20:51:15.76
   *
   * return short Date with format 'MM/DD/YYYY HH:mm:ss'
   */
  convertToFullDate(dateApi: string | Date): string {
    if (dateApi){
      return moment(dateApi, AdminConfig.format.apiDateTime).format(AdminConfig.format.dateTime);
    } else {
      return '';
    }
  }

  convertToFullDateAM(dateApi: string): string {
    if (dateApi){
      return moment(dateApi, AdminConfig.format.apiDateTime).format(AdminConfig.format.dateTimeAM);
    } else {
      return '';
    }
  }

  /**
   * Convert Short date to format Date follow API format '2019-12-12T01:21:50.71-06:00'
   * @param shorDate: 'MM/DD/YYYY'
   */
  convertToDateApi(shorDate: string): string {
    return moment(shorDate, AdminConfig.format.date).format(AdminConfig.format.apiDateTime);
  }

  /**
   * Convert short date to format Date follow Request Url format '2020-05-20;
   * @param shorDate: 'MM/DD/YYYY'
   */
  convertToDateUrl(shorDate: string): string {
    return moment(shorDate, AdminConfig.format.date).format(AdminConfig.format.urlParam);
  }

  /**
   * format number
   *
   * @param value number
   *
   * return 1,000,000
   */
  formatNumber(value: number): string {
    return formatNumber(value, AdminConfig.locale);
  }

  /**
   * format currency
   *
   * @param value number
   *
   * return $1,000.00
   */
  formatCurrency(value: number): string {
    return formatCurrency(value, AdminConfig.locale, '$');
  }
}

export function formatNumberUS(value: number): string {
  return formatNumber(value, AdminConfig.locale);
}

export function formatCurrencyUS(value: number): string {
  return formatCurrency(value, AdminConfig.locale, '$');
}
