import { collection, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { db } from './dbConfig';

const activeAccount = '4UpnfRSWYGsvmmZP21Un';
const accountNumber = 2654981998442;
const activeUser = '7x6TAa7Zy3reySiw7hMk';

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

export const fetchMovements = async (activeAccount) => {
  const q = collection(db, `accounts/${activeAccount}/movements`);
  const querySnapshot = await getDocs(q);

  let movements = [];
  querySnapshot.forEach((doc) => {
    movements.push(doc.data());
  });
  //updateUI();
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

export const setNewMovement = async (newMovement, db, activeAccount) => {
  const newMovementRef = await addDoc(
    collection(db, `accounts/${activeAccount}/movements`),
    {
      ...newMovement,
    }
  );
};

//export const updateUI = async (activeAccount) => {
//  await fetchMovements(activeAccount)
//    .then(displayMovements(movements))
//    .then(balanceTotal(movements));
//};
