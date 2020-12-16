// Angular
import {
  Component, OnInit, Input, OnDestroy, Output, AfterContentInit,
  ViewChild, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, 
} from '@angular/core';
import { NgForm } from '@angular/forms';
// Lodash
import { isEqual, cloneDeep } from "lodash";
// Config
import { AdminConfig } from '@core/index';

import { AddressModel } from '../../../../../../_models/address.model';
import { US_STATE_ENUM_OPTIONS } from '../../../../../../_models/user.model';

@Component({
	selector: 'kt-address-form',
  templateUrl: './address-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements AfterContentInit, OnDestroy {
  @ViewChild('addressForm', {static: false}) addressForm: NgForm;

  @Input('address') data: AddressModel;
  @Input() index: number;
  @Input() loading: boolean;
  @Input() allowRemove: boolean;

  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onSave: EventEmitter<{address: AddressModel, index: number}> = new EventEmitter();

  stateUS = US_STATE_ENUM_OPTIONS;

  adminConfig = AdminConfig;

  constructor(private _cd: ChangeDetectorRef) {}

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.addressForm && this.addressForm.form) {
        this.addressForm.form.markAsPristine();
        this._cd.detectChanges();
      }
    }, 250);
  }

  ngOnDestroy() {}

  isValid() {
    return this.addressForm.form.valid;
  }

  save() {
    const data = {
      ...this.data,
      IsBilling: this.data.IsBilling,
      IsDelivery: !this.data.IsBilling
    };

    this.onSave.emit({ address: data, index: this.index });
  }

  remove() {
    this.onRemove.emit(this.index);
  }
}
