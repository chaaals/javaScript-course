//  THIS JS FILE IS USED FOR A CODE ALONG ON JAVASCRIPT THEORY
'use strict';
/*
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
*/
// console.log(age); // you cant call this variable because it is within the function scope. This also works for printAge() function because the function is within the scope of another function called calcAge

// Hoisting and TDZ in practice

//console.log(me); // hoisted in undefined value || var variaibles are hoisted to an undefined value until it is defined.
//console.log(job); // cannot be accessed before initialization || let variables cannot be accessed before initialization because of the concept temporal deadzone
//console.log(year);
//

let job = 'Student';
const year = 2000;

// hoisting and tdz: functions

console.log(addDecl(1, 2));

function addDecl(a, b) {
  // in a global scope which is why it works even before you call it
  return a + b;
}

const addExpr = function (a, b) {
  // in a temporal dead zone
  return a + b;
};

const addArrow = (a, b) => a + b; // in a temporal dead zone

// Example

if (!numProducts) deleteShoppingCart();
// downfall of hoisting (use of var in your program)
// we have to understand that using var before its initialized can produce some errors. for example, in this case, we're trying to deleteshoppingcart when numproducts is equal to zero, and when it turns into zero, it returns a falsy value which is why we need to used the 'not' operator to make it true.
// this particular program works but it shouldn't. the reason being is that var numProducts returns an undefined value when its initialized.
var numProducts = 10;

function deleteShoppingCart() {
  console.log('All produccts deleted!');
}

// This Keyword
// => a special variable that is created for every execution context. Takes the value of the "owner of the function" of the function in which the this keyword is used.

// this is not static. it depends on how the function is called and its value is only assigned when the function is actually called.

// Way to use the this keyword
// Method => this = <object that is calling the method
// Simple function call => this = undefined (only valid on strict mode)
// Arrow functions => this = this of surrounding function(lexical this) arrow functions dont get a this keyword
//Event listener => this = DOM element that the handler is attached to

// this does NOT point to the function itself, and also NOT its variable environment

// this in practice

/*
function helloWorld() {
  let x = 10;
  console.log(this); // points to undefined
}

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // points to undefined
};
calcAge(2000);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // points to window object || mainly because arrow function does not get the this keyword
};
calcAgeArrow(2000);

const charles = {
  year: 2000,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year); // points to the year key pair value.
  },
};

charles.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = charles.calcAge; // copying of function from another object, also called as method borrowing
matilda.calcAge();
*/

// -----------------------------------------
// Regular functions vs arrow functions

const charles = {
  // this is not a block, its an object literal
  firstName: 'Charles',
  year: 2000,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year); // points to the year key pair value.

    //const self = this; // used to preserve the this keyword.
    const isMillenial = () => {
      console.log(this); // this works in an arrow function if its within a method. it basically points to the contents of the object where the method is declared
    };

    isMillenial();
  },
  greet: () => console.log(`hey ${this.firstName}`), // this.firstName points to the window object since arrow functions dont have a this keyword. Therefore, it returns undefined
};

charles.calcAge();
charles.greet();

// ----------------------------------------------------------------------------------

// primitives vs objects

// primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

// objects
const me = {
  name: 'Charles',
  age: 21,
};

const friend = me;

friend.age = 27;
console.log('Friend', friend);
console.log('Me', me);

// primitives and objects in practice

// primitives
let lastName = 'Ching';
let oldLName = lastName;
lastName = 'Alapan';

console.log(lastName, oldLName);

// references
const ruth = {
  firstName: 'Ruth',
  lastName: 'Ching',
  age: 21,
};

const marriedRuth = ruth;
marriedRuth.lastName = 'Alapan';
console.log('Before marriage:', ruth);
console.log('After marriage:', marriedRuth);

// copying objects

const ruth2 = {
  firstName: 'Ruth',
  lastName: 'Ching',
  age: 21,
};

const ruthCopy = Object.assign({}, ruth2); // creates a new object that is a copy of the 2nd paramater (another object);
ruthCopy.lastName = 'Alapan';
console.log('Before marriage:', ruth2); // preserves the original value
console.log('After marriage:', ruthCopy); // creates a copy with an update value

// object.assign() only creates a shadow copy. What we need is DEEP CLONE

// This is important to know because referencing a new variable to an existing object can be problematic. The new variable refers to the same address of an initialized object you're referring to, hence, changing values on the object will appear on both the old and new variabls. We solve this by copying the object using object.assign().

// ----------------------------------------------------- end -------------------------------------------------------------
