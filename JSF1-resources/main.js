// This js file is used in a code along for JS Fundamentals 1

/*
let js = 'amazing';
console.log(40+8+23-10);

console.log('Jonas');
console.log(23);

let firstName = 'bob';
console.log(firstName);
// it is recommended to write variables in camel case

let myFirstJob = 'Programmer';
let myCurrentJb = 'Teacher';

console.log(myFirstJob);

let country = 'Philippines';
let continent = 'Asia';
let population = '109.6 million';

// Assignment # 1 - values and variables
console.log(country);
console.log(continent);
console.log(population);
*/

//-----------------------------------------------------------------

/*
//Data types
true; //boolean value
console.log(true);
let jsIsFun = true; //assigning a boolean value to a variable. The value holds the data type NOT the variable
console.log(jsIsFun);

let tVariable;// initialized to represent undefined data type

console.log(typeof jsIsFun); //boolean
console.log(typeof 23); // number
console.log(typeof 'string'); // string
console.log(typeof tVariable); // undefined

jsIsFun = 'YES!';
console.log(typeof jsIsFun); // jsIsFun becomes a string. You can change values any time. The IDE reads the program from top to bottom.

console.log(typeof null); //this is regarded as a bug, they did not fix it for 'legacy reasons'

// Assignment # 2 - Datatypes
// gets ko na kaya di ko na ginawa hahaha

*/

// ----------------------------------------------------------------

/*
// let const and var

// let is mutable
let age = 30;
age = 31; //reassigning the variable or mutate the variable

// const is immutable
const birthYear = 1991; // correct way of declaring variables using const.
// const job; // wrong way of declaring variables using const. must have values.

//var is also mutable, never use var.
var job = 'programmer';
job = 'teacher';

// assignment let, const, and var
const country = 'Philippines'
const continent = 'Asia';
const language = 'Tagalog';
let population = 109000000;
console.log(country, continent, language, population);
*/

// ----------------------------------------------------------------

/*
// Math Operators
const currentYear = 2037;
const ageJonas = currentYear - 1991;
const ageSara = currentYear - 2018; 
console.log(ageJonas, ageSara);

console.log(ageJonas*2, ageJonas/10, 2 ** 3);
// 2 ** 3 means  to the power of 3

// Concatenation
const firstName = 'Charles';
const lastName = 'Ching';

console.log(firstName + " " + lastName);

// Assignment operator
let x = 10 + 5;
// other operators +=, -=, *=, /=
x += 10; // adds 10
x *= 4; // multiplies by 4
x++; // increment of 1
x--; // decrement of 1
console.log(x);

// Comparison operators >, <, >=, <=, ===
console.log(ageJonas === ageSara); // results into a boolean value
console.log(ageSara >= 18);
// in real programming, we store the value on a variable

const isFullAge = ageSara >= 18;
console.log(currentYear - 1991 > currentYear - 2018);

// Assignment
console.log('Assignment in Operators');
const country = 'Philippines';
const population = 109000000;
console.log(country + ' population: ', population);
let halvedPopulation = population / 2;
halvedPopulation++;

console.log(country + ' havled population: ', halvedPopulation);

const finlandPopulation = 6000000;
console.log(country + ' population is greater than Finland: ', halvedPopulation > finlandPopulation);

const averagePopulation = 33000000;
console.log('Does ' + country + ' have less people than the average country? (33 million): ', halvedPopulation < averagePopulation);

const description = 'Portugal is in Europe, and its 11 million people speak portuguese';
console.log(description);
*/

// ----------------------------------------------------------------

/*
// Operator precedence

const currentYear = 2037;
const ageJonas = currentYear - 1991;
const ageSara = currentYear - 2018; 

console.log(currentYear - 1991 > currentYear - 2018);

let x, y;
x = y = 25-10-5;
// initial thought - x would be undefined, y would be 10
// however, assignment operators goes from right to left and my initial thought goes from left to right
// hence x = y = 25-10-5 makes x = 10, y = 10
console.log(x,y);

const averageAge = (ageJonas + ageSara)/2;
console.log('Jonas and Sara age respectively: ', ageJonas, ageSara);
console.log('Their average age: ',averageAge);

*/

// ----------------------------------------------------------------

/*
// Coding Challenge

// Test data 1 Mark: 78 kg 1.69 m tall
// John 92 kg 1.95 m tall

// Test data 2 Mark: 95 kg 1.88 m tall
// John 85 kg 1.76

// Mark & John test data 1
const markMass = 78;
const markHeight = 1.69;

const johnMass = 92;
const johnHeight = 1.95;
let markBMI, johnBMI;

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log('Mark BMI: ', markBMI);
console.log('John BMI: ', johnBMI);
console.log("Is Mark's BMI higher than John?", markHigherBMI);

*/

