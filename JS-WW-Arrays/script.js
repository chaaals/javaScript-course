'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// Project: BANKIST

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const user = 'Steven Thomas Williams';

// function to create a username
const createUsername = function (user) {
  const userName = user
    .toLowerCase()
    .split(' ')
    .map(name => name.slice(0, 1))
    .join('');

  return userName;
};

// loops through different accounts and create a username based on the account owner
accounts.forEach(function (account) {
  account.userName = createUsername(account.owner);
});

// loops through each account and log the userName
accounts.forEach(function (account) {
  console.log(account.userName);
});
console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array methods

// let arr = [1, 2, 3, 4, 5];

// console.log('----------SLICE METHOD');
// SLICE METHOD
// slice method => extract any part of an array
// console.log(arr.slice(2));
// console.log(arr.slice(2, arr.length));
// console.log(arr.slice(-1)); // gets the last element of the array similar to strings
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // creates a shallow copy
// console.log([...arr]); // similar to arr.slice(), it also creates a copy and its entirely in our own preference which way we want to create a shallow copy.

// console.log('----------SPLICE METHOD');
// SPLICE METHOD
// splice => its similar to slice but it mutates the array. It deletes extracted elements.
// console.log(arr.splice(2));
// console.log(arr); // before splice
// arr.splice(-1);
// arr.splice(0, 3); // arr.splice() format: arr.splice(position, no of items you want to delete from position)
// console.log(arr); // after splice

// console.log('----------Reverse METHOD');
// arr = [1, 2, 3, 4, 5];
// REVERSE METHOD
// reverse => as the name suggests, it reverses an array and it mutates the array, meaning, once it has been reversed, it stays that way.
// const arr2 = [6, 7, 8];

// console.log(arr2.reverse());
// console.log(arr2);

// console.log('----------Concat METHOD');
// CONCAT METHOD
// concat => concatenates different arrays
// const numbers = arr.concat(arr2);
// console.log(numbers);
// console.log([...arr, ...arr2]);

// console.log('----------JOIN METHOD');
// JOIN METHOD
// console.log(numbers.join(' - '));

// ---------------------------------------------------
// The new at method

// const dummyArr = [23, 11, 64];
// console.log(dummyArr[0]);
// console.log(dummyArr.at(0)); // similar to accessing the value through an index.

// traditional way of getting the last array element
// console.log(dummyArr[dummyArr.length - 1]);
// console.log(dummyArr.slice(-1)[0]);

// another solution using var.at() method.
// console.log(dummyArr.at(-1));

// var.at() method also works on strings
// console.log('Charles'.at(0));

// ---------------------------------------------------------------------------------
// Looping arrays using forEach method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using for of loop
// for (const movement of movements) {
//   if (movement > 0) console.log(`You deposited ${movement}`);
//   if (movement < 0) console.log(`You withdrew ${Math.abs(movement)}`);
// }

// using for each loop
// movements.forEach(function (movement, index) {
//   if (movement > 0)
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   if (movement < 0)
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
// });

// for each format: array.forEach(function(){...})
// NOTE: forEach can access the value, index, and array. What matters is the order of which you're trying to pass. In a call back function, the order of the parameters are as follows: function(value, index, array){...}

// forEach will loop on the whole loop. Continue and break will never work. Therefore, only use it if you need to loop at the whole array.

// -----------------------------------------------------------------------------

// forEach with sets and maps

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// forEach on maps format: map.forEach(function(value,key,map){....});
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} => ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

// forEach on sets format: set.forEach(function(value){....}) sets don't have keys or indices therefore it only returns a value.
// currenciesUnique.forEach(function (value) {
//   console.log(`${value}`);
// });

// -----------------------------------------------------------------------------------------------------

// Coding challenge 1

console.log(`-------------------- CODING CHALLENGE`);
const checkDogs = function (dogsJulia, dogsKate) {
  const shallowCopy = dogsJulia.slice();
  shallowCopy.shift();
  shallowCopy.splice(-2);

  const combinedDogAgeData = shallowCopy.concat(dogsKate);

  combinedDogAgeData.forEach(function (dogAge, i) {
    if (dogAge >= 3)
      console.log(
        `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
      );

    if (dogAge < 3) console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

const testDataJulia = [9, 16, 6, 8, 3];
const testDataKate = [10, 5, 6, 1, 4];

checkDogs(testDataJulia, testDataKate);

// ---------------------------------------------

// Data transformations with map,filter, and reduce

// MAPS
// map => similar to forEach method. it takes an original array and produces a new array.
// => returns a new array containing the results of applying an operation on all original array elements

// FILTER
// filter => returns a new array containing the array elements that passed a specified test condition

// REDUCE
// reduce => boils/reduces all array elements down to one single value. (ex. adding all elements together)

const testReduce = [1, 2, 3, 25, 5, 6, 100, 8, 9, 10];

const largest = testReduce.reduce((num1, num2) => (num1 > num2 ? num1 : num2));

// ---------------------------------------------------

// MAP METHOD

const eurToUSD = 1.1;

const convertedMovement = movements.map(value => value * eurToUSD);

console.log(movements, convertedMovement);

// if (movement > 0)
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   if (movement < 0)
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);

// const movementStatus = movements.map((movement, i) =>
//   movement > 0
//     ? `Movement ${i + 1}: You deposited ${movement}`
//     : `Movement ${i + 1}: You withdrew ${Math.abs(movement)}`
// );

// console.log(movementStatus);
