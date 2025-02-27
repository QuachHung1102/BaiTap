'use strict';
import {
  getCreateDate,
  renderTableData,
  renderTableDataHealthyPet,
  renderBreeds
} from './js/utils.js';
import { checkData } from './js/data.js';
import { petList } from './js/data.js';

let showHealthyActive = false;
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

const addForm = getEleById('form');
const submitEle = getEleById(`submit-btn`);
const healthyEl = getEleById(`healthy-btn`);
const tableBodyEl = getEleById(`tbody`);
const breedTypeSeclectEl = getEleById(`input-type`);

// Even

breedTypeSeclectEl.addEventListener('change', (e) => {
  renderBreeds(e.target.value);
});

addForm.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    submitEle.click(); // Kích hoạt sự kiện click của nút submit
  }
});

submitEle.addEventListener('click', (e) => {
  e.preventDefault();
  const form = getEleById('form');
  const formData = new FormData(form);

  const data = {
    id: formData.get('input-id'),
    name: formData.get('input-name'),
    age: parseInt(formData.get('input-age')),
    type: formData.get('input-type').at(0).toUpperCase() + formData.get('input-type').substring(1),
    weight: formData.get('input-weight'),
    length: formData.get('input-length'),
    color: formData.get('input-color-1'),
    breed: formData.get('input-breed'),
    vaccinated: formData.get('input-vaccinated') === 'on',
    dewormed: formData.get('input-dewormed') === 'on',
    sterilized: formData.get('input-sterilized') === 'on',
    dateCreate: getCreateDate(),
  };

  data[`bmi`] = (data.type == `dog` ? ((data.weight * 703) / data.length ** 2) : ((data.weight * 886) / data.length ** 2)).toFixed(2);
  if (checkData(data)) {
    const objectName = `${data.id}`;
    petList[objectName] = data;
    form.reset();
  } else {
    return;
  }
  // document.getElementById('formFileSave-modal').classList.remove('hidden');
  localStorage.setItem('petList', JSON.stringify(petList));
  // saveDynamicDataToFile(JSON.stringify(petList), `petList.text`);
  renderTableData(petList);
});
if (healthyEl) {
  healthyEl.addEventListener('click', () => {
    console.log(showHealthyActive);
    if (showHealthyActive == false) {
      renderTableDataHealthyPet(petList);
      healthyEl.textContent = `Show All Pet`;
    } else {
      renderTableData(petList);
      healthyEl.textContent = `Show Healthy Pet`;
    }
    showHealthyActive = !showHealthyActive;
  });
}


tableBodyEl.innerHTML = ``;
renderTableData(petList);
// renderTableDataHealthyPet(petList);

// (function (a) {
//     return (function () {
//         console.log(a);
//         a = 6;
//     })();
// })(21);
// /**
//  * Ngay lập tức chạy hàm và đẩy đối số là 21
//  * Lúc này có a = 21
//  * Chạy luôn hàm con và clg a = 21
//  * Thay a = 6. Tuy nhiên vì là hàm ẩn danh a không thể ảnh hưởng
//  * đến biến a ở phạm vi bên ngoài
//  */

// (() => (() => console.log(`a`))())();