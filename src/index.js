import * as domEl from './js/helper/domElements';
import { precioARS } from './js/helper/helperFunctions';
import { db, updateUI } from './js/firebase/dbConfig';

/////////////////////////////////////////////////////////////////////
//* MOVEMENTS

const displayMovements = (movements) => {
  console.log(movements);

  domEl.movementsList.innerHTML = '';

  movements.forEach((movement) => {
    let mov;
    movement.money > 0 ? (mov = 'possitive') : (mov = 'negative');

    const movementsHtml = `
      <li class="list-group-item list-group-item-action list-item-money py-3 mb-1 rounded-1 d-flex flex-fill display-8">
        <a href="#" class="mx-2 text-center" >${movement.date}</a>
        <a href="#" class="mx-2 text-center ${mov}" >${movement.money}</a>
        <a href="#" class="mx-2 text-center" >${movement.currency}</a>
        <a href="#" class="mx-2 text-center" >${movement.category}</a>
        <a href="#" class="mx-2 text-center" >${movement.place}</a>
        <a href="#" class="mx-2 text-center" >${movement.comment}</a>
      </li>
    `;

    domEl.movementsList.insertAdjacentHTML('afterbegin', movementsHtml);
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
    balanceTotal(movements);
    displayMovements(movements);
  }
};

const balanceTotal = (movements) => {
  let sum = 0;
  movements.map((movements) => {
    return (sum += movements.money);
  });
  console.log(precioARS(sum));

  domEl.labelBalance.forEach((movement) => {
    movement.textContent = `${precioARS(sum)}`;
  });
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

/////////////////////////////////////////////////////////////////////
//* TASKS
