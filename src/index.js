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
import {
  fetchMovements,
  setNewMovement,
  updateUI,
} from './js/helper/fetchData';
import { db } from './js/helper/dbConfig';
//import { setNewMovement } from './js/helper/formFunctions';

const activeAccount = '4UpnfRSWYGsvmmZP21Un';
const accountNumber = 2654981998442;
//const activeAccount = 'PipgqG76If0CiGua1zMF';
//const accountNumber = 1654981998442;

//Info ///////////////////////////////////////////
//Info working code
const accFromFirebase = await fetchMovements(activeAccount);
const movements = accFromFirebase;
//Info ///////////////////////////////////////////

//const getData = async () => {
//  const accFromFirebase = await fetchMovements(activeAccount);
//  const movements = accFromFirebase;
//};

const displayMovements = (movements) => {
  console.log(movements);

  domEl.ulMovementDate.innerHTML = '';
  domEl.ulMovementCategory.innerHTML = '';
  domEl.ulMovementPlace.innerHTML = '';
  domEl.ulMovementComment.innerHTML = '';
  domEl.ulMovementMoney.innerHTML = '';
  domEl.ulMovementcurrency.innerHTML = '';

  movements.forEach((movement) => {
    let mov;
    movement.money > 0 ? (mov = 'possitive') : (mov = 'negative');

    const dateHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">${movement.date}</a>
      </li>
    `;
    const categoryHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">${movement.category}</a>
      </li>
    `;
    const placeHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">${movement.place}</a>
      </li>
    `;
    const commentHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">${movement.comment}</a>
      </li>
    `;
    const moneyHtml = `
      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
        <a class="${mov}" href="#">${precioARS(movement.money)}</a>
      </li>
    `;
    const currencyHtml = `
      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
        <a href="#">${movement.currency}</a>
      </li>     
    `;

    domEl.ulMovementDate.insertAdjacentHTML('afterbegin', dateHtml);
    domEl.ulMovementCategory.insertAdjacentHTML('afterbegin', categoryHtml);
    domEl.ulMovementPlace.insertAdjacentHTML('afterbegin', placeHtml);
    domEl.ulMovementComment.insertAdjacentHTML('afterbegin', commentHtml);
    domEl.ulMovementMoney.insertAdjacentHTML('afterbegin', moneyHtml);
    domEl.ulMovementcurrency.insertAdjacentHTML('afterbegin', currencyHtml);
  });
};

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
  displayMovements(movements);
}

//Balance Total => sums all movements
const balanceTotal = (movements) => {
  let sum = 0;

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
  let moneyEl = -Number(domEl.inputExpenseMoney.value);
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

  //! Cuidado que le vuelve a enviar los mismos movements
  //updateUI();
});

//export const updateUI = async (activeAccount) => {
//  await fetchMovements(activeAccount)
//    .then(displayMovements(movements))
//    .then(balanceTotal(movements));
//};

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

const createUser = async () => {
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
};

const usersRef = db;
