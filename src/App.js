import { useCallback, useState } from "react";
import React from "react";
import "./AppStyles/general.css"
import { upperCase, lowerCase, numbers, specialChars } from "./Characters.js";

import { getValues } from "./functions/getValues.js";
import { validationCheck } from "./functions/validationCheck.js";
import { shufflePassword } from "./functions/shufflePassword.js";

function App() {

  const [password, setPassword] = useState("");
  const [useUpperCase, setUseUpperCase] = useState(false);
  const [useLowerCase, setUseLowerCase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSpecialChars, setUseSpecialChars] = useState(false);  

  function generatePassword() {
    const values = getValues(useUpperCase, useLowerCase, useNumbers, useSpecialChars);

    if (validationCheck(useUpperCase, useLowerCase, useNumbers, useSpecialChars) === false) {
      return;
    }

    let combination = '';
    let pwd = "";
    let i;

    //find the variable in each category
    if (useUpperCase) {
      i = 0;
      combination += upperCase;
      while (i < values.upperValue) {
        pwd += upperCase[Math.floor(Math.random() * (upperCase.length))];
        i++;
      }
    }
    if (useLowerCase) {
      i = 0;
      combination += lowerCase;
      while (i < values.lowerValue) {
        pwd += lowerCase[Math.floor(Math.random() * (lowerCase.length))];
        i++;
      }
    }
    if (useNumbers) {
      i = 0;
      combination += numbers;
      while (i < values.numValue) {
        pwd += numbers[Math.floor(Math.random() * (numbers.length))];
        i++;
      }
    }
    if (useSpecialChars) {
      i = 0;
      combination += specialChars;
      while (i < values.specialValue) {
        pwd += specialChars[Math.floor(Math.random() * (specialChars.length))];
        i++;
      }
    }

    //make up for lack of occurences in combined categories to match password length
    if (pwd.length < values.passLength) {
      i = 0;
      let initialPwdlength = pwd.length;
      while (i < (values.passLength - initialPwdlength)) {
        pwd += combination[Math.floor(Math.random() * (combination.length))];
        i++;
      }
    }
    
    
    shufflePassword(pwd, setPassword);

    document.getElementById("password-gen").style.fontStyle = "normal"; //change italic to normal font
  }

  const CreateTextBox = useCallback((props) => {
    //usecallback to prevent rerendering of boxes when their props don't change

    //check to see if checkbox is true or false to render
    if (props.condition === false) {
      return null;
    }
    return <input type="number" id={props.id} autoComplete="off" placeholder="Min. #"></input>
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
          <div id="password-container">
            {password}
          </div>
        </div>
        <div>
          <button onClick={() => shufflePassword(password, setPassword)}>Shuffle Password</button>
        </div>
        <div id="password-variables">
          <div>
            Password Length
            <input type="number" id="length" autoComplete="off" placeholder="Max: 40"></input>
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
         <button className="password-button" onClick={() => generatePassword(setPassword, useUpperCase, useLowerCase, useNumbers, useSpecialChars)}>Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
