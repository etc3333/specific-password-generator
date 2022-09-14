function getValues(useUpperCase, useLowerCase, useNumbers, useSpecialChars) {
    let length, upper, lower, number, special;

    //get variable values and turn into numbers
    length = parseInt(document.getElementById("length").value);
    if (useUpperCase) {
      upper = parseInt(document.getElementById("upCa").value);
    }
    if (useLowerCase) {
      lower = parseInt(document.getElementById("loCa").value);
    }
    if (useNumbers) {
      number = parseInt(document.getElementById("num").value);
    }
    if(useSpecialChars) {
      special = parseInt(document.getElementById("spCh").value);
    }
    
    //make object with values
    const values = {passLength:length, upperValue:upper, lowerValue:lower, numValue:number, specialValue:special};
    
    return values;
  }
