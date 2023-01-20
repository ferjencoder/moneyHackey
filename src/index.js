import * as domEl from './js/helper/domElements';
import { createDate, precioARS } from './js/helper/helperFunctions';
import { fetchMovements, setNewMovement } from './js/firebase/fetchData';
import { db, updateUI } from './js/firebase/dbConfig';

//const activeAccount = '4UpnfRSWYGsvmmZP21Un';
//const accountNumber = 2654981998442;
//const activeAccount = 'PipgqG76If0CiGua1zMF';
//const accountNumber = 1654981998442;

//Info ///////////////////////////////////////////
//Info working code
//const accFromFirebase = await fetchMovements(activeAccount);
//const movements = accFromFirebase;
//Info ///////////////////////////////////////////

//const getData = async () => {
//  const accFromFirebase = await fetchMovements(activeAccount);
//  const movements = accFromFirebase;
//};

//console.log(movements.length);

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

const displayNoMovements = () => {
  domEl.ulMovementDate.innerHTML = '';
  domEl.ulMovementCategory.innerHTML = '';
  domEl.ulMovementPlace.innerHTML = '';
  domEl.ulMovementComment.innerHTML = '';
  domEl.ulMovementMoney.innerHTML = '';
  domEl.ulMovementcurrency.innerHTML = '';

  const dateHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">No data...</a>
      </li>
    `;
  const categoryHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">No data...</a>
      </li>
    `;
  const placeHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">No data...</a>
      </li>
    `;
  const commentHtml = `
      <li class="collection-item list-item py-3 li-bd">
        <a href="#">Macke your first tacker! 😎</a>
      </li>
    `;
  const moneyHtml = `
      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
        <a href="#">No data...</a>
      </li>
    `;
  const currencyHtml = `
      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
        <a href="#">No data...</a>
      </li>
    `;
  domEl.ulMovementDate.innerHTML = dateHtml;
  domEl.ulMovementCategory.innerHTML = categoryHtml;
  domEl.ulMovementPlace.innerHTML = placeHtml;
  domEl.ulMovementComment.innerHTML = commentHtml;
  domEl.ulMovementMoney.innerHTML = moneyHtml;
  domEl.ulMovementcurrency.innerHTML = currencyHtml;
};

export const displayMoneyTrack = (movements = []) => {
  if (movements.length < 1) {
    displayNoMovements();
  } else {
    displayMovements(movements);
    balanceTotal(movements);
  }
  //if (movements.length < 1) {
  //  domEl.ulMovementDate.innerHTML = '';
  //  domEl.ulMovementCategory.innerHTML = '';
  //  domEl.ulMovementPlace.innerHTML = '';
  //  domEl.ulMovementComment.innerHTML = '';
  //  domEl.ulMovementMoney.innerHTML = '';
  //  domEl.ulMovementcurrency.innerHTML = '';
  //
  //  const dateHtml = `
  //      <li class="collection-item list-item py-3 li-bd">
  //        <a href="#">No data...</a>
  //      </li>
  //    `;
  //  const categoryHtml = `
  //      <li class="collection-item list-item py-3 li-bd">
  //        <a href="#">No data...</a>
  //      </li>
  //    `;
  //  const placeHtml = `
  //      <li class="collection-item list-item py-3 li-bd">
  //        <a href="#">No data...</a>
  //      </li>
  //    `;
  //  const commentHtml = `
  //      <li class="collection-item list-item py-3 li-bd">
  //        <a href="#">Macke your first tacker! 😎</a>
  //      </li>
  //    `;
  //  const moneyHtml = `
  //      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
  //        <a href="#">No data...</a>
  //      </li>
  //    `;
  //  const currencyHtml = `
  //      <li class="collection-item list-item py-3 li-bd pe-0 pe-md-3">
  //        <a href="#">No data...</a>
  //      </li>
  //    `;
  //  domEl.ulMovementDate.innerHTML = dateHtml;
  //  domEl.ulMovementCategory.innerHTML = categoryHtml;
  //  domEl.ulMovementPlace.innerHTML = placeHtml;
  //  domEl.ulMovementComment.innerHTML = commentHtml;
  //  domEl.ulMovementMoney.innerHTML = moneyHtml;
  //  domEl.ulMovementcurrency.innerHTML = currencyHtml;
  //} else {
  //  //Display movements from active account
  //  displayMovements(movements);
  //}

  //Balance Total => sums all movements
};

const balanceTotal = (movements) => {
  let sum = 0;
  movements.map((movements) => {
    return (sum += movements.money);
  });
  console.log(precioARS(sum));

  domEl.labelBalance.textContent = `${precioARS(sum)}`;
};

const arsToUsdBlue = 355;
const arsToUsdOfficial = 187.25;
const arsToEuroOfficial = 198.13;

const movementsToUsd = (movements, exchangeRate) => {
  const movementToUsdBlue = movements.map((mov) =>
    precioARS(mov.money / exchangeRate)
  );
  return movementToUsdBlue;
};

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
