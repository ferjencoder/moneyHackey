//import * as domEl from './domElements';

//domEl.btnExpenseSmallBar.addEventListener('click', (e) => {
//  e.preventDefault();
//  domEl.offcanvasExpense.classList.remove('d-none');
//});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
