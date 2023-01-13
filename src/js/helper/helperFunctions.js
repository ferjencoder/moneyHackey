const precioARS = function (precio) {
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

//console.log(userCreate(inputName));

export default precioARS;
