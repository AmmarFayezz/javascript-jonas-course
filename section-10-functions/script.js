"use strict";

// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPassenger = 1,
//   price = 199 * numPassenger,
// ) {
//   const booking = {
//     flightNum,
//     numPassenger,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123");

// createBooking("LH123", 5, 800);

// createBooking("LH123", 2);

// createBooking("LH123", 4);

// createBooking("LH231", undefined, 199);

// const flight = "LH235";

// const ammar = {
//   name: "ammar fayez",
//   passport: 1238746918273,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH333";
//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === 1238746918273) {
//     alert("Checked In");
//   } else {
//     alert("Wrong Passport!");
//   }
// };

// checkIn(flight, ammar);
// console.log(flight); //primitive will not be changed it just a copy of it
// console.log(ammar); //reference -> changing in copy will also happen to the original

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };
// newPassport(ammar);
// checkIn(flight, ammar);

//JavaScript dont have passing by reference only passing by value -> reference is still a value -> value that contain memory address
//we pass (a reference) to function but we do not pass (by reference)

const oneWord = function (str) {
  return str.replace(/ /g, "".toLowerCase());
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//High-order function
const transformer = function (str, fn) {
  console.log(`original str : ${str}`);
  console.log(`transformed str : ${fn(str)}`);
  console.log(`transformed by ${fn.name}`);
};

transformer("JavaScript is the best !", oneWord);
transformer("JavaScript is the best !", upperFirstWord);

//JS uses callbacks all the time
const high5 = function () {
  console.log("👋🏻");
};

document.body.addEventListener("click", high5);

["Jonas", "Martha", "Adam"].forEach(high5);

//functions return functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet("Hey");
greetHey("Ammar");

//we can do this too
greet("Hello")("Ammar");

//rewrite with arrow function (challenge)
const greets = (greetings) => (name) => console.log(`${greetings} ${name}`);

greets("Hola")("Ammar");

//the call and apply methods

const lufthansa = {
  airline: "lufthansa",
  iataCode: "LH",
  bookings: [],
  //old
  // book:function(){}
  //new
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(234, "Ammar Fayez");
lufthansa.book(543, "Jonas Schmedtmann");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

//call method
book.call(eurowings, 345, "Sara Williams");

console.log(eurowings);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 2345, "Mary Cooper");
console.log(swiss);

//apply method is not used so much in new javaScript we could use spread ...flightData

const flightData = [235, "George Cooper"];
book.apply(swiss, flightData);

console.log(swiss);

book.call(swiss, ...flightData);

//The Bind Method => don't call the function it return new function where this keyword is bound

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(2345, "jonas");

//Partial Application => means that a part of argument of the original function is already applied -> already set -> 234
const bookEW234 = book.bind(eurowings, 234);
bookEW234("Michel Anderson");

//With Event Listener

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//Partial Application

const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1,100));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2=addTaxRate(0.23)

console.log(addVAT2(100));

