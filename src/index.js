import { addDoc, doc, setDoc } from 'firebase/firestore';
import * as domEl from '../src/js/helper/domElements';
import precioARS from '../src/js/helper/helperFunctions';
//import fetchData from './src/js/helper/fetchData.js';
import { fetchAccount, db } from './js/helper/fetchData';

window.addEventListener('DOMContentLoaded', () => {});

//Bring data from json
const activeAccount = 'PipgqG76If0CiGua1zMF';
const acccountNumber = 1654981998442;
//
const accFromFirebase = await fetchAccount(activeAccount);
//
console.log(accFromFirebase);

//Destructure movements from account
const { movements } = accFromFirebase;

console.log(movements);

//Display movements from active account
const displayMovements = (movements) => {
  console.log(movements);

  domEl.containerMovements.innerHTML = '';

  movements.forEach((movement) => {
    const html = `
      <tr class="movement__row">
        <td class="p-0 m-0 position-relative">
          <button class="movements__type movements__type--${
            movement.type
          }"></button>
        </td>
        <td>${movement.date}</td>
        <td>${movement.category}</td>
        <td>${movement.store}</td>
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
  movements.map((movements) => {
    return (sum += movements.money);
  });

  domEl.labelBalance.innerHTML = `${precioARS(sum)}`;
};
balanceTotal(movements);

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['ARS', 'Peso Argentino'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['USD', 'United States dollar'],
]);

/////////////////////////////////////////////////

const arsToUsdBlue = 355;
const arsToUsdOfficial = 187.25;
const arsToEuroOfficial = 198.13;

const movementsToUsd = (movements, exchangeRate) => {
  const movementToUsdBlue = movements.map((mov) =>
    precioARS(mov.money / exchangeRate)
  );
  return movementToUsdBlue;
};

console.log({ movements });
console.log(movementsToUsd(movements, arsToEuroOfficial));
/////////////////////////////////////////////////

domEl.btnExpense.addEventListener('click', function (e) {
  e.preventDefault();
  const category = domEl.inputExpenseCategory.value;
  const comment = domEl.inputExpenseComment.value;
  const currency = domEl.inputExpenseCurrency.value;
  const date = domEl.inputExpenseDate.value;
  const money = domEl.inputExpenseMoney.value;
  const payments = domEl.inputExpensePayments.value;
  const place = domEl.inputExpensePlace.value;

  console.log(db);
  console.log(movements);

  console.log(date, money, category, place, payments, comment, currency);

  const newMovement = {
    category: category,
    comment: comment,
    currency: 'ARS',
    date: date,
    money: money,
    payments: 3,
    place: place,
  };
  console.log(newMovement);
  //document.write('' + JSON.stringify(newMovement));
  addDoc(doc(db, 'accounts', movements), newMovement)
    .then(({ id }) => console.log(id))
    .catch((err) => console.log(err));
  //await setDoc(doc())
});

domEl.btnIncome.addEventListener('click', function (e) {
  e.preventDefault();
  const money = domEl.inputExpenseMoney.value;
  const category = domEl.inputExpenseCategory.value;
  const date = domEl.inputExpenseDate.value;
  const place = domEl.inputExpensePlace.value;
  const comment = domEl.inputExpenseComment.value;

  console.log(money, category, date, place, comment, currency);

  const newMovement = {
    date: date,
    money: money,
    category: category,
    place: place,
    comment: comment,
    currency: currency,
  };
  console.log(newMovement);

  setDoc(doc(db, 'accounts', movements), newMovement);

  //document.write('' + JSON.stringify(newMovement));
});
