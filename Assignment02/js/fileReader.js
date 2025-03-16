'use strict';

import { petList } from "./data.js";
import { renderTableData } from "./utils.js";

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

// Event

const mergeData = (dataImport) => {
  Object.entries(dataImport).map(([key, pet]) => {
    if (petList.hasOwnProperty(key)) {
      petList[key] = dataImport[key]; // Update      
    } else {
      petList[key] = dataImport[key]; // Add new
    }
  });
  localStorage.setItem('petList', JSON.stringify(petList));
  renderTableData(petList);
}

function onFileLoad(elementId, event) {
  try {
    let jsonData = JSON.parse(event.target.result);
    console.log(JSON.stringify(jsonData, null, 2));
    mergeData(jsonData);
  } catch (error) {
    window.alert("Lỗi: Nội dung file không phải JSON hợp lệ!");
    console.log("Lỗi: Nội dung file không phải JSON hợp lệ!");
  }
}

function onChooseFile(event, onLoadFileHandler) {
  let input = event.target;
  if (!input.files || !input.files[0]) return;

  let file = input.files[0];
  let fr = new FileReader();

  fr.onload = (e) => onLoadFileHandler("contents", e); // Gọi handler khi file load xong
  fr.readAsText(file);
}

// Ở phần này có thể để onChooseFile trả về file và xử lý sau. Tuy nhiên ở đây xử lý luôn

export { onFileLoad, onChooseFile };