import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static noSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(" ") >= 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }

  // Validates URL
  static urlValidator(control: AbstractControl): ValidationErrors | null {
    if (control.pristine || control.value === '') {
      return null;
    }
    const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    control.markAsTouched();
    if (URL_REGEXP.test(control.value)) {
      return null;
    }
    return {
      invalidUrl: true
    };
  }

  static noWhiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
