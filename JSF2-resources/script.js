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
const friends = ['Charles', 'Matthew', 'Ching'];

console.log(friends);

//another way (using array method)
const years = new Array(2000, 2002, 2008);

console.log(years);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);