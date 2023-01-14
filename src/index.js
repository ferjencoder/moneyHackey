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
import { precioARS } from '../src/js/helper/helperFunctions';
//import fetchData from './src/js/helper/fetchData.js';
import { fetchAccount, db } from './js/helper/fetchData';
import { setNewMovement } from './js/helper/formFunctions';

const activeAccount = 'PipgqG76If0CiGua1zMF';
const acccountNumber = 1654981998442;

const accFromFirebase = await fetchAccount(activeAccount);

//Destructure movements from account
const { movements } = accFromFirebase;

//Display movements from active account
const displayMovements = (movements) => {
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
      </tr>
    `;
    domEl.containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(movements);

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
  console.log(e);

  e.preventDefault();
  let categoryEl = domEl.inputExpenseCategory.value;
  let commentEl = domEl.inputExpenseComment.value;
  let currencyEl = domEl.inputExpenseCurrency.value;
  let dateEl = domEl.inputExpenseDate.value;
  let moneyEl = Number(domEl.inputExpenseMoney.value);
  let paymentsEl = domEl.inputExpensePayments.value;
  let placeEl = domEl.inputExpensePlace.value;

  console.log(moneyEl);

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

domEl.btnIncome.addEventListener('click', function (e) {
  e.preventDefault();
  const money = domEl.inputExpenseMoney.value;
  const category = domEl.inputExpenseCategory.value;
  const date = domEl.inputExpenseDate.value;
  const place = domEl.inputExpensePlace.value;
  const comment = domEl.inputExpenseComment.value;

  const newMovement = {
    date: date,
    money: money,
    category: category,
    place: place,
    comment: comment,
    currency: currency,
  };

  setNewMovement(newMovement);
});

export const updateUI = (movements) => {
  displayMovements(movements);
  balanceTotal(movements);
};
