import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC_I1gFkQz6_uBJ9QdBBrriUiYabbi3fG4',
  authDomain: 'moneyhackey.firebaseapp.com',
  projectId: 'moneyhackey',
  storageBucket: 'moneyhackey.appspot.com',
  messagingSenderId: '1039438328981',
  appId: '1:1039438328981:web:c54a548b260dc6e900179c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const activeAccount = 'PipgqG76If0CiGua1zMF';
const acccountNumber = 1654981998442;

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
  //const querySnapshot = await getDocs(collection(db, 'accounts'));
  const q = collection(db, `accounts/${activeAccount}/movements`);
  const querySnapshot = await getDocs(q);

  let movements = [];
  querySnapshot.forEach((doc) => {
    movements.push(doc.data());
  });
  return movements;
};

export const setNewMovement = async (newMovement, db, activeAccount) => {
  const newMovementRef = await addDoc(
    collection(db, `accounts/${activeAccount}/movements`),
    {
      ...newMovement,
    }
  );
};