// ---------------------------------------------------------------

/*
// Strings

const firstName = 'Charles';
const job = 'student';
const birthYear = 2000;
const currentYear = 2022

const charles = "I'm " + firstName + ", a " + (currentYear - birthYear) + " year old " + job + "!";

console.log(charles);

const charlesNew = `I'm ${firstName}, a ${currentYear-birthYear} year old ${job}!`; // template string
console.log(charlesNew);

// charlesNew is a better way to make charles. It's called a template string

console.log(`Just a regular string...`);
console.log('String with \n\
multiple \n\
lines');

console.log(`String
multiple
lines`);

// Assignment
console.log(`Assignment for Strings and Template literals`);

const description = `Portugal is in Europe, 
and its 11 million people 
speak portuguese`; // This is how you would write template literals
console.log(description);
*/

// ----------------------------------------------------------------

/*
// If else

const age = 18;

if(age >= 18){
    console.log(`You're of legal age, get ready to drive biatch!`);
} else{
    const yearsLeft = 18 - age;
    console.log(`Sara is too young, wait another ${yearsLeft} years.`);
}

const birthYear = 2000;
let century;

if(birthYear <= 2000){
    century = 20;
} else{
    century = 21;
}

console.log(century);

//Assignment
console.log(`Assignment on if/else statements`);

const population = 109000000;

let string;
if (population > 33000000){
    string = `Portugal's population is above average`;
} else {
    const average = (population + 33000000)/2;
    string = `Portugal's population is ${average} below average`;
}

console.log(string);
*/

// ----------------------------------------------------------------

/*
//Coding challenge

// Use of template literals and conditional statements
const markMass = 95;
const markHeight = 1.88;

const johnMass = 85;
const johnHeight = 1.76;
let markBMI, johnBMI;

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;

if(markBMI > johnBMI){
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
} else {
    console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})!`);
}
*/

// ----------------------------------------------------------------

/*
// Type Conversion
const inputYear = '2000'; // Basically bumabalik siya sa original data type kahit na cinonvert mo.
console.log(inputYear + 18); // output of this is 200018
console.log(Number(inputYear) + 18); // output of this is 2018

console.log(Number('Charles')); 

console.log(Number(inputYear), inputYear); // (becomes a number, still a string)

// Type Coercion
console.log('I am ' + 23 + ' years old');
// because of type coercion, this ^ is the same as:
console.log('I am ' + '23' + ' years old');

console.log('23' - '10' - 3); // type coercion also applies in this circumstance
console.log('23' * '2');

let n = '1' + 1; // will be 11
n = n - 1; // subtraction
console.log(n); // output is 10


//Assignment on Type Conversion and Coercion

My Answers
'9' - '5'; || 4 -> Correct
'19' - '13' + '17'; || '617' -> Correct
'19' - '13' + 17; || 23 -> Correct
'123' < 57; || false - Correct
5 + 6 + '4' + 9 - 4 - 2; || 117 -> Wrong, 1143 is the right answer
*/

// ----------------------------------------------------------------
/*
// Truthy  and Falsy Values

console.log(Boolean(0)); // falsy value
console.log(Boolean(undefined)); // falsy value
console.log(Boolean('Charles')); // truthy value
console.log(Boolean({})); // truthy value
console.log(Boolean(''));

const money = 0;

if(money){ // this returns false because of JS type coercion zero is a falsy value
    console.log("Don't spend it all ;");
} else{
    console.log("You should get a job");
}

let height = 0;

if(height){ // returns false because of JS type coercion as well. undefined variables is a falsy value
    console.log('Yay! height is defined!');
} else {
    console.log('height is not defined');
}
*/

// ----------------------------------------------------------------
/*
// Equality operators == vs ===

const age = 18;
if (age === 18){
    console.log('You just became an adult!');
}

// const favoriteNumber = prompt("What's your favorite number?");

if (Number(favoriteNumber) === 23){ // strict equality operator doesn't run the code within the if statement without wrapping the favoriteNumber variable to the Number function to perform type conversion. main reason is that input value is a string
    console.log(`${favoriteNumber} is your favorite number?! YAY! me too! `);
} else{
    console.log(`${favoriteNumber} is your favorite number?! What a disgrace. `);
}

if(Number(favoriteNumber) !== 23){ // !== is the strict inequality operator
    console.log(`${favoriteNumber} is a shit number, WHY ${favoriteNumber} ?!?!?! `);
}

// Assignment on equality operators

console.log('Assignment on equality operators');

const numNeighbours = prompt("How many neighbour countries does your country have? ");

if (Number(numNeighbours) === 1) {
    console.log('Only one border!');
} else if (Number(numNeighbours) > 1) {
    console.log('More than one border.');
} else {
    console.log('No borders!');
}

*/

