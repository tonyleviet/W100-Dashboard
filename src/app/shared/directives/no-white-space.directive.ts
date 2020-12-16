import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { CustomValidators } from '../utils/validators';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
	selector: '[validateNoSpaces]',
	providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {

	private valFn = CustomValidators;
	validate(control: AbstractControl): { [key: string]: any } {
		return this.valFn.noWhiteSpaceValidator(control);
	}
}
