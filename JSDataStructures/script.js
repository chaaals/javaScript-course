'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// just another way of assigning object properties.
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //openingHours: openingHours, // old way of an assigning an outside object to another object

  // enhanced object literal (ES6 concept)
  openingHours, // just call it as ease

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // object destructuring (You can also give it default values)
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = '20:00',
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// ------------------ DESTRUCTURING ARRAYS TO LOGICAL ASSIGNMENT OPERATORS ----------------------------------
/* 
// passing an object then destructuring on the function
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({ address: 'Via del Sole, 21', starterIndex: 1 });
/*
// Example of destructuring array

const arr = [2, 3, 4];
const [x, y, z] = arr; // this does not affect the original array. We're just unpacking it.

console.log(x, y, z);

let [main, , secondary] = restaurant.categories; // you can leave spaces if you're looking to skip a value
console.log(main, secondary);

// basic switching of values
let temp = main;
main = secondary;
secondary = temp;

console.log(main, secondary);

[main, secondary] = [secondary, main];

// Receive 2 return values from a function
const [order1, order2] = restaurant.order(2, 0);
console.log(order1, order2);

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [arrItem1, , arrItem2] = nested;
// console.log(arrItem1, arrItem2);
const [i, , [j, k]] = nested; // this is the way to go (for best practice)
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9]; // you initialized default values into array destructuring
console.log(p, q, r);
// -----------------------------------------------------------
// Destructuring objects

// we use {} to destructure objects while we destructure arrays by using []

// Simply destructuing an object with similar variable names
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// destructuring an object with difference variablenames
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const {
  menu = [],
  starterMenu: starters = [],
  mainMenu: main = [],
} = restaurant;
console.log(starters, main);

// mutating variables while destructuring objects

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// Before
//{a,b} = obj; // to make this work, we need to wrap it inside a parenthesis so that we can mutate the initial a and b values, 111 and 999 respectively to 23 and 7 respectively.

// after
({ a, b } = obj); // now it works
console.log(a, b);

// nested objects
const {
  fri: { open, close }, // fri is an object within opening hours. to access its contents, use another curly brace but with the properties of the child object fri.
} = openingHours;
console.log(open, close);

// ---------------------------------------------------------------------
// the spread operator
const arr = [7, 8, 9];

// manual assign
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// using spread operator
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // this creates a completely new array
console.log(newMenu);

// copy array

const mainMenuCopy = [...restaurant.mainMenu]; // creates a shallow copy of mainmenu similar to object.assign()

// join 2 arrays
const allMenus = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(allMenus);

// spread operator works on all iterables like arrays, strings, maps, sets. NOT OBJECTS
// spread operator does not work on temperal strings like `${...str}`. ${} does not expect a lot of values, only ONE, hence the reason why spread operator does not work.

// Real world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(...ingredients);

// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Gusto' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; // creates a shallow copy of an object
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy);
console.log(restaurant);

// ---------------------------------------------------------------

// Rest Pattern and Parameters
// spread: unpack values, rest: packs values

// SPREAD, because on right side of =
const arrnew1 = [1, 2, ...[3, 4]];

// REST, because on left side of =
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

const [pizza, risotto, ...restOfMenu] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// REST must always be at the end of destructuring. AGAIN MUST ALWAYS BE AT THE END AND IT SHOULD ONLY BE ONE
console.log(pizza, risotto, restOfMenu);

// objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// functions
const addition = function (...numbers) {
  // example of rest parameters
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

addition(2, 3);
addition(5, 3, 7, 2);
addition(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
addition(...x);

// this is the difference between REST and SPREAD. Rest packs values while Spread unpacks values

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// ------------------------------------------------------------------------------------

// Short circuiting && and || operators

// --------- OR -------------
// poperties of OR operators: use any data type, return any data type, and short circuiting
console.log(3 || 'Charles'); // shorcircuiting is basically returning the first value if the first value is a truthy value.
// other examples
console.log('' || 'Jonas'); // outputs jonas cuz '' is a falsy value
console.log(true || 0); // outputs true because its a truthy value
console.log(undefined || null); // outputs null because undefined is falsy. it outputs null nonetheless.

/*
restaurant.numGuests = 23;
// What I normally do
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// A better way using short circuiting
const guests2 = restaurant.numGuests || 10; // its basically the same. if falsy value/Does not exist, guest2 is 10, else, guest2 is restaurant.numGuests.
console.log(guests2);


// ---------------- AND ------------------

console.log(0 && 'Charles'); // AND operators shortcircuits when the first value is falsy.
console.log(true && 'Charles'); //2nd scenario, first value is truthy, it returns the last truthy value given that there are no falsy value
console.log(true && 'Charles' && 'Ching' && 0 && 'Loves'); // this should return zero

// Practical example (use case for && shortcircuiting)
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushhrooms', 'spinach');

// ------------------------------------------------------------------------
// Nullish Coalescing operator (??)

restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// Nullish Coalescing operator only recognize null and undefined. 0 and '' is not falsy in this operator
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// -------------------------------------------------------------------------
// Logical Assignent Operators
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Karpavov',
};

// rest2.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// or assignment operator (||=)
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// and assignment operator
// rest2.owner = rest2.owner && '<ANONYMOUS>'; // this works because it shortcircuits to anonymous (last value) and there were no falsy values

rest1.owner &&= 'ANONYMOUS';
rest2.owner &&= 'ANONYMOUS';
console.log(rest1, rest2);
*/

