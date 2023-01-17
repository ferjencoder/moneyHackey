import { addDoc, collection, doc, update, updateDoc } from 'firebase/firestore';
import * as domEl from './js/helper/domElements';
import { createDate, precioARS } from './js/helper/helperFunctions';
import { fetchMovements, setNewMovement } from './js/firebase/fetchData';
import { app, db } from './js/firebase/dbConfig';
import {
  AuthErrorCodes,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

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
  domEl.movementsApp.innerHTML = '';

  const html = `
      <tr class="movement__row">
        <td class="p-0 m-0 position-relative">
          <button class="movements__type movements__type"></button>
        </td>
        <td colspan="6" >"No expense records yet... start your first one! 😁</td>
      </tr>
    `;
  domEl.movementsApp.insertAdjacentHTML('afterbegin', html);
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

const auth = getAuth(app);
//connectAuthEmulator(auth, 'http://localhost:5500');

//export const showLoginApp = () => {
//  domEl.loginApp.style.display = 'block';
//  domEl.containerApp.style.display = 'none';
//};
//
//export const showApp = () => {
//  domEl.loginApp.style.display = 'none';
//  domEl.containerApp.style.display = 'block';
//};
//
//export const hideLoginError = () => {
//  domEl.passwordInpValidation.style.display = 'none';
//  domEl.passwordInpValidation.innerHTML = '';
//};
//
//export const showLoginError = (error) => {
//  domEl.passwordInpValidation.style.display = 'block';
//  domEl.valuePassword.className = 'form-control bg-dark-2 is-invalid';
//
//  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
//    domEl.passwordInpValidation.innerHTML = 'Wrong password. Try again.';
//  } else {
//    console.log(`Error: ${error.message}`);
//    domEl.passwordInpValidation.innerHTML = `Wrong password. Try again.`;
//  }
//};
//
//export const showLoginState = (user) => {
//  console.log(`${user.displayName} (udi: ${user.uid}, email: ${user.email})`);
//};
//
//hideLoginError();
//
//const loginEmailPassword = async () => {
//  console.log(`you've been clicked!!`);
//
//  console.log(domEl.valueEmail.value);
//  console.log(domEl.valuePassword.value);
//  const loginEmail = domEl.valueEmail.value;
//  const loginPassword = domEl.valuePassword.value;
//
//  try {
//    const userCredential = await signInWithEmailAndPassword(
//      auth,
//      loginEmail,
//      loginEmailPassword
//    );
//    console.log(userCredential.user);
//  } catch (error) {
//    console.log(error);
//    showLoginError(error);
//  }
//};
//domEl.btnLogin.addEventListener('click', loginEmailPassword);
//
//const createUser = async () => {
//  console.log(`you've been clicked!!`);
//
//  console.log(domEl.valueEmail.value);
//  console.log(domEl.valuePassword.value);
//  const loginEmail = domEl.valueEmail.value;
//  const loginPassword = domEl.valuePassword.value;
//
//  try {
//    const userCredential = await createUserWithEmailAndPassword(
//      auth,
//      loginEmail,
//      loginEmailPassword
//    );
//    console.log(userCredential.user);
//  } catch (error) {
//    console.log(error);
//    showLoginError(error);
//  }
//};
//
//domEl.btnSignup.addEventListener('click', createUser);
//
//const monitorAuthState = async () => {
//  onAuthStateChanged(auth, (user) => {
//    if (user) {
//      console.log(user);
//
//      showApp();
//      showLoginState(user);
//
//      hideLoginError();
//    } else {
//      showLoginApp();
//    }
//  });
//};
//
//// Log out
//const logout = async () => {
//  await signOut(auth);
//};
//
//monitorAuthState();

const googleAuthProvider = new GoogleAuthProvider();

signInWithEmailAndPassword(
  auth,
  domEl.valueEmail.value,
  domEl.valuePassword.value
)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

domEl.btnLogin.addEventListener('click', signInWithEmailAndPassword);

domEl.btnSignup.addEventListener('click', () => {
  console.log('clicked');
  signInWithPopup(auth, googleAuthProvider).then((auth) => console.log(auth));
  onAuthStateChanged();
});

domEl.btnLogout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('Logged out');
    onAuthStateChanged();
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    domEl.loginApp.classList.remove('show');
    domEl.loginApp.classList.add('d-none');
    domEl.containerApp.classList.remove('d-none');
  } else {
    domEl.loginApp.classList.remove('d-none');
    domEl.loginApp.classList.add('show');
    domEl.containerApp.classList.add('d-none');
  }
});
