import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  query,
  doc,
} from 'firebase/firestore';
import { displayMoneyTrack, balanceTotal } from '/src/index';
import { db, auth } from './dbConfig';

//const activeAccount = '4UpnfRSWYGsvmmZP21Un';
//const accountNumber = 2654981998442;
//const activeUser = '7x6TAa7Zy3reySiw7hMk';

//* Read movements from db
//const activeAccount = 'PipgqG76If0CiGua1zMF';
//const acccountNumber = 1654981998442;
//WORKS/////////////////////////////////////////////////////////
//export const fetchAccount = async (activeAccount) => {
//  const docRef = doc(db, 'accounts', activeAccount);
//  ////const docRef = doc(db, 'accounts', activeAccount);
//  const docSnap = await getDoc(docRef);
//
//  if (docSnap.exists()) {
//    return {
//      activeAccount: activeAccount,
//      ...docSnap.data(),
//    };
//  } else {
//    console.log('No such doc');
//  }
//};
//WORKS/////////////////////////////////////////////////////////

export const fetchMovements = async (activeUser) => {
  const userRef = doc(db, 'users', `${activeUser}`);
  console.log(userRef);

  const movRef = collection(userRef, 'moneytracker');
  console.log(movRef);

  //const collectionRef = collection(userRef, 'moneytracker');
  const q = await query(movRef);
  console.log(q);

  const movements = await getDocs(q);
  //const userMoneyTracker = await getDocs(movRef);
  console.log(movements);

  //let movements = [];
  //userMoneyTracker.forEach((doc) => {
  //  movements.push(doc.data());
  //});

  //console.log(userRefQuerySnapshot);
  //console.log(movements);

  displayMoneyTrack(movements);
  return movements;
};

//export const fetchUsers = async (activeUser) => {
//  console.log(activeUser);
//
//  const q = collection(db, `users`);
//
//  //q.length < 3 ? collection(db, `accounts/${activeAccount}`) : '';
//
//  const querySnapshot = await getDoc(q);
//
//  console.log(q);
//
//  let users = [];
//  querySnapshot.forEach((doc) => {
//    users.push(doc.data());
//  });
//  //updateUI();
//  //return users;
//};
//
//fetchUsers(activeUser);

//export const updateUI = async (activeAccount) => {
//  await fetchMovements(activeAccount)
//    .then(displayMovements(movements))
//    .then(balanceTotal(movements));
//};
