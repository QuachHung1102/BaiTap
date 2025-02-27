'use strict';

import { petList, breedList, findPetWithInfo } from './data.js';
import { renderTableData, renderBreeds } from './utils.js';

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

const searchFormEl = getEleById(`search-form`);
const submitEle = getEleById(`find-btn`);
const tableBodyEl = getEleById(`tbody`);
const breedTypeSeclectEl = getEleById(`input-type`);

// Even

breedTypeSeclectEl.addEventListener('change', (e) => {
  renderBreeds(e.target.value);
});

submitEle.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(searchFormEl);

  const findData = {
    id: getEleById('input-id').value,
    name: getEleById('input-name').value,
    type: getEleById('input-type').value,
    breed: getEleById('input-breed').value,
    vaccinated: formData.get('input-vaccinated') === 'on',
    dewormed: formData.get('input-dewormed') === 'on',
    sterilized: formData.get('input-sterilized') === 'on',
  }
  
  const findArr = findPetWithInfo(findData);
  if (findArr.length > 0) {
    renderTableData(findArr);
  } else {
    window.alert(`No data found!`);
  }

})