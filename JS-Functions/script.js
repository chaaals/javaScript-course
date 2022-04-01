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
