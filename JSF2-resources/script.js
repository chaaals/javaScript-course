// THIS JS FILE IS USED FOR A CODE ALONG FOR JS FUNDAMENTALS 2
'use strict'
/*
// Activating Strict Mode
'use strict'; // activates strict mode, must be at the very top

// strict mode basically shows errors on the console than failing silently

let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriversLicense = true;
if(hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio'; shows an error because interface is a reserved word
*/

// ---------------------------------------
/*
// Functions

function logger(){
    console.log('My name is Charles');
}

logger(); // calling / running / invoking the function

function fruitProcessor(apples,oranges){
    console.log(apples,oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

console.log(fruitProcessor(1,3));

// Assignment in Functions
console.log('Assignment in Functions');
// creates a function to describe a country
function describeCountry(country,population,capitalCity){
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const philippinesDescription = describeCountry('Philippines', 109, 'Manila');

// logs Philippines description
console.log(philippinesDescription);

// logs Finland description
console.log(describeCountry('Finland', 6, 'Helsinki'));
*/

//-----------------------------------------

// Function declaration and expression
/*
// function declaration
function calcAge1(birthyear){
    const age = 2022 - birthyear;
    return age;
}

console.log(calcAge1(2008));

// function expression

const calcAge2 = function(birthyear){
    return 2022 - birthyear;
}

console.log(calcAge2(2000));
*/

/*
// Arrow functions
const age = birthYear => 2022 - birthYear;
console.log(age(2000)) ;

const yearsUntilRetirement = (birthYear,firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires will retire in ${retirement} years.`;
}

console.log(yearsUntilRetirement(2000, 'Charles'));
*/

// ----------------------------------------

/*
// Functions calling other functions

function cutFruitPieces(fruit){
    return fruit * 4;
}
function fruitProcessor(apples,oranges){
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    console.log(applePieces,orangePieces);
    const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges`;
    return juice;
}

console.log(fruitProcessor(2,3));
*/

// ----------------------------------------

/*
// Coding Challenge

// average calculator
const calcAverage = (score1,score2,score3) => (score1 + score2 + score3)/3;

// logic
const checkWinner = function (avgDolphins, avgKoalas) {
    
    if(avgDolphins >= avgKoalas*2){
        console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
    } else if(avgKoalas >= avgDolphins*2){
        console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
    } else{
        console.log(`Nobody wins! (${avgDolphins} vs ${avgKoalas})`);
    }
}

// test data and calling function

let avgDolphins = calcAverage(44,23,71);
let avgKoalas = calcAverage(65,54,49);
checkWinner(avgDolphins, avgKoalas);


avgDolphins = calcAverage(85,54,41);
avgKoalas = calcAverage(23,34,27);
checkWinner(avgDolphins, avgKoalas);
*/

// ----------------------------------------
// Introduction to Arrays

// declaring an array
// one way (literal syntax)
/*
const friends = ['Charles', 'Matthew', 'Ching'];

console.log(friends);

//another way (using array method)
const years = new Array(1990, 1967, 2000, 2002, 2008);

console.log(years);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// Array exercise

function calcAge1(birthyear){
    const age = 2022 - birthyear;
    return age;
}

console.log(calcAge1(years[4]));
*/
// ---------------------------------------

/*
// Basic operations on arrays

// Array methods
const friends = ['Joey', 'Chandler', 'Ross', 'Monica', 'Phoebe', 'Rachel'];

// Adding Elements
console.log(friends);
friends.push('Ugly Naked Guy'); // .push adds a value at the end of the array

console.log(friends);

friends.unshift('Sara');
console.log(friends); // .unshift adds a value at the beginning of the array

// Removing Elements
friends.pop(); // .pop removes a value at the end of the array.
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // .shift removes the value at the beginning of the array
console.log(friends);
console.log(friends.indexOf('Joey')); // .indexOf returns the index of the a string in the array.

console.log(friends.includes('Phoebe')); //.includes returns a boolean value. true if the string value is there, false if it isn't.

// Coding Challenge 2
console.log('Coding Challenge 2: Arrays');

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

// Just testing out an alternative way to create arrays. Note that the proper way to write arrays is still varaiable = []

// has the test data
const bills = new Array(125,555,44);

// calculates tip using the calcTip function
const tips = new Array(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]));

// adds the bill and the tip
const total = new Array(bills[0]+tips[0],bills[1]+tips[1],bills[2]+tips[2]);

console.log(bills, tips, total);

*/

