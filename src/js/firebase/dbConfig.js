import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import * as domEl from '../helper/domElements';
//import { config } from 'dotenv';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { fetchMovements } from './fetchData';
import { createDate } from '../helper/helperFunctions';

//const API_KEY_NAME = process.env.API_KEY_NAME;
//const API_KEY_VALUE = process.env.API_KEY_VALUE;
//const APP_ID_NAME = process.env.APP_ID_NAME;
//const APP_ID_VALUE = process.env.APP_ID_VALUE;
//const AUTH_DOMAIN_NAME = process.env.AUTH_DOMAIN_NAME;
//const AUTH_DOMAIN_VALUE = process.env.AUTH_DOMAIN_VALUE;
//const MESSAGING_SENDER_ID_NAME = process.env.MESSAGING_SENDER_ID_NAME;
//const MESSAGING_SENDER_ID_VALUE = process.env.MESSAGING_SENDER_ID_VALUE;
//const PROJECT_ID_NAME = process.env.PROJECT_ID_NAME;
//const PROJECT_ID_VALUE = process.env.PROJECT_ID_VALUE;
//const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME;
//const STORAGE_BUCKET_VALUE = process.env.STORAGE_BUCKET_VALUE;

const firebaseConfig = {
  apiKey: 'AIzaSyC_I1gFkQz6_uBJ9QdBBrriUiYabbi3fG4',
  authDomain: 'moneyhackey.firebaseapp.com',
  projectId: 'moneyhackey',
  storageBucket: 'moneyhackey.appspot.com',
  messagingSenderId: '1039438328981',
  appId: '1:1039438328981:web:c54a548b260dc6e900179c',

  //apiKey: 'API_KEY_VALUE',
  //authDomain: 'AUTH_DOMAIN_VALUE',
  //projectId: 'PROJECT_ID_VALUE',
  //storageBucket: 'STORAGE_BUCKET_VALUE',
  //messagingSenderId: 'MESSAGING_SENDER_ID_VALUE',
  //appId: 'APP_ID_VALUE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

//domEl.btnSignup.innerHTML = `
//FcGoogle
//`;

//INFO desde aquí
//const email = domEl.valueEmail.value;
//const password = domEl.valuePassword.value;
//
//domEl.btnLogin.addEventListener('click', signInWithEmailAndPassword);
//
//createUserWithEmailAndPassword(
//  auth,
//  domEl.valueEmail.value,
//  domEl.valuePassword.value
//)
//  .then((userCredential) => {
//    // Signed in
//    console.log(domEl.valueEmail.value);
//    console.log(domEl.valuePassword.value);
//
//    const user = userCredential.user;
//    console.log(user);
//  })
//  .catch((error) => {
//    const errorCode = error.code;
//    const errorMessage = error.message;
//    console.log(errorMessage);
//  });
//
//signInWithEmailAndPassword(auth, email, password)
//  .then((userCredential) => {
//    // Signed in
//    const user = userCredential.user;
//    console.log(user);
//  })
//  .catch((error) => {
//    const errorCode = error.code;
//    const errorMessage = error.message;
//  });
//INFO hasta aquí

//FUNCIONA
//domEl.btnSignup.addEventListener('click', () => {
//  console.log('clicked');
//  signInWithPopup(auth, googleAuthProvider)
//    .then((auth) => console.log(auth))
//    .then((auth) => console.log(auth.userCredential.displayName))
//    .then(console.log(userCredential.user['displayName']));
//  console.log(JSON.stringify(auth.authImpl.currentUser.photoURL));
//  console.log(JSON.stringify(auth.authImpl.currentUser.uid));
//  onAuthStateChanged();
//});

const userData = (activeUser, userEmail, userDisplayName, userPhotoURL) => {
  domEl.userName.textContent = userDisplayName;
  domEl.userEmail.textContent = userEmail;
  domEl.userImgURL.src = userPhotoURL;
  console.log(activeUser);
  updateUI(activeUser);
};

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const activeUser = result.user.uid;
    const userEmail = result.user.email;
    const userDisplayName = result.user.displayName;
    const userPhotoURL = result.user.photoURL;

    userData(activeUser, userEmail, userDisplayName, userPhotoURL);
    showMoneyTrack(activeUser);
    return activeUser;
  } catch (error) {
    console.log(error);
  }
  return userEmail;
};

domEl.btnSignup.addEventListener('click', googleSignIn);

//  .then(console.log(auth))
//  .then(console.log(googleSignIn.user))
//  .then(console.log(userCredential.user['displayName']));
//console.log(JSON.stringify(auth.authImpl.currentUser.photoURL));
//console.log(JSON.stringify(auth.authImpl.currentUser.uid));

//const googleLogin = async () => {
//  try {
//    const result = await signInWithPopup(auth, googleAuthProvider);
//    console.log(result.user);
//  } catch (error) {
//    console.log(error);
//  }
//};
//
//domEl.btnSignup.addEventListener('click', googleLogin);

//domEl.btnSignup.addEventListener('click', () => {
//  console.log('clicked');
//  signInWithPopup(auth, googleAuthProvider)
//    .then((auth) => console.log(auth))
//    .then((auth) => console.log(auth.userCredential.displayName))
//    .then(console.log(userCredential.user['displayName']));
//  console.log(JSON.stringify(auth.authImpl.currentUser.photoURL));
//  console.log(JSON.stringify(auth.authImpl.currentUser.uid));
//  onAuthStateChanged();
//});

domEl.btnLogout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('Logged out');
    //onAuthStateChanged(auth);
  });
});

//onAuthStateChanged(auth, (user) => {
//  if (user) {
//    domEl.loginApp.classList.add('d-none');
//    domEl.containerApp.classList.remove('d-none');
//  } else {
//    domEl.loginApp.classList.remove('d-none');
//    domEl.containerApp.classList.add('d-none');
//  }
//});

const showMoneyTrack = (activeUser) => {
  if (activeUser) {
    domEl.loginApp.classList.add('d-none');
    domEl.containerApp.classList.remove('d-none');
  } else {
    domEl.loginApp.classList.remove('d-none');
    domEl.containerApp.classList.add('d-none');
  }
};

export const updateUI = (activeUser) => {
  fetchMovements(activeUser);
  //displayMovements(newMovement, ...movements);
  //balanceTotal(newMovement, ...movements);
};

export const setNewMovement = async (newMovement, db, activeUser) => {
  const newMovementRef = await addDoc(
    collection(db, `users/${activeUser}/movements`),
    {
      ...newMovement,
    }
  );
  updateUI(activeUser);
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

  setNewMovement(newMovement, db, activeUser);

  domEl.inputExpenseCategory.value = '';
  domEl.inputExpenseComment.value = '';
  domEl.inputExpenseCurrency.value = '';
  domEl.inputExpenseDate.value = '';
  domEl.inputExpenseMoney.value = '';
  domEl.inputExpensePayments.value = '';
  domEl.inputExpensePlace.value = '';

  //! Cuidado
});
