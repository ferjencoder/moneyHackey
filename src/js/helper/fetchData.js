import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

//export const fetchData = async (accNum) => {
//
//  let acc;
//  if (accNum) {
//    acc = query(collection(db, 'accounts'), where('accountNumber', '==', accNum));
//  } else {
//    acc = query(collection(db, 'accounts'), orderBy('accountNumber'));
//  }
//  const querySnapshot = await getDocs(acc);
//
//  const dataFromFirestore = querySnapshot.docs.map((document) => ({
//    id: document.id,
//    ...document.data(),
//  }));
//
//  //console.log('dataFromFirestore', dataFromFirestore);
//
//  return dataFromFirestore;
//};
//fetchData(acccountNumber);

export const fetchAccount = async (activeAccount) => {
  const docRef = doc(db, 'accounts', activeAccount);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log('Document data:', docSnap.data());
    return {
      activeAccount: activeAccount,
      ...docSnap.data(),
    };
  } else {
    console.log('No such doc');
  }
};