// ---------------------------------------
// Introduction to Objects

// DECLARING OBJECTS


/* // object structure
const variableName = {
    keyValue:'pairValue', // <- use comma to make a new key value pair
    // .....
    keyValueN: 'pairValueN'
}; // <- use semi colon to end object declaration
*/

// in objects, we declare key value pairs

// simplest way of creating objects
// object literal syntax
// const charles = {
//     firstName : 'Charles',
//     lastName : 'Ching',
//     age : 2022 - 2000,
//     job: 'Student',
//     friends: ['Charles','Matthew', 'Ching']
// };

// each keys are also called as properties

// RETRIEVING DATA FROM OBJECTS USING DOT AND BRACKET NOTATION

// console.log(charles);

// dot notation
// console.log(charles.lastName);
// console.log(charles.friends);

// bracket notation
// console.log(charles['lastName']);

// const nameKey = 'Name';
// console.log(charles[`first${nameKey}`] + " " + charles[`last${nameKey}`]);

// User input
// const interestedIn = prompt(`What do you want to know about Charles? Choose between firstName, lastName, age, job, and friends`);

// const dataRetrieval = function (userInput){
//     console.log(charles[`${interestedIn}`]);   
// }

// dataRetrieval(interestedIn);

// In addition, you can also use user input to create logic on your program. bracket notation uses truthy and falsy values. meaning if the object you're trying to call is not existing, it will be false, otherwise, it will be true.

// example

// const dataRetrieval = function (userInput){

//     if(charles[userInput]){
//         console.log(charles[userInput]);
//     } else{
//         console.log(`Request ${userInput} does not exist. Please enter a valid request.`);  
//     }
// }

// dataRetrieval(interestedIn);

// uses cases for dot and bracket notation
// adding new keypair values
// console.log(charles) // initial
// charles.location = 'Philippines';
// charles['twitter'] = '@_chaals';

// Challenge
// log this string without hard coding the values 'Jonas has 3 friends and his best friend is called Michael'

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 2037 - 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Petter', 'Steven']
// };

// console.log(`${jonas['firstName']} has ${jonas['friends'].length} and his best friend is called ${jonas['friends'][0]}`);

// OBJECT METHODS
// we can add functions to objects

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Petter', 'Steven'],
//     hasDriversLicense: true,
//     calcAge: function(birthYear){
//         return 2037-birthYear}
// };

// console.log(jonas.calcAge(1980));

// const logger = {
//     itlawg: function(lawg){
//         return lawg;
//     }
// }

// console.log(logger.itlawg('lawg'));

// 'this' basically points to the object that has the specific property you're trying to call.

