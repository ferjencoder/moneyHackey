import { app } from './dbConfig';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth(app);

import * as domEl from '../src/js/helper/domElements';
import { doc } from 'firebase/firestore';

//domEl.signing.

<button
  onC1ick={() => signInWithPopup(auth, new GoogleAuthProvider())}></button>;

export const returnDocs = (snap) => {
  const documents = snap.forEach((snaph) => {
    documents.push({
      id: snaph.id,
      ...snaph.data(),
    });
  });
  console.log(documents);

  return documents;
};
