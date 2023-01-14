export const precioARS = function (precio) {
  // PASS ANY NUMBER
  let precioToFormat = precio;
  const options = {
    style: 'currency',
    currency: 'ARS',
    maximumSignificantDigits: 3,
  };
  const anyPrecioARS = new Intl.NumberFormat('es-AR', options).format(
    precioToFormat
  );

  return anyPrecioARS;
};

//not currently used //////////////////////////////////////////////
const currencies = new Map([
  ['ARS', 'Peso Argentino'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['USD', 'United States dollar'],
]);
///////////////////////////////////////////////////////////////////

export const createDate = (now) => {
  //const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear().toString().substring(2);
  return `${year}${month}${day}`;
};

const inputName = 'Diana Gabaldon';
export const userCreate = (inputName) => {
  const userName = inputName
    .trim()
    .toLowerCase()
    .split(' ')
    .map((name) => name[0])
    .join('');
  return userName;
};