/*
// example
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Petter', 'Steven'],
    hasDriversLicense: true,

    // calcAge: function(birthYear){
    //     return 2037-birthYear} // we can remove the birthyear here. instead we call it by using 'this.'

//     calcAge: function(){
//         // console.log(this);
//         return 2037 - this.birthYear;
//     }
// };

// console.log(jonas.calcAge()); // notice that you don't have to put any value here. the function automatically refers to the birthYear key.

// additional note: 'this' works inside the object.

// console.log(this); // 'this' outside the object grants you access to different methods like alert, document.

calcAge: function(){
    this.age = 2037 - this.birthYear;
    }

};
*/
/*
// small challenge
const charles = {
    firstName: 'Charles',
    lastName: 'Ching',
    birthYear: 2000,
    job: 'Student',
    friends: ['Michael', 'Petter', 'Steven'],
    hasDriversLicense: true,
    calcAge: function(){
        this.age = 2037 - this.birthYear;
        return this.age;
        },
    getSummary: function(){
        this.summary = `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense === true ? "a driver's license" : "no driver's license"}.`;
        return this.summary;
    } 
};

console.log(charles.getSummary());

// functions in an object is called a method.
// Coding Challenge #3 - Objects

// Mark's Object Declaration
const markBMI = {
    fullName: 'Mark Miller',
    mass:78,
    height:1.69,
    calcBMI: function(){
        this.BMIResult = this.mass/this.height**2;
        return this.BMIResult; 
    }
}

// John's Object Declaration
const johnBMI ={
    fullName: 'John Smith',
    mass:92,
    height:1.95,
    calcBMI: function(){
        this.BMIResult = this.mass/this.height**2;
        return this.BMIResult; 
    }
}

// Using ternary operator and temperal string, console logs which one of them has the higher BMI

console.log(markBMI.calcBMI() > johnBMI.calcBMI() ? `Mark's BMI (${markBMI.calcBMI()}) is higher than John's (${johnBMI.calcBMI()})!` : `John's BMI (${johnBMI.calcBMI()}) is higher than Mark's (${markBMI.calcBMI()})!`);
*/

// -----------------------------------------------------------

// Loops/iterations

// console.log('Liftwing weights repetition 1');

// for loop keeps running while condition is true
// for(let i = 0; i < 10; i++){
//     console.log(`Lifting weight repetition ${i+1}`);
// }

// looping arrays, breaking, and continuing

// const charlesArray = [
//     'Charles',
//     'Ching',
//     2037 - 2000,
//     'Student',
//     ['Charles','Matthew','Ching'],
// ];

// const types = new Array();

// for(let i = 0; i < charlesArray.length; i++){
//     if(typeof charlesArray[i] !== 'string') continue;
//     types.push(typeof charlesArray[i]);
//     console.log(`Data retrieved ${charlesArray[i]}`);
// }

// for(let i = 0; i < charlesArray.length; i++){
//     if(typeof charlesArray[i] === 'number') break;
//     types.push(typeof charlesArray[i]);
//     console.log(`Data retrieved ${charlesArray[i]}`);
// }
// console.log(types);

// continue and break statement
// continue is to exit the current iteration and move on to the next one while break terminates the whole loop.

/*
// Looping backwards and nested loops

const charlesArray = [
        'Charles',
        'Ching',
        2037 - 2000,
        'Student',
        ['Charles','Matthew','Ching'],
];

for(let i = charlesArray.length - 1; i >= 0; i--){
    console.log(charlesArray[i]);
}

// nested for loops
for(let exercise = 1; exercise <= 3; exercise++){
    console.log(`---------- Starting exercise ${exercise}`);
    for(let rep = 1; rep <= 5; rep++){
        console.log(`Exercise # ${exercise} repetition ${rep}`);
    }
}

// while loop
/*
    Converting
    for(let i = charlesArray.length - 1; i >= 0; i--){
    console.log(charlesArray[i]);
    }

    to a while loop.


let rep = charlesArray.length - 1;
while(rep >= 0){
    console.log(charlesArray[rep]);
    rep--;
}

let dice = Math.trunc(Math.random() * 6) + 1;
while(dice != 6){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
}

 // you can use while loop whenever you don't know how long a loop will run. however, if you do know how many times it will run, use a for loop instead.
*/

// Coding Challenge #4

const bills = [22,295,176,440,37,105,10,1100,86,52];
const tips = new Array();
let totals = new Array();

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

for(let i = 0; i <= bills.length - 1; i++){
    tips[i] = calcTip(bills[i]);
    totals[i] = bills[i] + tips[i];
}

console.log(tips, totals)

// Bonus on coding challenge 4

const calcAverage = function(arr){
    let sum = 0;

    for(let i = 0; i <= arr.length - 1; i++){
        sum += arr[i];
    }

    const average = sum/arr.length;
    return average;
}

console.log(`Average: ${calcAverage(totals)}`);

// --------------------------- END ---------------------------