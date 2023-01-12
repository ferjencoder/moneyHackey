import * as domEl from './src/js/helper/domElements.js';
import precioARS from './src/js/helper/helperFunctions.js';
import fetchData from './src/js/helper/fetchData.js';

//Bring data from json
const [activeAccount] = await fetchData();

//Destructure movements from account
const { movements } = activeAccount;

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

console.log(movements);
console.log(movementsToUsd(movements, arsToEuroOfficial));
