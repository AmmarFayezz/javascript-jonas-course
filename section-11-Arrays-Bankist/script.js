"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//DisplayMovements
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

//Balances
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    //New Rule From Bank
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);

  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//Create userNames
const createUserNames = function (accounts) {
  // we use for each to make side effect to manipulated the original array
  accounts.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);

//Updating UI
const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //Prevent Form from submitting (Refreshing the Page)
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("Login");

    //Display UI and Welcome Message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  } else {
    // labelWelcome.style.color = "red";
    labelWelcome.textContent = "Incorrect username or PIN";
    labelWelcome.classList.add("error");
  }
});

//Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value,
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //Doing the Transfers add to receiver deduct from current
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

//Request Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //add Movement(loan)
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

//Close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName,
    );
    console.log(index);

    //Delete User
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ["a", "b", "c", "d", "e"];

//SLICE. -> make new array
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //the end parameter is not included
console.log(arr.slice(-2));
console.log(arr.slice(-1)); //-1 is always the last element in the array
console.log(arr.slice(1, -2)); //starts from 1 and extract everything except the last two
//shallow copy
console.log(arr.slice()); //we need this when we need to chain multiple methods together
console.log([...arr]);

//SPLICE. -> change the original array
// console.log(arr.splice(2)); //delete the extracted elements
arr.splice(-1); //delete the last element
arr.splice(1, 2); //second parameter is the number of elements we want to delete
console.log(arr);

//REVERSE. -> it change (mutate) the original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];

console.log(arr2.reverse());
console.log(arr2);

//CONCAT. -> it concatenate 2 arrays
const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr,...arr2]);


//JOIN. ->
console.log(letters.join(' - '));
 */

/* //New Method at
const arr = [23, 11, 64];

console.log(arr[0]);
console.log(arr.at(0));

//getting the last element in the array

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

//use at in strings

console.log("ammar".at(0));
console.log("ammar".at(-1)); */

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("----------------forEach----------------");

// //we can't break from forEach loop -> will always loop over the entire array

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// //0: function(200)
// //1: function(450)
// //2: function(-400)

// //forEach with maps

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value} `);
// });

// //forEach with sets

// const currenciesUnique = new Set(["USD", "EUR", "USD", "GBP", "EUR"]);
// //set don't have index or key

// //we use underScore _ -> which in JavaScript means a throwaway variable -> variable is completely unnecessary
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value} : ${value}`);
// });

/* Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
*A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 🐶 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶 ")

4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

Hints: Use tools from all lectures in this section so far 😉

GOOD LUCK 😀 */

/* Coding Challenge #2

Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the 
dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀 */

/* const calcAverageHumanAge = function (ages) {
  // const humanAges = ages.map((age) => {
  //   if (age <= 2) {
  //     return age * 2;
  //   } else {
  //     return 16 + age * 4;
  //   }
  // });
  const humanAges = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));

  const adultDogs = humanAges.filter((age) => {
    return age >= 18;
  });

  console.log(humanAges);
  console.log(adultDogs);

  const average =
    adultDogs.reduce(function (acc, cur) {
      return acc + cur;
    }, 0) / adultDogs.length;

  return average;
};

const avg1=calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2=calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1,avg2); */

/////////////////////////////////////////
//Coding Challenge #3