// --------------------------------------------------------------------------------------------------------

// CODING CHALLENGE 1

// Object
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//1.
const [players1, players2] = game.players;
console.log(players1, players2);

//2.
const [gk, ...otherPlayers] = players1; // assigns the variable gk to Munich and an array of players
console.log(gk, otherPlayers);

//3.
const allPlayers = [...players1, ...players2];

//4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

const printGoals = function (...playerScored) {
  //initial : console.log(...playerScored, playerScored.length);

  //edit
  console.log(`${playerScored.length} goals were scored by`, ...playerScored);
};

printGoals(...game.scored);

// logs which one is more likely to win
const probWinner1 = team1 < team2 && 'Team 1 is more likely to win';
const probWinner2 = team2 < team1 && 'Team 2 is more likely to win';
console.log(probWinner1 || probWinner2);

// --------------------------------------------------------------------------------------------------------------

console.log('------------------CODING CHALLENGE 2----------------------');
// Coding Challenge 2
const scorers = {};
const [...players] = game.scored;
const oddsValue = Object.values(game.odds);
const odds = Object.entries(game.odds);
let averageOdd = 0;

// prints goal number and player who scored the goal
for (const [i, player] of players.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// adds the total then divide by the length of the odds value array to get the average
for (const odd of oddsValue) {
  averageOdd += odd;
}
averageOdd /= oddsValue.length;
console.log(`Average Odd: ${averageOdd}`);

// logs the team and its odds of winning
for (const [team, odd] of odds) {
  console.log(
    `Odd of ${game?.[team] ? 'Victory ' + game[team] : 'draw'}: ${odd}`
  );
  averageOdd += odd;
}

// stores scorers
for (const player of players) {
  scorers?.[`${player}`]
    ? (scorers[`${player}`] += 1)
    : (scorers[`${player}`] = 1);
}
console.log(scorers);
// --------------------------------------------------------------------------------------------------------------

console.log('------------------CODING CHALLENGE 3----------------------');
const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow card'],
]);

const events = [...new Set(gameEvents.values())]; // creates an array of game events map with no repetition
gameEvents.delete(64);

// Bonus: get the time programatically
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
for (const [minutes, event] of gameEvents.entries()) {
  console.log(
    minutes <= 45
      ? `[FIRST HALF]${minutes}: ${event}`
      : `[SECOND HALF]${minutes}: ${event}`
  );
}
//console.log(events);
// console.log(gameEvents);
// --------------------------------------------------------------------------------------------------------------
/*
// For -of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item); // for of loop format: for(const variable of array);

// in getting an index
// initial
// for (const item of menu.entries()) {
//   // array.entries() method contains the index and value of the array. basically a nested for loop.
//   console.log(item);
// }

for (const [i, el] of menu.entries()) {
  // the reason why we used i and el is because item on the previous for of loop was an array in and of itself. We're basically destructuing the array directly and assigning index 0 to i and index 1 to el. Hence, getting the index and element at the same time.
  console.log(`${i + 1}: ${el}`);
}

// ---------------------------------------------------------------------------------------------------------------

// Enhanced object literal

// redirect to the first part of the js fiel to view enhanced object literals

// ----------------------------------------------------------------------------------------------------------------

// optional chaining => if a certain property does not exist, undefined is returned immediately

if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon);
console.log(
  `The restaurant opens on Friday at ${restaurant.openingHours?.fri?.open} am` //you can also have multiple optional chaining
);

// with optional chaining
console.log(restaurant.openingHours.mon?.open); // only if monday exist, open will read. if not, return undefined

// optional chaining with nullish coalescing
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining on methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// Optional chaining on methods format: object.method?.() Its basically asking if the function/method exists in the object, and if it does, the preceeding () will call the method.

// optional chaining on arrays

//const users = [{ name: 'Charles', email: 'hello@ching.io' }];
const users = [];
console.log(users[0]?.name ?? 'User array empty');

// -------------------------------------------------------------------------------------------------------------------
// looping objects

// Property names
const properties = Object.keys(openingHours);

let openStr = `We are open on ${properties.length} days: `;
for (const [i, day] of properties.entries()) {
  // object.keys(object property) is basically like an array if you think about it. The for of loop
  i !== properties.length - 1
    ? (openStr += `${day} `)
    : (openStr += `and ${day}`);
}

console.log(openStr);

// Property values
const values = Object.values(openingHours); // sends out the values/property of the object
// console.log(values);

const entries = Object.entries(openingHours); // an array of the whole object

for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, we open at ${open} and close at ${close}`);
}
*/

