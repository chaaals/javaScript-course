'use strict';

// ----------------------------------------------------------------
// Constructor Functions
// Notes: constructor functions are just like normal functions, but the difference is that we call the function with the 'new' key word.

// Arrow functions will not work as a function constructor therefore we need to use function(){...} because we need the 'this' keyword

// how a constructor function works. it uses the 'this' keyword to make a property based on the parameter of the function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Bad practice. Don't create methods inside a constructor function.
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
}; // its basically a blue print to make objects

const charles = new Person('Charles', 2000); // this is how we call a constructor
console.log(charles); // created an object named charles

// new operator BEHIND THE SCENES
// 1. A new empty object is created.
// 2. the function is called and the 'this' key world points to the new empty object.
// 3. The newly selected object is linked to the prototype.
// 4. the object is automatically return from the constructor function.

const patricia = new Person('Patricia', 2000);
console.log(patricia);

// NOTE: JS does not have classes. Instead, we use constructor functions to simulate classes.

console.log(charles instanceof Person); // returns a boolean value. really useful to check if a specific object is an instance of a constructor function.

// -----------------------------------------------------------------------
// Prototypes

// every function in JS automatically has a property called 'prototype'
// all objects created from the constructor function will gain access to all the methods and properties that we define on the constructor's prototype property.

console.log(Person.prototype);

// This is how we can make methods inside an object. This works because of prototypal inheritance.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

charles.calcAge();
patricia.calcAge();

console.log(charles.__proto__); // __proto__ came from the 3rd step of the new operator. The object is linked to the prototype property.

// proves that the prototype property of Person is similar to the object charles.
console.log(Person.prototype.isPrototypeOf(charles));

Person.prototype.species = `Homo Sapiens`;

console.log(charles, patricia);

console.log(charles.hasOwnProperty('firstName')); // true: because firstName is within the object
console.log(charles.hasOwnProperty('species')); // false: because species can only be accessed through prototypal inheritance.

// --------------------------------------------------------------------------------
// Prototypal Inheritance and the Prototype chain

// NOTE: Person.prototype does not mean 'prototype of the constructor function Person.' Instead, it is the prototype of all the objects created in the Person constructor.

// Person.prototype.constructor => basically points back to itself (constructor)

// Prototype Chain starts from Object.prototype => constructor.prototype => instance(object made from constructor).prototype. All these follow prototypal inheritance in which all of them has access to properties of Object.prototype.

// --------------------------------------------------------------------------------
// Prototypal Inheritance on Built-in objects

console.dir(Person.prototype.constructor);

const arr = [1, 3, 4, 6, 4, 7, 1, 7, 9, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// with this, we can create a new method. However, it isn't advisable.
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(h1.__proto__); // protype chain can go really deep.

console.dir(x => x + 1); // function itself is also an object, therefore, it also has a prototype.

// --------------------------------------------------------------------------------
// Coding Challenge
console.log('CODING CHALLENGE 1 --------------------------------');

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car1.brake();

// car2.accelerate();
// car2.accelerate();
// car2.brake();

// const todo = [];

// const Task = function (task) {
//   this.task = task;
// };

// todo.forEach(function (slot, i) {
//   let task = new Task('Whats up, an object is created');
//   console.log(todo.push(task));
// });

// --------------------------------------------------------------------------------
// ES6 Classes: More modern way of OOP

// Class Expression
// const PersonClx = class{}

// Class declaration
class User {
  // preferred

  // Constructor
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Welcome back, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Something to keep in mind while setting a property that already exists.

  // When there are two similar variable names, you can create another iteration of the same variable by adding an
  // underscore before it.
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`hey there!`);
    console.log(this);
  }
}

const matthew = new User('Matthew Ching', 1980);

console.log(matthew);

matthew.calcAge();

console.log(matthew.age);
console.log(matthew.fullName);
console.log((matthew.fullName = matthew.fullName));
// User.prototype.greet = function () {
//   console.log(`Welcome back, ${this.firstName}`);
// };

matthew.nameValidation = matthew.fullName;
matthew.greet();

const walter = new User('Walter White', 1965);
console.log(walter);

// NOTES:
// 1. Classes are NOT hoisted.
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

// -----------------------------------------------------------------------------
// Setters and Getters => called assesor properties

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice().pop(); // create a shallow copy then pop
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

// console.log(account.latest); // this is how you call a method with getters
// console.log(account.movements);

// account.latest = 40; // using setters
// console.log(account.latest);

// -----------------------------------------------------------------------------
// Static methods

Person.hey = function () {
  console.log(`Hey there!`);
  // console.log(this);
};

Person.hey(); // example of static methods. it is not inherited because it's not in the prototype

// Static method created on User class

User.hey();

// -----------------------------------------------------------------------------
// Third way of applying prototypal inheritance: Object.create()

// An uncommon way of prototypal inheritance
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();

console.log(steven.__proto__.__proto__);

const sarah = Object.create(PersonProto);
// Object.create() creates a new object with the object literal that we passed in as its prototype. With this, every method we have on the said object literal can be used by the new object that was created.

sarah.init('Sarah', 1979);
sarah.calcAge();

// --------------------------------------------------------------------------------
// Coding Challenge

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 20;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed / 1.6;
  }
}

const ford = new Car('Ford', 120);
ford.speedUS = ford.speed;

ford.accelerate();
ford.accelerate();
ford.brake();

// --------------------------------------------------------------------------------
// Inheritance between classes

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  Person.call(this, firstName, birthYear); // a better way to make a constructor function with similar properties to another function. Analogy: Person is a parent while Student is a child

  // .call(this, var1,var1) helps us set a this keyword while calling the Person constructor function. However, new Person(firstName,birthYear) works as well

  this.course = course; // additional details exclusive to the student constructor
};