/* Rewrite the 'calcAverageHumanAge' function from the 
previous challenge, but this time as an arrow 
function, and using chaining! 

Test Data 1:[5, 2, 4, 1, 15, 8, 3]
Test Data 2:[16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

// const euroToUsd = 1.1;

//PIPELINE
// const totalDeposit = movements
//   .filter((mov) => mov > 0)

//   //Check Errors

//   // .map((mov, i, arr) => {
//   //   console.log(arr);
//   //   return mov * euroToUsd;
//   // })

//   .map((mov) => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDeposit);

// const checkDogs = function (dogsJulia, dogsKate) {
//   // const dogsJuliaCorrected = dogsJulia.slice(1, -2);
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   // console.log(dogsJuliaCorrected);

//   const allDogs = dogsJuliaCorrected.concat(dogsKate);
//   // const allDogs=[...dogsJuliaCorrected,...dogsKate]
//   console.log(allDogs);

//   allDogs.forEach(function (dogAge, i) {
//     if (dogAge >= 3) {
//       console.log(
//         `Dog number ${i + 1} 🐶 is an adult, and is ${dogAge} years old`,
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// console.log("=================================================");

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//Map Method
// const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
//   // return 23
// });

//arrow function
// const movementsUSD = movements.map((mov) => mov * euroToUsd);

// console.log(movements);
// console.log(movementsUSD);

// //For -- Of
// const movementsUSDFor = [];

// for (const mov of movements) {
//   movementsUSDFor.push(mov * euroToUsd);
// }
// console.log(movementsUSDFor);

//old example

//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }

//ternary and map
// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? "Deposited" : "Withdrew"} ${Math.abs(mov)}`,
// );

// console.log(movementsDescriptions);

//filter Method

/* const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositFor = [];

for (const mov of movements) {
  if (mov > 0) depositFor.push(mov);
}
console.log(depositFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals); */

//Reduce Method

// console.log(movements);

//accumulator -> SNOWBALL

// const balance = movements.reduce(function (acc, cur,i,arr) {
//   return acc + cur;
// },0);

/* const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

let balance2 = 0;

for (const mov of movements) balance2 += mov;

console.log(balance2); */

//Maximum Value
/* const max = movements.reduce((acc, curMov) => {
  if (acc > curMov) return acc;
  else return curMov;
});
console.log(max); */

//Minimum Value
/* const min = movements.reduce((acc, curMov) => {
  if (acc < curMov) return acc;
  else return curMov;
});
console.log(min); */

//Find Method => return only the first element matches the condition

// const firstWithdrawal = movements.find((mov) => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === "Jonas Schmedtmann");
// console.log(account);

// //for - of
// let accountt;
// for (const acc of accounts) {
//   if (acc.owner === "Jonas Schmedtmann") accountt = acc;
// }

//The New findLast and findLastIndex Methods

console.log(movements);

const lastWithdrawal = movements.findLast((mov) => mov < 0);
console.log(lastWithdrawal);

const latestLargeMovementIndex = movements.findLastIndex(
  (mov) => Math.abs(mov) > 1000,
);
console.log(latestLargeMovementIndex);
console.log(
  `Your Latest large movement was ${movements.length - latestLargeMovementIndex} movements ago`,
);

console.log(movements);

//EQUALITY
console.log(movements.includes(-130));

//SOME : CONDITION
console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

//EVERY => return true if all the elements in the array satisfy the condition that we pass in
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

//Separate Callback

const deposit = (mov) => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//flat method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //default 1

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

//==========================================================

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);
// const totalMovements = accountMovements.flat();
// console.log(totalMovements);
// const overallBalance = totalMovements.reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

// const overallBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

// const overallBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov);
// console.log(overallBalance2);

/* Coding Challenge #4
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

//1.
const huskyWeight = breeds.find(
  (breed) => breed.breed === "Husky",
).averageWeight;
console.log(huskyWeight);

//2.
const dogBothActivities = breeds.find(
  (breed) =>
    breed.activities.includes("running") && breed.activities.includes("fetch"),
).breed;

console.log(dogBothActivities);

//3.
const allActivities = breeds.flatMap((breed) => breed.activities);
console.log(allActivities);

//4.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

//5.
const swimmingBreeds = breeds.filter((breed) =>
  breed.activities.includes("swimming"),
);
const otherActivities = [
  ...new Set(swimmingBreeds.flatMap((breed) => breed.activities)),
];
const swimmingAdjacent = otherActivities.filter(
  (activity) => activity !== "swimming",
);
console.log(swimmingAdjacent);

//6.
console.log(breeds.every((breed) => breed.averageWeight >= 10));

//7.

console.log(breeds.some((breed) => breed.activities.length >= 3));

//Bonus
const theHeaviestBreed = Math.max(
  ...breeds
    .filter((breed) => breed.activities.includes("fetch"))
    .map((breed) => breed.averageWeight),
);

console.log(theHeaviestBreed);