// --------------------------------------------------------------------------------

/*
// Boolean Logic, AND, OR, NOT

const age = 16;
const A = age >= 20;
const B = age < 30;

console.log(A && B);
console.log(!age);
console.log(A || B);

// Logical operators

const hasDriversLicense = true; // A
const hasGoodVision = true; // B

// if (hasDriversLicense && hasGoodVision){
//     console.log(`Sara is able to drive.`);
// } else{
//     console.log(`Someone else should drive.`);
// }

const isTired = false; // C

if (hasDriversLicense && hasGoodVision && !isTired){
    console.log(`Sara is able to drive.`);
} else{
    console.log(`Someone else should drive.`);
}
// Assignment for Logical Operators

console.log('Assignment for logical operators');

const isSpeakingEnglish = true;
const lessThan50mPopulation = true;
const anIsland = false;

if (isSpeakingEnglish && lessThan50mPopulation && !anIsland){
    console.log(`You should live in Portugal :)`);
} else{
    console.log(`Portugal does not meet your criteria :(`);
}
*/

// --------------------------------------------------------------------------------

/*
// Coding Challenge

const totalScoreDolphins = 97 + 112 + 80;
const totalScoreKoalas = 109 + 95 + 50;

const dolphinsAverage = totalScoreDolphins/3;
const koalasAverage = totalScoreKoalas/3;

if(dolphinsAverage >= 100 && koalasAverage >= 100){
    if(dolphinsAverage > koalasAverage){
        console.log(`Dolphins win with an average score of ${dolphinsAverage}.`);
    } else if(koalasAverage > dolphinsAverage){
        console.log(`Koalas win with an average score of ${koalasAverage}.`);
    } else {
        console.log(`The match is a draw! ${dolphinsAverage} to ${koalasAverage}`);
    } 
} else{
    console.log(`The teams did not reach the minimum score of 100. No one wins the trophy`);
}
*/

// --------------------------------------------------------------------------------

/*
// Switch Statements

const day = prompt('What day is it?');

switch(day){
    case 'monday': // day === 'monday', if true, case 'monday would run'
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare nani lol');
        break;

    case 'wednesday':
    case 'thursday':
        console.log('Hackathon');
        break;
    case 'friday':
        console.log('Do assignments');
        break;
    case 'saturday':
    case 'sunday':
        console.log('Chill day cuz iz da weekend');
        break;
    default:
        console.log('Not a valid day. Ano ka alien?');
}

if(day === 'monday'){
    //code
} else if (day === 'tuesday'){
    //code
} else if (day === 'wednesday' || day === 'thursday'){
    //code
} else if (day === 'friday'){
    //code
} else if (day === 'saturday' || day === 'sunday'){
    //code
} else{
    //code
}

//Assignment for switch statement

const language = prompt("What's your language? ");

switch(language){

    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Its a great language too! :-D');
}
*/

// ------------------------------------------------------------------------------

/*
// Conditional Operator
// <= starts with '?' followed by mandatory <if statement> : <else statement>
const age = 18;

// using the ternary operator
const drink1 = age >= 18 ? 'Wine' : 'Water';
console.log(drink1);

// w/o using the ternary operator
let drink2;
if (age >= 18){
    drink2 = 'Wine';
}else{
    drink2 = 'Water'
}
console.log(drink2);

// We observe that using a ternary operator makes the code more cleaner and easier to read. We'll be utilzing this format on the whole course.

console.log(`I like to drink ${age >= 18 ? 'Wine' : 'Water'}`);

// You can also use ternary operators in template literals because its an experission that returns a value.

// Assignment on conditional operator
console.log('Assignment on conditional operator');

const countryPopulation = 33000000;
console.log(`${countryPopulation >= 33000000 ? "Portugal's population is above average" : "Portugal's population is below average"}`);
*/

// ------------------------------------------------------------------------------

/*
//Coding Challenge
// Tip Calculator
const billValue = prompt("Enter the bill value: ");
const tip = Number(billValue) >= 50 && Number(billValue) <= 300 ? Number(billValue) * .15 : Number(billValue) *.2;

console.log(`The bill was ${billValue}, the tip was ${tip}, and the total value ${Number(billValue) + tip}`);
*/
// ------------------------------------- END ------------------------------------