'use strict';
import { petList } from './data.js';
import { saveDynamicDataToFile } from './saveFile.js';
import { onChooseFile, onFileLoad } from './fileReader.js';

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
const exportBtn = getEleById(`export-btn`);
const importBtn = getEleById(`import-btn`);

// Event

exportBtn.addEventListener('click', (e) => {
  saveDynamicDataToFile(petList, `petData.json`);
});

importBtn.addEventListener('click', (e) => {
  let input = getEleById(`input-file`);
  if (!input.files || !input.files[0]) {
    window.alert(`Chưa chọn file`);
    return;
  }
  onChooseFile({ target: input }, onFileLoad);
  
});