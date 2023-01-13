export const onFormSubmit = ({ target }) => {
  event.preventDefault();
  const newMovement = {
    transaction: 1,
    date: '20/01/23',
    money: -20000,
    store: 'Las Pacas',
    payments: 3,
    comment: 'Comment from the user. Comment from the user.',
    type: 'withdrawal',
    category: 'restaurant',
    currency: 'ARS',
  };
};
