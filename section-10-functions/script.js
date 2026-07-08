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

const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));

/* Coding Challenge #1 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
   method does 2 things:
 1.1. Display a prompt window for the user to input the number of the
      selected option. The prompt should look like this:
      What is your favourite programming language?
        
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
      
 1.2. Based on the input number, update the 'answers' array property. For
      example, if the option is 3, increase the value at position 3 of the array by
      1. Make sure to check if the input is a number and if the number makes
      sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button. 
3. Create a method 'displayResults' which displays the poll results. The
   method takes a string as an input (called 'type'), which can be either 'string'
   or 'array'. If type is 'array', simply display the results array as it is, using
   console.log(). This should be the default option. If type is 'string', display a
   string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
   'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
   data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
   object! So what should the this keyword look like in this situation?

   The Complete JavaScript Course 20
   Test data for bonus:
   § Data 1: [5, 2, 3]
   § Data 2: [1, 5, 3, 9, 6, 1]

   
   Hints: Use many of the tools you learned about in this and the last section 😉

   GOOD LUCK 😀 */

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    //get input
    const input = prompt(`${this.question}
${this.options.join("\n")}
(Write option number)`);

    //if user press cancel
    if (input === null) {
      return;
    }

    //0 -> 3
    const inputNum = Number(input);

    if (
      !Number.isNaN(inputNum) &&
      0 <= inputNum &&
      inputNum < this.answers.length
    ) {
      console.log(inputNum);
      this.answers[inputNum]++;
    }

    this.displayResults();
    this.displayResults("string");
  },

  displayResults(typeInput = "array") {
    if (typeInput === "array") {
      console.log(this.answers);
    } else if (typeInput === "string") {
      console.log(`Poll results are ${this.answers.join(",")}`);
    }
  },
};
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call(
  {
    answers: [5, 2, 3],
  },
  "string",
);

poll.displayResults.call(
  {
    answers: [1, 5, 3, 9, 6, 1],
  },
  "string",
);

//Immediately Invoked Function Expressions (IIFE)
//we need function that is only executed once and then never again

(function () {
  console.log("this function will never run again");
})();

(() => console.log("this also will never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 44;
}
// console.log(isPrivate); we don't have access to it (const - let )
console.log(notPrivate);

//Closures
//Closure make the function remember all the variables that existed at the function's birthplace essentially

//A function that remembers the variables from the scope where it was created, even after that outer function has finished executing.

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} Passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

//take look at the internal property (Backpack🎒)
console.dir(booker);

console.dir(booker);
console.dir(booker);

//More Closure Examples
//Example 1

let f;
const g = function () {
  const a = 22;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 33;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

//Re-assigning f function

h();
f();
console.dir(f);

//Example 2

const boardPassengers = function (n, waitTime) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are now boarding all ${n} Passengers`);
    console.log(`there are 3 groups, each with ${perGroup} Passengers `);
  }, 1000);

  console.log(`will start boarding in ${waitTime} seconds`);
};

//if we don't have perGroup in the function it will use this one
const perGroup = 1000;

boardPassengers(180, 3);

/* Coding Challenge #2

This is more of a thinking challenge than a coding challenge 🤓

Your tasks:

1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!

2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

GOOD LUCK 😀
 */

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();


//--> A closure allows a function to remember the variables from the scope where it was created, even after that scope has finished executing.


/* ->Explaining

We have an IIFE that executes immediately. Inside it, we select the <h1> element and store it in a variable called header, then we change its color to red.

Still inside the IIFE, we attach a click event listener to the body. The callback function is created immediately, but it doesn’t execute until the user clicks the body.

After the IIFE finishes, you might think the header variable is destroyed because it’s a local variable. However, JavaScript sees that the callback function still references header, so it keeps that variable alive in memory. This is called a closure.

Later, when the body is clicked, the browser executes the callback function, and it can still access the header variable through the closure, so we can change the heading’s color without selecting it again.

“Why doesn’t header disappear?”

Because the event listener’s callback still has a reference to it. JavaScript doesn’t destroy variables that are still needed by another function.

*/

