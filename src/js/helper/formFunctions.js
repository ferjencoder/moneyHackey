import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

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

export const setNewMovement = async (newMovement, db, activeAccount) => {
  const newMovementRef = doc(db, 'accounts', activeAccount);
  await updateDoc(newMovementRef, { movements: arrayUnion(newMovement) });

  // Atomically remove a region from the "regions" array field.
  //  await updateDoc(washingtonRef, {
  //    regions: arrayRemove('east_coast'),
  //  });
  //
  //  await db
  //    .collection('accounts')
  //    .doc(activeAccount)
  //    .update('movements', FieldValue.arrayUnion(newMovement), { merge: true });
};

//export const resetInputValue = () => {};
