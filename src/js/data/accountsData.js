export const accounts = [
  {
    id: 12335468324,
    owner: {
      name: 'Mrs. Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+54123123',
      address: 'San Martin 100',
      user: 'fs',
      pin: 1111,
    },
    movements: [
      {
        transaction: 1,
        date: '20/01/23',
        money: 200,
        store: 'Las Pacas',
        payments: 3,
      },
      {
        transaction: 2,
        date: '28/12/22',
        money: 400,
        store: 'La Gran 7',
        payments: 3,
      },
      {
        transaction: 3,
        date: '18/12/22',
        money: 5000,
        store: 'Sushi Club',
        payments: 3,
      },
    ],
    interestRate: 1.2,
  },
  {
    id: 23654488522,
    owner: 'Nancy Mayers',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    id: 31223545564,
    owner: 'Jane Austen',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    id: 48651352221,
    owner: 'Norah Ephron',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];
