import { collection, getDocs } from 'firebase/firestore';
import { displayMoneyTrack } from '../..';
import { db } from './dbConfig';

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
  const q = collection(db, `users/${activeUser}/moneyTracker`);
  const querySnapshot = await getDocs(q);

  let movements = [];
  querySnapshot.forEach((doc) => {
    movements.push(doc.data());
  });

  displayMoneyTrack(movements);
  return movements;
};
