import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase/dbConfig';
import { btnLogin } from './domElements';

//import {db} from './fetchData';

export const onFormSubmit = ({ target }) => {
  event.preventDefault();
  const newMovement = {
    date: '20/01/23',
    money: -20000,
    place: 'Las Pacas',
    payments: 3,
    comment: 'Comment from the user. Comment from the user.',
    category: 'restaurant',
    currency: 'ARS',
  };
};

//export const setNewMovement = async (newMovement, db, activeAccount) => {
//  const newMovementRef = doc(db, 'accounts', activeAccount);
//  await updateDoc(newMovementRef, { movements: arrayUnion(newMovement) });
//
//};

//const createUser = async () => {
//  //  const user = {
//  //    account: 'account',
//  //    accountNumber: 'accountNumber',
//  //    active: 'active',
//  //    email: 'email',
//  //    pin: 'pin',
//  //    uid: 'uid',
//  //    userName: 'userName',
//  //    userlmg: 'userlmg',
//  //  };
//  //
//  //  try {
//  //    const userRef = await addDoc(collection(db, 'users'), user);
//  //    console.log('Document written with ID: ', userRef.id);
//  //  } catch (e) {
//  //    console.error('Error adding document: ', e);
//  //  }
//  //
//  //  console.log(user);
//};