// ------------------------------------------------------------------------------------------------------------------

/*
// Sets and Maps
// Sets => a collection of unique values. Can never have any duplicates

// format of declaring a set
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pizza',
  'Pasta',
]);
console.log(ordersSet); // you can use spread operator because they are iterables

console.log(new Set('Charles')); // logs in the characters

console.log(ordersSet.size); // similar to .length of an array
console.log(ordersSet.has('Pizza')); // similar to .includes() of an array

ordersSet.add('Garlic Bread'); // adds elements to a set
console.log(ordersSet);

ordersSet.delete('Pizza'); // deletes elements
console.log(ordersSet);

//ordersSet.clear(); // another method that clears the set

// SETS USE CASE => Remove duplicate values of arrays

// Example
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];

const setOfStaff = [...new Set(staff)]; // <= making a set into an array
console.log(setOfStaff);

console.log(new Set('CharlesChing').size);
// ONLY USE SETS WHEN YOURE DEALING WITH UNIQUE VALUES

// --------------------------------------------------------------------------------------------

// Maps fundamentals => a ds we can use to map values to keys.
// format of map

const rest = new Map(); // empty map
rest.set('name', 'Jollibee'); // make a key name with jollibee value
rest.set(1, 'Binangonan');
rest.set(2, 'Manila');
console.log(rest.set(3, 'Bulacan')); // returns update maps

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :-(');

// basically .set() is the method to use when adding a key value pair
// NOTE THAT WE CAN ALSO HAVE BOOLEAN KEYS

// .get() is the method to use when retrieving data from the map.
console.log(rest.get('name'));
console.log(...rest.get('categories'));

const time = 20;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // shows the use case of booleans as keys on maps. Since expressions inside rest.get() returns true or false, rest.get() refers to the boolean key value on the map.

// .has() returns a boolean value based on the key value existing on the map. Example:
console.log(rest.has('categories')); // logs true
console.log(rest.has('Pwet')); // logs false

// .delete() deletes a key on the map

rest.delete(2); // deletes '2' key on the map.

// .size returns the length of the map
console.log(rest.size);

// .clear() clears the maps

const arr = [1, 2]; // to use arrays, you need to declare them first.
rest.set(arr, 'Test');
console.log(rest.get(arr));

// using dom
rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);

// Maps Iteration --------------------
// Another way to create a new map without using .set() method

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct Answer!'],
  [false, 'Incorrect Answer.'],
]);

console.log(question);

// convert object to map
const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

// iteration

// Simple application using the questions map.
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = prompt(`${question.get('question')}
// Answer 1 if C, 2 if Java, 3 if Javascript`);

// alert(question.get(Number(answer) === question.get('correct')));

// Convert map to array
console.log([...question]); // uses spread operator to make an array
console.log([...question.keys()]); // array of keys
console.log([...question.values()]); // array of values

*/
// ---------------------------------------------------------------------------------------------------------------

// When to use specific data structures

/*

DATA STRUCTURES OVERVIEW
Sources of Data
=> from the program itself (INITIALIZATION/DECLARING VALUES)
=> from the UI (USER INPUT)
=> from external sources (API[application programming interface])

We store these collections of data in data structures.

if simple list => arrays or sets
if key/value pairs => objects or maps -> keys allow us to describe values

WEB APIs come from a special data format called JSON

JSON is just a text that we turn into objects

Weaksets and Weakmaps data structures (stacks queues, linkedlists, trees, hash tables)

ARRAYS VS SETS

arrays => when you need ordered list of values that might contain duplicates. 
  use when you need to manipulate data.

sets => use when you need to work with unique values. 
  use when high-performance is really important. 
  use to remove duplicates from arrays.

OBJECTS VS MAPS

objects => more traditional key/value store.
  easier to write and access values with . and [] notation

  USE WHEN: you need to include functions(methods) and when working with JSON

maps => better performance.
  keys can have any data type.
  easy to iterate. easy to compute size.

  USE WHEN: you simple need to map key to values(JSON to Object conversion) and when you need keys that are not strings(numbers,boolean,arrays, etc).
*/

// -----------------------------------------------------------------------------------------
