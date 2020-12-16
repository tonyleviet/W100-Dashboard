import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import validBarcode from "barcode-validator";

@Directive({
    selector: '[upcValidateDirective]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UpcValidateDirective, multi: true }]
})
export class UpcValidateDirective implements Validator {
  @Input() isDynamic: boolean;

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (this.isDynamic || !control.value || validBarcode(control.value)) {
      return null;
    }

    return { 'upcInvalid': true };
  }
}
