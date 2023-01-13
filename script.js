//import * as domEl from './src/js/helper/domElements';
//import precioARS from './src/js/helper/formFunctions';
////import fetchData from './src/js/helper/fetchData.js';
//import { fetchData } from './src/index.js';
//
////Bring data from json
//const activeAccount = 'PipgqG76If0CiGua1zMF';
//const acccountNumber = 1654981998442;
//
//const accFromFirebase = fetchData(acccountNumber);
//
//console.log(accFromFirebase);
//
////Destructure movements from account
//const { movements } = activeAccount;
//
////Display movements from active account
//const displayMovements = (movements) => {
//  console.log(movements);
//
//  domEl.containerMovements.innerHTML = '';
//
//  movements.forEach((movement) => {
//    const html = `
//      <tr class="movement__row">
//        <td class="p-0 m-0 position-relative">
//          <button class="movements__type movements__type--${
//            movement.type
//          }"></button>
//        </td>
//        <td>${movement.date}</td>
//        <td>${movement.category}</td>
//        <td>${movement.store}</td>
//        <td class="movements__td--comment">${movement.comment}</td>
//        <td class=" text-end pe-4">${precioARS(movement.money)}</td>
//      </tr>
//    `;
//    domEl.containerMovements.insertAdjacentHTML('afterbegin', html);
//  });
//};
//displayMovements(movements);
//
////Balance Total => sums all movements
//const balanceTotal = (movements) => {
//  let sum = 0;
//  movements.map((movements) => {
//    return (sum += movements.money);
//  });
//
//  domEl.labelBalance.innerHTML = `${precioARS(sum)}`;
//};
//balanceTotal(movements);
//
///////////////////////////////////////////////////
//// LECTURES
//
//const currencies = new Map([
//  ['ARS', 'Peso Argentino'],
//  ['EUR', 'Euro'],
//  ['GBP', 'Pound sterling'],
//  ['USD', 'United States dollar'],
//]);
//
///////////////////////////////////////////////////
//
//const arsToUsdBlue = 355;
//const arsToUsdOfficial = 187.25;
//const arsToEuroOfficial = 198.13;
//
//const movementsToUsd = (movements, exchangeRate) => {
//  const movementToUsdBlue = movements.map((mov) =>
//    precioARS(mov.money / exchangeRate)
//  );
//  return movementToUsdBlue;
//};
//
//console.log(movements);
//console.log(movementsToUsd(movements, arsToEuroOfficial));
///////////////////////////////////////////////////
//
//domEl.btnExpense.addEventListener('click', function (e) {
//  e.preventDefault();
//  const money = domEl.inputExpenseMoney.value;
//  const category = domEl.inputExpenseCategory.value;
//  const date = domEl.inputExpenseDate.value;
//  const place = domEl.inputExpensePlace.value;
//  const comment = domEl.inputExpenseComment.value;
//
//  console.log(money, category, date, place, comment);
//
//  const newMovement = {
//    transaction: 1,
//    date: { date },
//    money: { money },
//    store: { place },
//    payments: 3,
//    comment: { comment },
//    type: 'withdrawal',
//    category: { category },
//    currency: 'ARS',
//  };
//  console.log(newMovement);
//  document.write('' + JSON.stringify(newMovement));
//});
