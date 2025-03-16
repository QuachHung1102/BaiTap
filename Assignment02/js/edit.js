'use strict';

import {
  getCreateDate,
  renderTableData,
  renderBreeds
} from "./utils.js";
import { petList, breedList } from "./data.js";

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
const findIdEl = getEleById(`find-id-btn`);
const editButtonEl = getEleById(`button-btn-edit`);
const formEditEl = getEleById(`formEdit-modal`);
const findFormEl = getEleById(`findID-form`);
const editFormEl = getEleById(`form-edit`);
const breedTypeSeclectEl = getEleById(`input-type-edit`);

// Event

breedTypeSeclectEl.addEventListener('change', (e) => {
  renderBreeds(e.target.value);
});

findFormEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    findIdEl.click();
  }
});

editFormEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    editButtonEl.click();
  }
})

if (findIdEl) {
  findIdEl.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(findFormEl);
    const petId = formData.get('input-id');
    if (petList.hasOwnProperty(petId)) {
      const petFind = [petList[petId]];
      renderTableData(petFind);
    } else {
      window.alert(`Can't find petId: ${petId}`);
    }
  });
}

if (editButtonEl) {
  editButtonEl.addEventListener('click', (e) => {
    e.preventDefault();

    const formEditData = new FormData(editFormEl);
    const data = {
      id: formEditData.get('input-id-edit'),
      name: formEditData.get('input-name-edit'),
      age: parseInt(formEditData.get('input-age-edit')),
      type: formEditData.get('input-type-edit').at(0).toUpperCase() + formEditData.get('input-type-edit').slice(1),
      weight: formEditData.get('input-weight-edit'),
      length: formEditData.get('input-length-edit'),
      color: formEditData.get('input-color-1-edit'),
      breed: formEditData.get('input-breed-edit'),
      vaccinated: formEditData.get('input-vaccinated-edit') === 'on',
      dewormed: formEditData.get('input-dewormed-edit') === 'on',
      sterilized: formEditData.get('input-sterilized-edit') === 'on',
    };
    data.dateCreate = petList[data.id].dateCreate;
    data.bmi = (data.type == `dog` ? ((data.weight * 703) / data.length ** 2) : ((data.weight * 886) / data.length ** 2)).toFixed(2);
    petList[data.id] = data;
    localStorage.setItem('petList', JSON.stringify(petList));
    formEditEl.classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    renderTableData({ [data.id]: petList[data.id] });
    setTimeout(() => {
      window.alert(`Edit petId: ${data.id} successfully!`);
    }, 1000);
  });
}

tableBodyEl.innerHTML = ``;
renderTableData({});

