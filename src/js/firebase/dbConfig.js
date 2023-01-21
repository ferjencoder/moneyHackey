import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapShot,
} from 'firebase/firestore';
import * as domEl from '../helper/domElements';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  getFirebase,
  browserSessionPersistence,
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    const activeUser = user.uid;
    const userEmail = user.email;
    const userDisplayName = user.displayName;
    const userPhotoURL = user.photoURL;

    userData(activeUser, userEmail, userDisplayName, userPhotoURL);
    domEl.loginApp.classList.add('d-none');
    domEl.containerApp.classList.remove('d-none');
    showMoneyTrack(activeUser);

    // ...
  } else {
    console.log('user logged out');
    domEl.loginApp.classList.remove('d-none');
    domEl.containerApp.classList.add('d-none');
  }
});

const userData = (activeUser, userEmail, userDisplayName, userPhotoURL) => {
  domEl.userName.textContent = userDisplayName;
  domEl.userEmail.textContent = userEmail;
  domEl.userImgURL.src = userPhotoURL;
  //domEl.userImgURLSmBar.src = userPhotoURL;
  updateUI(activeUser);
  return activeUser;
};

const checkIfUser = async (
  activeUser,
  userEmail,
  userDisplayName,
  userPhotoURL
) => {
  const docRef = doc(db, 'users', activeUser);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('user in db');
  } else {
    setDoc(doc(db, 'users', activeUser), {
      email: userEmail,
      name: userDisplayName,
      userPhotoURL: userPhotoURL,
      uid: activeUser,
    });
  }

  //onAuthStateChanged(auth, (user) => {
  //  if (user != null) {
  //    userData(activeUser, userEmail, userDisplayName, userPhotoURL);
  //    domEl.loginApp.classList.add('d-none');
  //    domEl.containerApp.classList.remove('d-none');
  //    showMoneyTrack(activeUser);
  //  } else {
  //    domEl.loginApp.classList.remove('d-none');
  //    domEl.containerApp.classList.add('d-none');
  //  }
  //});
};

const googleSignIn = async () => {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      const activeUser = user.uid;
      const userEmail = user.email;
      const userDisplayName = user.displayName;
      const userPhotoURL = user.photoURL;

      checkIfUser(activeUser, userEmail, userDisplayName, userPhotoURL);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

domEl.btnSignup.addEventListener('click', googleSignIn);

domEl.btnLogout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('Logged out');
  });
});

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
};

const createMovement = async (newMovement) => {
  const auth = getAuth(app);
  const activeUser = auth.currentUser.uid;

  const docRef = await addDoc(
    collection(db, 'users', activeUser, 'moneyTracker'),
    {
      ...newMovement,
    }
  );

  updateUI(activeUser);
};

export const setNewMovement = (e) => {
  e.preventDefault();
  let dateEl = createDate(domEl.inputExpenseDate.value);
  let moneyEl = -Number(domEl.inputExpenseMoney.value);
  let categoryEl = domEl.inputExpenseCategory.value;
  let placeEl = domEl.inputExpensePlace.value;
  let paymentsEl = domEl.inputExpensePayments.value;
  let currencyEl = domEl.inputExpenseCurrency.value;
  let commentEl = domEl.inputExpenseComment.value;

  const newMovement = {
    category: categoryEl,
    comment: commentEl,
    currency: currencyEl,
    date: dateEl,
    money: moneyEl,
    payments: paymentsEl,
    place: placeEl,
  };

  domEl.inputExpenseCategory.value = '';
  domEl.inputExpenseComment.value = '';
  domEl.inputExpenseCurrency.value = '';
  domEl.inputExpenseDate.value = '';
  domEl.inputExpenseMoney.value = '';
  domEl.inputExpensePayments.value = '';
  domEl.inputExpensePlace.value = '';
  createMovement(newMovement);
};

domEl.btnExpense.addEventListener('click', setNewMovement);

export function onAuth(fn) {
  return onAuthStateChanged(auth, (user) => {
    fn(user);
    domEl.loginApp.classList.add('d-none');
    domEl.containerApp.classList.remove('d-none');
  });
}
