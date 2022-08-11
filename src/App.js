import { useCallback, useState } from "react";
import React from "react";
import "./AppStyles/general.css"
import { upperCase, lowerCase, numbers, specialChars } from "./Characters.js";
//import CreateTextBox from "./CreateTextBox";



function App() {

  const [password, setPassword] = useState("");
  const [useUpperCase, setUseUpperCase] = useState(false);
  const [useLowerCase, setUseLowerCase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSpecialChars, setUseSpecialChars] = useState(false);  

  function getValues() {
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

  function validationCheck() {
    const values = getValues();
    const errorVariables = "Error: One ore more variables have non-numeric value";
    const errorNoLength = "Error: Must include password length!";
    const errorExceedLength = "Error: Variable occurences exceed length of password! Either increase password length or reduce variable occurences!";
    const errorExceedMaxLength = "Error: Password length exceeds maximum allowed!";
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

  function shufflePassword(pwd) {
    let i = 0;
    let a;
    let b;
    let temp;
    pwd = pwd.split("");  //make string into array

    while (i < pwd.length) {
      
      a = Math.floor(Math.random() * pwd.length);
      b = Math.floor(Math.random() * pwd.length);
      
      temp = pwd[a];
      pwd[a] = pwd[b];
      pwd[b] = temp;
      
      i++;
    }
    pwd = pwd.join(""); //make array into string with no commas
    setPassword(pwd);
  }

  function generatePassword() {

    const values = getValues();

    if (validationCheck() === false) {
      return;
    }

    let pwd = "";
    let i;

    //find the variable in each category
    if (useUpperCase) {
      i = 0;
      while (i < values.upperValue) {
        pwd += upperCase[Math.floor(Math.random() * (upperCase.length))];
        i++;
      }
    }
    if (useLowerCase) {
      i = 0;
      while (i < values.lowerValue) {
        pwd += lowerCase[Math.floor(Math.random() * (lowerCase.length))];
        i++;
      }
    }
    if (useNumbers) {
      i = 0;
      while (i < values.numValue) {
        pwd += numbers[Math.floor(Math.random() * (numbers.length))];
        i++;
      }
    }
    if (useSpecialChars) {
      i = 0;
      while (i < values.specialValue) {
        pwd += specialChars[Math.floor(Math.random() * (specialChars.length))];
        i++;
      }
    }

    //make up for lack of occurences in combined categories to match password length
    if (pwd.length < values.passLength) {
      let combination = upperCase + lowerCase + numbers + specialChars;
      i = 0;
      let initialPwdlength = pwd.length;
      while (i < (values.passLength - initialPwdlength)) {
        pwd += combination[Math.floor(Math.random() * (combination.length))];
        i++;
      }
    }
    
    
    shufflePassword(pwd);

    document.getElementById("password-gen").style.fontStyle = "normal"; //change italic to normal font
  }
  
  const CreateTextBox = useCallback((props) => {
    //usecallback to prevent rerendering of boxes when their props don't change

    //check to see if checkbox is true or false to render
    if (props.condition === false) {
      return null;
    }
    return <input type="text" id={props.id} placeholder="Mininum #"></input>
  },[]);  

  function setCheckBox(e, setter) {
    e.target.checked === true ? setter(true) : setter(false);
  }

  return ( 
    <div className="format">
      <div className="center-box">
        <header>
          Specific Random Password Generator
        </header>
        <div id="password-gen">
          {password}
        </div>
        <div>
          <button onClick={() => shufflePassword(password)}>Shuffle Password</button>
        </div>
        <div id="password-variables">
          <div>
            Password Length
            <input type="text" id="length" placeholder="Max: 40"></input>
          </div>
          <div id= "numbersVariable">
            Use Numbers
            <input type="checkbox" onChange={(e) => setCheckBox(e, setUseNumbers)}></input>
            {<CreateTextBox id="num" condition={useNumbers}/>}
          </div>
          <div id="upperCaseVariable">
            Use UpperCase
            <input type="checkbox" onChange={(e) => setCheckBox(e, setUseUpperCase)}></input>
            {<CreateTextBox id="upCa" condition={useUpperCase}/>}
          </div>
          <div id="lowercaseVariable">
            Use LowerCase
            <input type="checkbox" onChange={(e) => setCheckBox(e, setUseLowerCase)}></input>
            {<CreateTextBox id="loCa" condition={useLowerCase}/>}
          </div>
          <div id="specialCharsVariable">
            Use Special Char
            <input type="checkbox" onChange={(e) => setCheckBox(e, setUseSpecialChars)}></input>
            {<CreateTextBox id="spCh" condition={useSpecialChars}/>}
          </div>
        </div>
        <div>
         <button className="password-button" onClick={() => generatePassword()}>Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
