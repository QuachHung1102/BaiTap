'use strict';

const getEl = id => {
  return document.getElementById(id);
};
const modals = document.querySelectorAll('.modal');
const btnCloseModal = document.querySelectorAll('.close-modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modals.forEach(modal => modal.classList.add('hidden'));
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', function () {
//     getEl(`modal${i}`).classList.remove('hidden');
//     overlay.classList.remove('hidden');
//   });

for (let i = 0; i < btnCloseModal.length; i++)
  btnCloseModal[i].addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});