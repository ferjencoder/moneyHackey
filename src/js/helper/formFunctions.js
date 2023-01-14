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

//export const setNewMovement = async (newMovement, db, activeAccount) => {
//  const newMovementRef = doc(db, 'accounts', activeAccount);
//  await updateDoc(newMovementRef, { movements: arrayUnion(newMovement) });
//
//};
