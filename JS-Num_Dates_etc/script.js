'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-04-20T23:36:17.929Z',
    '2022-04-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatCurrency = (acc, num) =>
  new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(num);

const formatMovementDate = function (curDate, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const date = new Date(curDate);

  const daysPassed = calcDaysPassed(new Date(), date);

  // const options = {
  //   month: 'numeric',
  //   day: 'numeric',
  //   year: 'numeric',
  // };

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // // const hours = `${date.getHours()}`.padStart(2, 0);
  // // const minutes = `${date.getMinutes()}`.padStart(2, 0);
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatMovementDate(acc.movementsDates[i], acc.locale);

    const formattedMov = formatCurrency(acc, mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(acc, acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(acc, incomes);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(acc, Math.abs(out));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(acc, interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogOutTimer = function () {
  let time = 60 * 5;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${seconds}`;

    // Decrease by 1s
    time--;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      setTimeout(() => {
        clearInterval(timer);
        labelWelcome.textContent = `Log in to get started`;
        containerApp.style.opacity = 0;
      }, 1500);
    }
  };

  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};
// Experiment

// // USING INTL API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };

// const locale = navigator.language; // used to get locale via browser

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    // USING INTL API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language; // used to get locale via browser

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }

  if (timer) clearInterval(timer); // clears a timer if a certain timer is existing
  timer = startLogOutTimer();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    if (timer) clearInterval(timer); // clears a timer if a certain timer is existing
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.round(+inputLoanAmount.value); // round down the number

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add date
      currentAccount.movementsDates.push(new Date());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  if (timer) clearInterval(timer); // clears a timer if a certain timer is existing
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Converting and Checking numbers

console.log(23 === 23.0);

// Converting string to a number
console.log(Number('23'));
console.log(+'23'); // type coercion

// Converting string to a number: Parsing
// PARSEINT
console.log(Number.parseInt('30px', 10)); // note: it should start with a number
console.log(Number.parseInt('e30x', 10)); // does not work because its starting with a number.

// Number.parseInt() format: Number.parseInt('value', numerical base) examples of numerical base: base 10 (0-9) and base 2 (binary => 0-1)

// PARSEFLOAT
console.log(Number.parseInt('2.5rem')); // outputs 2
console.log(Number.parseFloat('2.5rem')); // outputs 2.5

console.log('-----------------------isNaN'); // isNaN => returns a boolean value

console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

console.log('-----------------------isFinite'); // isFinite => best one to use when you're checking if the value is a number.

console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23 / 0));
console.log(Number.isFinite(+'1'));

// ------------------------------------------------------------
console.log('-----------------------Math and rounding'); // Math and rounding

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // square root without math namespace
console.log(8 ** (1 / 3)); // cube root

// Math.max
console.log(Math.max(5, 18, 23, 11, 2)); // returns the max value of an array of numbers
console.log(Math.max(5, 18, '23', 11, 2)); // works if the number is a string (does type coercion)
console.log(Math.max(5, 18, '23px', 11, 2)); // does not work if it has units

// Math.min
console.log(Math.min(5, 18, 23, 11, 2)); // returns the min value of an array of numbers

// Math.PI
console.log(Math.PI * Number.parseFloat('10px') ** 2); // calculate an area of a circle with 10 as its radius pi * r^2

// Math.random and trunc
// console.log(Math.trunc(Math.random() * 6 + 1));

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1);

console.log(randomInt(10, 20));

// rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3)); // round down
console.log(Math.round(23.9)); // round up

console.log(Math.ceil(23.3)); // round up
console.log(Math.ceil(23.9)); // round up

console.log(Math.floor(23.3)); // round down
console.log(Math.floor(23.9)); // round down

// trunc vs floor
console.log(Math.trunc(-23.3)); // simply truncates the value
console.log(Math.floor(-23.3)); // round down

// rounding decimals
// toFixed() => returns a string. to convert, just add a plus sign before it: +floatvalue.toFixed(n);

console.log((2.7).toFixed(0)); // round up
console.log(+(2.7).toFixed(3));

// ----------------------------------------------------------------
console.log('------------------------ Modulo operator'); // Remainder operator

// const isOdd = n => n % 2 !== 0;
// console.log(5 % 2);

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     isOdd(i)
//       ? (row.style.backgroundColor = 'orangered')
//       : (row.style.backgroundColor = 'blue');
//   });
// });

// ------------------------------------------------------------------
console.log('------------------------ Numeric Separators');

// Numeric separator (_)
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1, transferFee2);

const PI = 3.1415;
console.log(PI);

console.log(+'230_000'); // doesn't work. you need to use numeric separators when declaring a variable with a numerical value.

// ------------------------------------------------------------------
console.log('------------------------ Working with Big Int');

console.log(2 ** 53 - 1); // largest number that JS can store

// to accurately display numbers larger than the aforementioned output, we use big int.

// example
console.log('Not accurate: ', 125305723069723067207312741892641825693207206723); // without big int
console.log('Accurate: ', 125305723069723067207312741892641825693207206723n); // with big int

// Operations on big int

const huge = 3250232636203862308525236236n;
const num = 23;
// console.log(huge * num); // does not work. cannot mix regular numbers with big int
console.log(huge * BigInt(num)); // works because num is converted to BigInt

// ------------------------------------------------------------------
console.log('------------------------ Creating Dates');

const date = new Date();

console.log(date);

console.log(new Date(account1.movementsDates[0]));

const acc1Dates = account1.movementsDates.map(date => new Date(date));
// console.log(acc1Dates);

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // gets the date
console.log(future.getDay()); // gets the day (mon, tue, wed, ... , sun) in numeric value
console.log(future.getHours());
console.log(future.toISOString());
console.log(future.getTime()); // time stamp

console.log(new Date(2142228180000));

console.log(Date.now()); // gives the time stamp of today

future.setFullYear(2040); // mutates the year
console.log(future);

// ------------------------------------------------------------------
console.log('------------------------ Operations with Dates');

const future2 = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

// --------------------------------------------------------------------
console.log('------------------------ Internationalizing Dates (intl)');

// Date-time-format in Intl: Intl.DateTimeFormat('locale',{}).format(date)
// Assuming that locale is equal to navigator.language and date is equal to new Date() || new Date(specific date)
// Second parameter on Intl.DateTimeFormat() is an object that we can use to customize formatting. We can do 'numeric' and 'long' on some parts properties like Month and Weekday.

// Example
console.log(Intl.DateTimeFormat(navigator.language).format(new Date()));

// NumberFormat: similar to DateTimeFormat, NumberFormat formats a number by putting separators according to local.
// Usecase: formatting transactions/balance/deposits/withdrawals... etc
// Example
console.log(Intl.NumberFormat(navigator.language).format(5000030.2));
// With object as its second parameter
console.log(
  Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
  }).format(5000030.2)
);

// --------------------------------------------------------------------
console.log('------------------------ Timers');

// Uses the mechanism of asynch js => as soon as setTimeout is ran, it will go to the next line immediately

const ingredients = ['olives', 'spinach'];
// Set Timeout
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza bobo! With ${ing1} and ${ing2}`),
  3000,
  // 'olives', // ing 1
  // 'spinach' // ing 2
  ...ingredients // works similar to hardcoding olives and spinach
);
console.log('Mag Hintay ka tanga....');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // stops the timer when it hits a certain condition

// Set Interval => used to run a callback function after a certain amount of time
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// let i = 0;
// setInterval(function () {
//   console.log((i += 1));
// }, 1000);
