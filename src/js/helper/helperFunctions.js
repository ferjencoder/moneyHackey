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
  ['USD', 'United States dollar'],
]);
///////////////////////////////////////////////////////////////////

export const createDate = (now) => {
  const newNow = new Date(now);
  const day = `${newNow.getDate()}`.padStart(2, 0);
  const month = `${newNow.getMonth() + 1}`.padStart(2, 0);
  const year = newNow.getFullYear().toString().substring(2);
  return `${year}-${month}-${day}`;
};

//const inputName = 'Diana Gabaldon';
//export const userCreate = (inputName) => {
//  const userName = inputName
//    .trim()
//    .toLowerCase()
//    .split(' ')
//    .map((name) => name[0])
//    .join('');
//  return userName;
//};

//SEARCH LIST
let filterInputDate = document.getElementById('filterInputDate');
let filterInputCategory = document.getElementById('filterInputCategory');
let filterInputPlace = document.getElementById('filterInputPlace');
let filterInputComment = document.getElementById('filterInputComment');
let filterInputMoney = document.getElementById('filterInputMoney');
let filterInputCurrency = document.getElementById('filterInputCurrency');
// Add event listener
filterInputDate.addEventListener('keyup', filterDate);
filterInputCategory.addEventListener('keyup', filterCategory);
filterInputPlace.addEventListener('keyup', filterPlace);
filterInputComment.addEventListener('keyup', filterComment);
filterInputMoney.addEventListener('keyup', filterMoney);
filterInputCurrency.addEventListener('keyup', filterCurrency);

function filterDate() {
  // Get value of input
  let filterValueDate = document
    .getElementById('filterInputDate')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liDate.length; i++) {
    let a = liDate[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValueDate) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
function filterCategory() {
  // Get value of input
  let filterValueCategory = document
    .getElementById('filterInputCategory')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liCategory.length; i++) {
    let a = liCategory[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValueCategory) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
function filterPlace() {
  // Get value of input
  let filterValuePlace = document
    .getElementById('filterInputPlace')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liPlace.length; i++) {
    let a = liPlace[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValuePlace) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
function filterComment() {
  // Get value of input
  let filterValueComment = document
    .getElementById('filterInputComment')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liComment.length; i++) {
    let a = liComment[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValueComment) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
function filterMoney() {
  // Get value of input
  let filterValueMoney = document
    .getElementById('filterInputMoney')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liMoney.length; i++) {
    let a = liMoney[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValueMoney) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
function filterCurrency() {
  // Get value of input
  let filterValueCurrency = document
    .getElementById('filterInputCurrency')
    .value.toUpperCase();

  // Get names ul
  let ulDate = document.getElementById('date');
  let ulCategory = document.getElementById('category');
  let ulPlace = document.getElementById('place');
  let ulComment = document.getElementById('comment');
  let ulMoney = document.getElementById('money');
  let ulCurrency = document.getElementById('currency');
  // Get lis from ul
  let liDate = ulDate.querySelectorAll('li.collection-item');
  let liCategory = ulCategory.querySelectorAll('li.collection-item');
  let liPlace = ulPlace.querySelectorAll('li.collection-item');
  let liComment = ulComment.querySelectorAll('li.collection-item');
  let liCurrency = ulCurrency.querySelectorAll('li.collection-item');
  let liMoney = ulMoney.querySelectorAll('li.collection-item');

  for (let i = 0; i < liCurrency.length; i++) {
    let a = liCurrency[i].getElementsByTagName('a')[0];
    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValueCurrency) > -1) {
      liDate[i].style.display = '';
      liCategory[i].style.display = '';
      liPlace[i].style.display = '';
      liComment[i].style.display = '';
      liMoney[i].style.display = '';
      liCurrency[i].style.display = '';
    } else {
      liDate[i].style.display = 'none';
      liCategory[i].style.display = 'none';
      liPlace[i].style.display = 'none';
      liComment[i].style.display = 'none';
      liMoney[i].style.display = 'none';
      liCurrency[i].style.display = 'none';
    }
  }
}
