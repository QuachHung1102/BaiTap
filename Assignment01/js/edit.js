'use strict';

import {
  getCreateDate,
  renderTableData
} from "./utils.js";

const petList = {};

if (typeof (Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
  const data = localStorage.getItem('petList');
  console.log(`localStorage is available!`);
  data ? Object.assign(petList, JSON.parse(data)) : localStorage.setItem('petList', JSON.stringify(petList));
  console.log("pet list:" + localStorage.getItem('petList'));
  // localStorage.removeItem('petList');
} else {
  // Sorry! No Web Storage support..
  console.log(`localStorage is not available!`);
}

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

// Event

if (findIdEl) {
  findIdEl.addEventListener('click', (e) => {
    e.preventDefault();
    const form = getEleById('findID-form');
    const formData = new FormData(form);
    const petId = formData.get('input-id');
    if (petList.hasOwnProperty(petId)) {
      const petFind = [petList[petId]];
      renderTableData(petFind);
    } else {
      window.alert(`Can't find petId: ${petId}`);
    }
  });
}


tableBodyEl.innerHTML = ``;
renderTableData({});

