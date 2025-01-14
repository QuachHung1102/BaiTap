'use strict';
import { petList } from './data.js';

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
const submitEle = getEleById(`submit-btn`);
const healthyEl = getEleById(`healthy-btn`);
const tableBodyEl = getEleById(`tbody`);

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
  colorIcon.style.color = color;
  colorCell.appendChild(colorIcon);
  return colorCell;
}

const createDeleteButton = (petId) => {
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deletePet(petId);
  deleteCell.appendChild(deleteButton);
  return deleteCell;
}

const createEditButton = (petId) => {
  const deleteCell = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'btn btn-secondary';
  editButton.textContent = 'Edit';
  editButton.onclick = () => editPet(petId);
  deleteCell.appendChild(editButton);
  return deleteCell;
}

const getCreateDate = () => {
  const date = new Date();
  const dateCreate = date.getDate().toString().padStart(2, '0');
  const monthCreate = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearCreate = date.getFullYear();

  return `${dateCreate}/${monthCreate}/${yearCreate}`;
}

const createFragmentContent = (pet) => {
  const row = document.createElement('tr');
  const page = window.location.pathname.split('/').pop();

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
  if (page === 'index.html') {
    row.appendChild(createDeleteButton(pet.id));
  } else if (page === 'edit.html') {
    row.appendChild(createEditButton(pet.id));
  }
  return row;
};

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
    const row = createFragmentContent(pet);
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
    if (pet.dewormed && pet.sterilized && pet.vaccinated) {
      const row = createFragmentContent(pet);
      fragment.appendChild(row);
    }
  });

  tableBodyEl.innerHTML = ``;
  tableBodyEl.appendChild(fragment);
}

const deletePet = (petId) => {
  if (petList.hasOwnProperty(petId)) {
    delete petList[petId];
    localStorage.setItem('petList', JSON.stringify(petList));
    renderTableData();
  }
}

const editPet = (petId, dataEdited) => {
  if (petList.hasOwnProperty(petId)) {
    // delete petList[petId];


    // localStorage.setItem('petList', JSON.stringify(petList));
    renderTableData();
  }
}

export {
  createTablehead,
  createCell,
  createIconCell,
  createColorCell,
  createDeleteButton,
  getCreateDate,
  renderTableData,
  renderTableDataHealthyPet,
};