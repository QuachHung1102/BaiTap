'use strict';

const petList = {
  '1': {
    id: "1",
    name: "Bob",
    age: 3,
    type: "dog",
    weight: "30",
    length: "50",
    color: "#000000",
    breed: "Rottweiler",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: `1 tỉ`,
    dateCreate: "2023-09-12T08:31:48.947Z",
  },
  '2': {
    id: "2",
    name: "Poppy",
    age: 5,
    type: "dog",
    weight: "20",
    length: "40",
    color: "#ffffff",
    breed: "Rottweiler",
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    bmi: `10 tỉ`,
    dateCreate: "2023-09-12T08:31:48.947Z",
  },
  '3': {
    id: "3",
    name: "Harry",
    age: 3,
    type: "dog",
    weight: "8",
    length: "30",
    color: "#ffff00",
    breed: "Shiba",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: `100`,
    dateCreate: "2023-09-12T08:31:48.947Z",
  },
};

if (typeof (Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
  const data = localStorage.getItem('petList');
  console.log(`localStorage is available!`);
  data ? Object.assign(petList, JSON.parse(data)) : localStorage.setItem('petList', JSON.stringify(petList));
  console.log("pet list:" + localStorage.getItem('petList'));
  localStorage.removeItem('petList');
} else {
  // Sorry! No Web Storage support..
  console.log(`localStorage is not available!`);
}

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

const checkId = (id) => {
  let flag = true;
  console.log(`id: ${id}`);
  if (Object.keys(petList).length > 0) {
    const arrPetList = Object.values(petList);
    flag = !arrPetList.some((pet) => pet.id == id);
    console.log(flag);
  }
  return flag;
}

// checkData để validate
const checkData = (data) => {
  console.log(data); // In ra dữ liệu nhập vào( là data chưa qua xủ lý)
  let flag = Object.values(data).every(data => !!data);
  if (flag) {
    if (checkId(data.id) == false) {
      flag = false;
      alert(`ID must be unique!`);
    } else if (data.age < 1 || data.age > 15) {
      flag = false;
      alert(`Age must be between 1 and 15!`);
    } else if (data.type == ``) {
      flag = false;
      alert(`Please select Type!`);
    } else if (data.breed == ``) {
      flag = false;
      alert(`Please select Breed!`);
    }
  } else {
    alert(`Hãy nhập đầy đủ các trường dữ liệu!`);
  }
  return flag;
}

// const renderTableData = () => {
//     const petArr = Object.values(petList);
//     let htmlStudent = ``;
//     for (const pet of petArr) {
//         const checkVaccin = pet.vaccinated ? `check` : `x`;
//         const checkDewormed = pet.dewormed ? `check` : `x`;
//         const checkSterilized = pet.sterilized ? `check` : `x`;
//         htmlStudent += `
//         <tr>
//             <th scope="row">${pet.id}</th>
//             <td>${pet.name}</td>
//             <td>${pet.age}</td>
//             <td>${pet.type}</td>
//             <td>${pet.weight}</td>
//             <td>${pet.length}</td>
//             <td>${pet.breed}</td>
//             <td>
//                 <i class="bi bi-square-fill" style="color: ${pet.color} "></i>
//             </td>
//             <td><i class="bi bi-${checkVaccin}-circle-fill"></i></td>
//             <td><i class="bi bi-${checkDewormed}-circle-fill"></i></td>
//             <td><i class="bi bi-${checkSterilized}-circle-fill"></i></td>
//             <td>${pet.bmi}</td>
//             <td>01/03/2022</td>
//             <td>
//                 <button type="button" class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button>
//             </td>
//         </tr>
//         `;
//     }
//     tableBodyEl.innerHTML = htmlStudent;
// }

const renderTableData = () => {
  const petArr = Object.values(petList);
  const fragment = document.createDocumentFragment(); // Tạo 1 fragment để chứa các thẻ tr
  petArr.forEach((pet) => {
    const row = document.createElement('tr');

    const createTablehead = (content) => {
      const cell = document.createElement('td');
      cell.scope = 'row';
      cell.textContent = content;
      return cell;
    }

    const createCell = (content) => {
      const cell = document.createElement('td');
      cell.textContent = content;
      return cell;
    }

    const createIconCell = (iconClass) => {
      const cell = document.createElement('td');
      const icon = document.createElement('i');
      icon.className = `bi bi-${iconClass}-circle-fill`;
      cell.appendChild(icon);
      return cell;
    }

    const createColorCell = (color) => {
      const colorCell = document.createElement('td');
      const colorIcon = document.createElement('i');
      colorIcon.className = `bi bi-square-fill`;
      colorIcon.style.color = pet.color;
      colorCell.appendChild(colorIcon);
      return colorCell;
    }

    row.appendChild(createTablehead(pet.id));
    row.appendChild(createCell(pet.name));
    row.appendChild(createCell(pet.age));
    row.appendChild(createCell(pet.type));
    row.appendChild(createCell(pet.weight));
    row.appendChild(createCell(pet.length));
    row.appendChild(createCell(pet.breed));
    
    row.appendChild(createColorCell(pet.color));

    row.appendChild(createIconCell(pet.vaccinated ? `check` : `x`));
    row.appendChild(createIconCell(pet.dewormed ? `check` : `x`));
    row.appendChild(createIconCell(pet.sterilized ? `check` : `x`));
    row.appendChild(createCell(pet.bmi));
    row.appendChild(createCell(pet.dateCreate));

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deletePet(pet.id);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    fragment.appendChild(row);
  });

  tableBodyEl.innerHTML = ``;
  tableBodyEl.appendChild(fragment);
};


// const renderTableDataHealthyPet = () => {
//   tableBodyEl.innerHTML = ``;
//   const petArr = Object.values(petList);
//   let htmlStudent = ``;
//   for (const pet of petArr) {
//     const checkVaccin = pet.vaccinated ? `check` : `x`;
//     const checkDewormed = pet.dewormed ? `check` : `x`;
//     const checkSterilized = pet.sterilized ? `check` : `x`;
//     if (pet.vaccinated && pet.dewormed && pet.sterilized) {
//       htmlStudent += `
//             <tr>
//                 <th scope="row">${pet.id}</th>
//                 <td>${pet.name}</td>
//                 <td>${pet.age}</td>
//                 <td>${pet.type}</td>
//                 <td>${pet.weight}</td>
//                 <td>${pet.length}</td>
//                 <td>${pet.breed}</td>
//                 <td>
//                     <i class="bi bi-square-fill" style="color: ${pet.color} "></i>
//                 </td>
//                 <td><i class="bi bi-${checkVaccin}-circle-fill"></i></td>
//                 <td><i class="bi bi-${checkDewormed}-circle-fill"></i></td>
//                 <td><i class="bi bi-${checkSterilized}-circle-fill"></i></td>
//                 <td>${pet.bmi}</td>
//                 <td>01/03/2022</td>
//                 <td>
//                     <button type="button" class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button>
//                 </td>
//             </tr>
//             `;
//     }
//   }
//   tableBodyEl.innerHTML = htmlStudent;
// }

const renderTableDataHealthyPet = () => {
  const petArr = Object.values(petList);
  const fragment = document.createDocumentFragment(); // Tạo 1 fragment để chứa các thẻ tr

  petArr.forEach((pet) => {
    const row = document.createElement('tr');

    const createTablehead = (content) => {
      const cell = document.createElement('th');
      cell.scope = 'row';
      cell.textContent = content;
      return cell;
    }

    const createCell = (content) => {
      const cell = document.createElement('td');
      cell.textContent = content;
      return cell;
    }
  });
}

const deletePet = (petId) => {
  const petArr = Object.values(petList);
  for (const pet of petArr) {
    if (pet.id == petId) {
      delete petList[`${petId}`]
    }
  }
  renderTableData();
}
// DOM

const submitEle = getEleById(`submit-btn`);
const healthyEl = getEleById(`healthy-btn`);
const inputIdEl = getEleById(`input-id`);
const inputNameEl = getEleById(`input-name`);
const inputAgeEl = getEleById(`input-age`);
const inputTypeEl = getEleById(`input-type`);
const inputWeightEl = getEleById(`input-weight`);
const inputLengthEl = getEleById(`input-length`);
const inputColor1El = getEleById(`input-color-1`);
const inputBreedEl = getEleById(`input-breed`);
const inputVaccinatedEl = getEleById(`input-vaccinated`);
const inputDewormedEl = getEleById(`input-dewormed`);
const inputSterilizedEl = getEleById(`input-sterilized`);
const tableBodyEl = getEleById(`tbody`);
// Even

submitEle.addEventListener('click', (e) => {
  const data = {
    id: inputIdEl.value,
    name: inputNameEl.value,
    age: parseInt(inputAgeEl.value),
    type: inputTypeEl.value,
    weight: inputWeightEl.value,
    length: inputLengthEl.value,
    color: inputColor1El.value,
    breed: inputBreedEl.value,
    vaccinated: inputVaccinatedEl.checked,
    dewormed: inputDewormedEl.checked,
    sterilized: inputSterilizedEl.checked,
    data: new Date(),
  }
  data[`bmi`] = (data.type == `dog` ? ((data.weight * 703) / data.length ** 2) : ((data.weight * 886) / data.length ** 2)).toFixed(2);
  if (checkData(data)) {
    const objectName = `pet${data.id}`;
    petList[objectName] = data;
  }
  console.log(petList);
  getEleById(`form`).reset();
  renderTableData();
});
healthyEl.addEventListener('click', () => {
  console.log(showHealthyActive);
  if (showHealthyActive == false) {
    renderTableDataHealthyPet();
    healthyEl.textContent = `Show All Pet`;
  } else {
    renderTableData();
    healthyEl.textContent = `Show Healthy Pet`;
  }
  showHealthyActive = !showHealthyActive;
});

tableBodyEl.innerHTML = ``;
renderTableData();
// renderTableDataHealthyPet();

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