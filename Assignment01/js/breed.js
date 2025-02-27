'use strict';

import { breedList } from './data.js';
import { renderTableDataBreeds } from './utils.js';

// Global
const getEleById = (id) => {
  return document.getElementById(id);
}

const getElementByClass = (className) => {
  return document.getElementsByClassName(className); // return Arr
}

const qrSelector = (selector) => {
  return document.querySelector(selector);
}

// DOM
const tableBodyEl = getEleById(`tbody`);
const addBreedFormEl = getEleById(`add-breed-form`);
const addBreedSubmitBtn = getEleById(`add-breed-submit-btn`);

// Event

addBreedSubmitBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
  const newBreedFormData = new FormData(addBreedFormEl);
  const breed = newBreedFormData.get(`input-breed`);
  const type = newBreedFormData.get(`input-type`);

  if (!breedList[type].includes(breed)) {
    breedList[type].push(breed);
    renderTableDataBreeds(breedList);
    localStorage.setItem('breedList', JSON.stringify(breedList));
    alert(`Add breed successfully!`);
  } else {
    alert(`Breed is already existed!`);
  }
})

tableBodyEl.innerHTML = ``;
if (breedList) {
  renderTableDataBreeds(breedList);
}
