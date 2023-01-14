import { async } from '@firebase/util';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  setDoc,
  update,
  updateDoc,
  where,
} from 'firebase/firestore';
import * as domEl from '../src/js/helper/domElements';
import { precioARS, createDate } from '../src/js/helper/helperFunctions';
import { fetchMovements, setNewMovement } from './js/helper/fetchData';
import { db } from './js/helper/dbConfig';
//import { setNewMovement } from './js/helper/formFunctions';

const activeAccount = '4UpnfRSWYGsvmmZP21Un';
const accountNumber = 2654981998442;
//const activeAccount = 'PipgqG76If0CiGua1zMF';
//const accountNumber = 1654981998442;

//const accFromFirebase = await fetchAccount(activeAccount);
const accFromFirebase = await fetchMovements(activeAccount);

const movements = accFromFirebase;

if (movements.length < 1) {
  domEl.containerMovements.innerHTML = '';

  const html = `
      <tr class="movement__row">
        <td class="p-0 m-0 position-relative">
          <button class="movements__type movements__type"></button>
        </td>
        <td colspan="6" >"No expense records yet... start your first one! 😁</td>
      </tr>
    `;
  domEl.containerMovements.insertAdjacentHTML('afterbegin', html);
} else {
  //Display movements from active account
  const displayMovements = (movements) => {
    console.log(movements);

    domEl.containerMovements.innerHTML = '';

    movements.forEach((movement) => {
      let mov;
      movement.money > 0 ? (mov = 'deposit') : (mov = 'withdrawal');

      const html = `
      <tr class="movement__row">
        <td class="p-0 m-0 position-relative">
          <button class="movements__type movements__type--${mov}"></button>
        </td>
        <td>${movement.date}</td>
        <td>${movement.category}</td>
        <td>${movement.place}</td>
        <td class="movements__td--comment">${movement.comment}</td>
        <td class=" text-end pe-4">${precioARS(movement.money)}</td>
        <td class=" text-end">${movement.currency}</td>
      </tr>
    `;
      domEl.containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };
  displayMovements(movements);
}
//Balance Total => sums all movements
const balanceTotal = (movements) => {
  let sum = 0;
  console.log(movements);

  movements.map((movements) => {
    return (sum += movements.money);
  });

  domEl.labelBalance.innerHTML = `${precioARS(sum)}`;
};
balanceTotal(movements);

const arsToUsdBlue = 355;
const arsToUsdOfficial = 187.25;
const arsToEuroOfficial = 198.13;

const movementsToUsd = (movements, exchangeRate) => {
  const movementToUsdBlue = movements.map((mov) =>
    precioARS(mov.money / exchangeRate)
  );
  return movementToUsdBlue;
};

domEl.btnExpense.addEventListener('click', function (e) {
  e.preventDefault();
  let categoryEl = domEl.inputExpenseCategory.value;
  let commentEl = domEl.inputExpenseComment.value;
  let currencyEl = domEl.inputExpenseCurrency.value;
  let dateEl = createDate(domEl.inputExpenseDate.value);
  let moneyEl = Number(domEl.inputExpenseMoney.value);
  let paymentsEl = domEl.inputExpensePayments.value;
  let placeEl = domEl.inputExpensePlace.value;

  const newMovement = {
    category: categoryEl,
    comment: commentEl,
    currency: currencyEl,
    date: dateEl,
    money: moneyEl,
    payments: paymentsEl,
    place: placeEl,
  };

  setNewMovement(newMovement, db, activeAccount);

  domEl.inputExpenseCategory.value = '';
  domEl.inputExpenseComment.value = '';
  domEl.inputExpenseCurrency.value = '';
  domEl.inputExpenseDate.value = '';
  domEl.inputExpenseMoney.value = '';
  domEl.inputExpensePayments.value = '';
  domEl.inputExpensePlace.value = '';

  updateUI(movements);
});

//To delete
//domEl.btnIncome.addEventListener('click', function (e) {
//  e.preventDefault();
//  const money = domEl.inputExpenseMoney.value;
//  const category = domEl.inputExpenseCategory.value;
//  const date = domEl.inputExpenseDate.value;
//  const place = domEl.inputExpensePlace.value;
//  const comment = domEl.inputExpenseComment.value;
//
//  const newMovement = {
//    date: date,
//    money: money,
//    category: category,
//    place: place,
//    comment: comment,
//    currency: currency,
//  };
//
//  setNewMovement(newMovement);
//});

export const updateUI = async (movements) => {
  await fetchMovements(activeAccount);
  displayMovements(movements);
  balanceTotal(movements);
};

//const createUser = async () => {
//  const user = {
//    account: 'account',
//    accountNumber: 'accountNumber',
//    active: 'active',
//    email: 'email',
//    pin: 'pin',
//    uid: 'uid',
//    userName: 'userName',
//    userlmg: 'userlmg',
//  };
//
//  try {
//    const userRef = await addDoc(collection(db, 'users'), user);
//    console.log('Document written with ID: ', userRef.id);
//  } catch (e) {
//    console.error('Error adding document: ', e);
//  }
//
//  console.log(user);
//};
