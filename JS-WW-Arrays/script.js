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

// UI UPDATE FUNCTIONS ----------------------------------------
const displayMovements = function (movements, isSorted = false) {
  const mov = isSorted
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : movements;

  containerMovements.innerHTML = '';
  mov.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const user = 'Steven Thomas Williams';

// displays balance
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc[`balance`] = balance;
  labelBalance.textContent = `${balance} EUR`;
};

// display balance summary

const calcDisplaySummary = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(interest => interest >= 1) // added rule: only add if the interest is at least 1 eur
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;
  labelSumInterest.textContent = `${interest}€`;
};
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

// EVEN LISTENERS --------------------------------------------------------
// Event handler

const updateUI = function (acc) {
  displayMovements(acc.movements);
  // update display balance
  calcDisplayBalance(acc);
  // update display summary
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevents the form from submitting
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  // checks if the user exists, if not, returns a log that says it doesn't exist.
  if (currentAccount === undefined) return alert('User does not exist');

  // checks if the pin is correct, if incorrect, returns wrong pin
  if (currentAccount.pin !== Number(inputLoginPin.value))
    return alert('Wrong Pin');

  // Logged in and UI is displayed
  console.log('Logged in');
  // display ui and welcome message
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  // display movements
  containerApp.style.opacity = 100;

  // clear input fields
  inputLoginPin.value = inputLoginUsername.value = '';
  // update UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );

  // clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';

  // guard clause
  if (receiverAccount === undefined)
    return alert(
      `Receiver Account: ${inputTransferTo.value} is not valid, enter a valid account.`
    );

  if (
    transferAmount > currentAccount.balance ||
    receiverAccount.userName === currentAccount.userName
  )
    return alert(
      `You can't send money to yourself or if you're transferring more than your balance.`
    );

  // update movements
  receiverAccount.movements.push(transferAmount);
  currentAccount.movements.push(-transferAmount);

  // update UI
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  const validLoan = currentAccount.movements
    .filter(mov => mov > 0)
    .some(mov => mov >= loanAmount * 0.1);

  inputLoanAmount.value = '';
  if (loanAmount > 0 && validLoan) {
    // push loan
    currentAccount.movements.push(loanAmount);
    // update ui
    updateUI(currentAccount);

    // alert if valid loan is true
    return alert(
      `Loan request is valid. Loan amount of ${loanAmount} has been deposited to your account.`
    );
  }

  return alert(`Loan request of ${loanAmount} has been denied.`);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const currentAccIndex = accounts.findIndex(
    acc => acc.userName === currentAccount.userName
  );
  // Notes: findIndex is similar to other array methods like find. it returns the first value that matches the expression.

  console.log(currentAccIndex);

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // clears input field
    inputCloseUsername.value = inputClosePin.value = '';

    // alert that account has been closed
    alert(
      `Account of ${currentAccount.owner} has been closed. It's sad to see you go away, Goodbye!`
    );

    // hides UI and removes the account
    containerApp.style.opacity = 0;
    accounts.splice(currentAccIndex, 1);

    // reverts welcome-label to original
    labelWelcome.textContent = `Log in to get started`;
  }
});

let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (!isSorted) {
    isSorted = true;
    return displayMovements(currentAccount.movements, isSorted);
  }
  if (isSorted) {
    isSorted = false;
    return displayMovements(currentAccount.movements, isSorted);
  }

  console.log('Sorting');
});
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

// FILTER METHOD

const deposits = movements.filter(movement => movement > 0); // it basically creates an array of values that matches a specific condition.
console.log(deposits);

// challenge

const withdrawals = movements.filter(movement => movement < 0);
console.log(withdrawals);

// REDUCE METHOD

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// reduce method format: arr.reduce((val1,val2) => expression, default value);

// Maximum value
// console.log(movements.reduce((acc, cur) => (acc > cur ? acc : cur)));

// -------------------------------------------------------------------------

// Coding challenge 2

// console.log('---------------------------- CODING CHALLENGE');

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   const filteredHumanAge = humanAge.filter(age => age >= 18);
//   const average =
//     filteredHumanAge.reduce((acc, cur) => acc + cur, 0) /
//     filteredHumanAge.length;

//   return average;
// };

// console.log(
//   `Average of dog ages in human age (adults): ${calcAverageHumanAge([
//     5, 2, 4, 1, 15, 8, 3,
//   ])}`
// );

// console.log(
//   `Average of dog ages in human age (adults): ${calcAverageHumanAge([
//     16, 6, 10, 5, 6, 1, 4,
//   ])}`
// );

// ---------------------------------------------------------------------------------
// Chaining methods

const usd__totalConvertedDeposit = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(usd__totalConvertedDeposit);

// --------------------------------------------------------------------------------
// Coding Challenge 3

console.log(`---------------------- CODING CHALLENGE 3`);

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

console.log(
  `Average of dog ages in human age (adults): ${calcAverageHumanAge([
    5, 2, 4, 1, 15, 8, 3,
  ])}`
);

console.log(
  `Average of dog ages in human age (adults): ${calcAverageHumanAge([
    16, 6, 10, 5, 6, 1, 4,
  ])}`
);

// -----------------------------------------------------------------------------------
// FIND method

// find method acceps a callback function. its just another method that loops on the array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal); // unlike filter method that returns a new array, find only returns a single value of the first occurance.

console.log(accounts);

// findint an account
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// -----------------------------------------------------------------------------

// SOME method => returns a boolean value, functions the same as filter method that accepts an expression. Returns true if at least one fits the expression

// for CONDITION
const anyDeposits = movements.some(mov => mov > 150);
console.log(anyDeposits);

// EVERY method => only returns true if every single element of an array fits the expression

console.log(movements.every(mov => mov > 0));

// separate callback

const deposit = mov => mov > 0; // you can make a separate callback function then put it as a parameter in the array method. It helps with keeping the codebase DRY (don't repeat yourself)
console.log(movements.filter(deposit));

// -------------------------------------------------------------------------
// flat and flatmap method => ES2019

// flat method => helps in making a general array. basically removing nested array(only goes one level deep, but you can put numbers as a parameter to go deeper).
const arr = [[1, 2, 3], [4, 5, 6], 8, 5, 9];
console.log(arr.flat());

const arrDeep = [[[[1, 2], 3], 4, [5, 6]], 7, 8];
console.log(arr.flat(2)); // gives the same output as the first example.

// const accountMovements = accounts.map(account => account.movements);
// console.log(accountMovements.flat());

const overAllBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overAllBalance);

// flatMap => returns an already flatten mapped array
// NOTE: flatMap functions the same with a map method. it needs a callback function, and returns a flattened array.
const fmOverAllBalance = accounts
  .flatMap(account => account.movements)
  .reduce((acc, cur) => acc + cur, 0);

console.log(fmOverAllBalance);