// !!!! SHOULD BE PLACED BEFORE THE CONSTRUCTOR FUNCTION'S METHODS !!!!

Student.prototype = Object.create(Person.prototype); // This line of code here links two constructor functions via prototype.

// Explanation: since we want Student to inherit properties from Person, we need to make the prototype of Student to Person. We can easily do this by doing Student.prototype = Object.create(Person.prototype)

// While Object.create() is not that frequently used to create objects, its normally used to link constructor functions to one another.

Student.prototype.introduce = function () {
  console.log(`Hi! My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();

mike.calcAge(); // for context: caclAge() is a method from the Person constructor function. Since we linked two constructor functions under the parent's prototype (Person.prototype), mike object inherits any method from Person.

console.log(mike.species);
console.log(mike);

console.log(mike instanceof Student);

Student.prototype.constructor = Student; // fixes the constructor of Student constructor function as it is changed to the constructor of person constructor function when we linked both of these.

console.dir(Student.prototype.constructor);

// --------------------------------------------------------------------------------
// Coding Challenge 3

// const CarX = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// CarX.prototype.accelerate = function () {
//   this.speed += 10;
// };
// CarX.prototype.brake = function () {
//   this.speed -= 10;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
//   );
// };

// const EV = function (make, speed, charge) {
//   CarX.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(CarX.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`${this.make} charged to ${this.charge}%`);
// };

// // Example of Polymorphism => a child class overwriting and existing method on the parent class. In this case, CarX.
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   --this.charge;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
//   );
// };
// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(100);
// tesla.accelerate();
// tesla.brake();

// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// setInterval(() => tesla.accelerate(), 1000);

// --------------------------------------------------------------------------------
// Inheritance between ES6 Classes
// Necessary keywords: extends, super

// class child extends parent
class StudentX extends User {
  constructor(fullName, birthYear, course = 'undecided') {
    // constructor.call(this,val,val) counterpart in ES6 class inheritance

    super(fullName, birthYear); //always needs to happen first! Responsible in creating the this keyword.
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const charlie1 = new StudentX('Charlie Ching', 2000, 'Computer Science');
// const charlie2 = new StudentX('Charlie Ching', 2000);

console.table(charlie1);
// console.table(charlie2);

charlie1.introduce();
charlie1.calcAge(); // polymorphism

// --------------------------------------------------------------------------------
// Inheritance between Object.create() Classes

const PersonProtoX = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// const steven = Object.create(PersonProtoX);

const StudentProto = Object.create(PersonProtoX); // StudentProto becoms the child of PersonProtoX
const jay = Object.create(StudentProto); // inherits from StudentProto and PersonProtoX

StudentProto.init = function (firstName, birthYear, course) {
  PersonProtoX.init.call(this, firstName, birthYear);
  this.course = course;
};

jay.init('Jay', 2010, 'Computer Science');

console.log(jay);
jay.calcAge();

// --------------------------------------------------------------------------------
// Another class example

// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${this.owner}`);
//   }

//   // Public Interface of our object

//   deposit(mov) {
//     this.movements.push(mov);
//   }

//   withdraw(mov) {
//     this.deposit(-mov);
//   }

//   approveLoan(mov) {
//     return true;
//   }
//   requestLoan(mov) {
//     if (this.approveLoan()) this.deposit(mov);
//     console.log(`Loan of ${mov} has been approved for ${this.owner}`);
//   }
// }

// const acc1 = new Account('Charles', 'PHP', 1111);
// console.log(acc1);

// acc1.deposit(250);
// acc1.withdraw(140);

// acc1.requestLoan(1000);

// --------------------------------------------------------------------------------
// Data encapsulation and privacy

// NOTE: To protect keys and methods on a class, you simply follow the underscore convention most developers use. Example: this.movements is not considered protected whil this._movements is.

// Truly private class fields => Public fields, Private fields, Public methods, Private methods
// Static version are less important. We can explore it but not necessary.

class Account {
  // How to define a public field (instances)
  locale = navigator.language;

  // How to define a private field
  #movements = [];
  #pin; // if its based on input, you can just define it. No need to set a value

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected property
    this.#pin = pin; // this is where you can set a value onto it.

    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public Interface of our object. It is also an example of public methods
  getMovements() {
    return this.#movements;
  }

  deposit(mov) {
    this.#movements.push(mov);
    return this;
  }

  withdraw(mov) {
    this.deposit(-mov);
    return this;
  }

  requestLoan(mov) {
    if (this.#approveLoan()) this.deposit(mov);
    console.log(`Loan of ${mov} has been approved for ${this.owner}`);
    return this;
  }

  // Private Methods => useful to hide implementation details

  #approveLoan(mov) {
    return true;
  }
}

const acc1 = new Account('Charles', 'PHP', 1111);
console.table(acc1);

acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000);

console.log(acc1.getMovements());

// acc1.#approveLoan();

// --------------------------------------------------------------------------------
// Chaining Methods
// => returning the this keywords helps in chaining all methods.

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// --------------------------------------------------------------------------------
// ES6 classes summary

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 20;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed / 1.6;
  }
}

// const EV = function (make, speed, charge) {
//   CarX.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(CarX.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`${this.make} charged to ${this.charge}%`);
// };

// // Example of Polymorphism => a child class overwriting and existing method on the parent class. In this case, CarX.
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   --this.charge;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
//   );
// };
class EV extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    --this.#charge;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );

    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} charged to ${this.#charge}%`);

    return this;
  }
}

const rivian = new EV('Rivian', 120, 23);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .chargeBattery(100)
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .brake()
  .accelerate()
  .brake();
