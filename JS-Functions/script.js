'use strict';

// default parameters
const booking = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  const bookings = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(bookings);
  booking.push(bookings);
};

createBooking('LH123');
createBooking('LH123', 8, 1000);
createBooking('ASH23');

// Passing by values vs by referencee

const flight = 'LH234';
const charles = {
  name: 'Charles Ching',
  passport: 1214121521,
};

// const checkIn = function (flightNum, passenger) {
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 1214121521) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, charles);
console.log(flight);
console.log(charles);

/*
First-class vs Higher-order functions

First-class functions => JS treats functions as first-class citizens. This means that functions are simply values. Functions are just another type of object

Higher-order functions => a function that receives another function as an argument that returns a new function of both, this is only possible because of first-class function

*/

// Creating a high-order function

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...otherWords] = str.split(' ');
  return [first.toUpperCase(), ...otherWords].join(' ');
};

// higher-order function (takes in a function)
const transformer = function (str, fn) {
  return `Init string: ${str}\nTransformed string: ${fn(str)}`;
};

// functions also have methods. example is myFunction.name
console.log(transformer('javascript is the best!', upperFirstWord));

// JS uses callbacks all the time
const printName = function (name = 'noname') {
  console.log(name);
};

['Charles', 'Matthew', 'Ching'].forEach(printName);

// callback functions helps us create abstraction

// --------------------------------------------------------------------------------------------------

// functions returning a function

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

//const greeterHey = greet('Hey'); // greeterHey is essential the returning function.
//greeterHey('Charles'); // Therefore, once you call greeterHey function, it logs a string/perform a specific code.

// greeting still refers to the greet('stringvalue') because of something that we call 'closure'.

//greet('Hello')('Charles'); // alternative way of calling a function, returning a function

// Challenge

// initial
// const arrowGreet = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// };

// refactored
// const arrowGreet = greeting => name => console.log(`${greeting} ${name}`);

// arrowGreet('Arrow greet')('function');

// Call and apply methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],

//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Charles Ching');
// lufthansa.book(635, 'John Diggle');
// console.log(lufthansa.bookings);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// Application of call and apply

// CALL METHOD
//book.call(eurowings, 23, 'Matthew Lara');

// call method format: function.call(object,value,value,...,value);
// in the object paramater, its basically assigning the 'this' keyword to a specific object.

// APPLY METHOD

// Apply and call does the same thing but the difference between them is that apply method only receives an object to assign the this keyword, and an array of values. NOT INDEPENDENT VALUES LIKE HOW YOU WOULD USE THE CALL METHOD

// example
// const flightData = [555, 'Charles Lara'];
// book.apply(eurowings, flightData);
// apply method format: function.apply(object,array of values);
// Even though its useful, there is a better way of doing this now using the call method.

//book.call(lufthansa, ...flightData); // using spread operator and the call method.

// ------------------------------------------------------------------------------

// Bind method => similar to call, it also allows us to manually set this keywords for any function call. The difference is that it returns a function.

//const bookEW = book.bind(eurowings); // returns a function where the 'this' value is always eurowings.

//bookEW(23, 'Steven Williams'); // this is how you call the function. REMEMBER: method.bind(object) returns a function

// const bookEW23 = book.bind(eurowings, 23);

// bookEW23('Charles Ching');
// bookEW23('Patricia Alapan');

// another use case of bind: With Event Listeners

// lufthansa.planes = 300;
// const buyPlane = function () {
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', buyPlane.bind(lufthansa));

// Partial application

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23); // null pertains to the object since we are not using an object here. After null, you can now put other values
// console.log(addVAT(100));
// console.log(addVAT(23));

// Challenge: Rewrite the previous example with a function returning another function

// const addTax = rate => value => value + value * rate;
// const addVAT = addTax(0.23);
// console.log(addVAT(00));

// ------------------------------------------------------------------------------------------------------------
// Coding Challenge 1

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),

//   displayResults(type) {
//     if (typeof type !== 'object')
//       return console.log(`Poll results are ${type}`);

//     console.log(type.join(', '));
//   },

//   registerNewAnswer() {
//     const answer = prompt(
//       `${this.question} \n${this.options.join('\n')}\n(Write option number)`
//     );

//     if (Number(answer) < 0 || Number(answer) > 3)
//       return console.log('Not within the options');

//     this.answers[answer]++;
//     this.displayResults(this.answers);
//   },
// };

// const answerPoll = document.querySelector('.poll');
// const regPollAnswer = poll.registerNewAnswer;

// answerPoll.addEventListener('click', regPollAnswer.bind(poll));

// const data1 = [5, 2, 3];
// const data2 = [1, 5, 3, 9, 6, 1];

// poll.displayResults(data1);

// const data2String = data2.join(', ');
// poll.displayResults(data2String);

// -------------------------------------------------------------------------------------------
// immediately invoked function expressions(IIFE)

const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// example of IIFE
// basically wrap it around a parenthesis then call it by using a parenthesis.
(function () {
  console.log('This will never run again');
})();

// FORMAT OF IIFE
// (function(){...}) <= this is how you make IIFE, then you call it by putting a parenthesis outside like this:
// (function(){...})(); <= this creates IIFE then calls it once immediately.

// This is similar to IIFE in a sense that it is excellent in hiding variables.
{
  const isPrivate = 23;
}

// console.log(isPrivate);

// -----------------------------------------------------------------------------------------------------------

// Closures

// closures aren't something we developers, explicitly use(creating closures manually). it happens automatically.
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
// closures is basically a concept where a function that is returned by a function can still have access to variables of its parent function.
booker();
booker();
booker();

// Other examples of closures

// ex 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Reassigning affects closure in such a way that it overwrites the previous closure.
h();
f();

console.dir(f);

// ex 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
// ---------------------------------------------------------------------------------------------------
// Coding Challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
