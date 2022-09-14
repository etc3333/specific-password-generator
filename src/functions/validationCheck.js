import { getValues } from './getValues.js';

export function validationCheck(useUpperCase, useLowerCase, useNumbers, useSpecialChars) {
    const values = getValues(useUpperCase, useLowerCase, useNumbers, useSpecialChars);
    const errorVariables = "Error: One or more variables have non-numeric value";
    const errorNoLength = "Error: Must include password length!";
    const errorExceedLength = "Error: Variable occurences exceed length of password! Either increase password length or reduce variable occurences!";
    const errorExceedMaxLength = "Error: Password length exceeds maximum allowed!";
    const errorNoUsesSelected = "Error: No Uses Selected!";
    let total = 0;

    //no password length check
    if (isNaN(values.passLength)) {
      alert(errorNoLength);
      return false;
    }

    //max password length check
    if (values.passLength > 40) {
        alert(errorExceedMaxLength);
        return false;
      }

    if (useUpperCase === false && useLowerCase === false && useNumbers === false && useSpecialChars === false) {
      alert(errorNoUsesSelected);
      return false;
    }

    //check for non-numeric values/ empty values
    if (useUpperCase) {
      if (isNaN(values.upperValue)) {
        alert(errorVariables);
        return false;
      }
      total += values.upperValue;
    }
    if (useLowerCase) {
      if (isNaN(values.lowerValue)) {
        alert(errorVariables);
        return false;
      }
      total += values.lowerValue;
    }
    if (useNumbers) {
      if (isNaN(values.numValue)) {
        alert(errorVariables);
        return false;
      }
      total += values.numValue;
    }
    if(useSpecialChars) {
      if (isNaN(values.specialValue)) {
        alert(errorVariables);
        return false;
      }
      total += values.specialValue;
    }

    if (total > values.passLength) {
      alert(errorExceedLength);
      return false;
    }
    return true;
  }