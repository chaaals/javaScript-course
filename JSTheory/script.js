'use strict';

function calcAge(birthYear) {
  // function calcAge is within the global scope
  const age = 2037 - birthYear;
  //   console.log(firstName); // even though the variable is not within the function, you can still call it because firstName is a global variable.

  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    // if statements are block scopes
    // var is only function scoped while let and const can be block scoped
    if (birthYear >= 1981 && birthYear <= 1996) {
      const str = `Oh, and you're a millenial ${firstName}`;
      console.log(str);
    }
  }
  printAge();

  return age;
}

const firstName = 'Charles'; // global variable

calcAge(1995);

// console.log(age); // you cant call this variable because it is within the function scope. This also works for printAge() function because the function is within the scope of another function called calcAge
