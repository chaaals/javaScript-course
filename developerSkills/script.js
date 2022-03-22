'use strict';

// const x = 11;
// const charles = 'charles';
// const calcAge = birthYear => 2037 - birthYear;

// // you can make useful user snippets. basically parang emmet siya na may ready made code. for example, ung pag console.log(), dahil sa user snippets, I can just type "log" and automatically isusuggest niya ung "console.log()" which is very useful para hindi na paulit ulit ung pag type.
// console.log(calcAge(10));
// console.log(calcAge(2000));

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: prompt('Degrees celsius: '),
//   };

//   const kelvin = Number(measurement.value) + 273;
//   return kelvin;
// };

// console.log(measureKelvin());
// console.warn(measureKelvin());
// console.error(measureKelvin());

const forecastedMaxTemp = [12, 5, -5, 0, 4];

const printForecast = function (forecastedMaxTemp) {
  let str = '';
  for (let i = 0; i < forecastedMaxTemp.length; i++) {
    str += `${forecastedMaxTemp[i]}°C in ${i + 1} days ... `;
  }
  return '... ' + str;
};

console.log(printForecast(forecastedMaxTemp));
