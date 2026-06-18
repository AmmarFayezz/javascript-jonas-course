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

