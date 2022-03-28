'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
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
