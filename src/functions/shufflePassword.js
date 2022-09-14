export function shufflePassword(pwd, setPassword) {
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