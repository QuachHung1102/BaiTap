'use strict';
import { breedList, petList } from './data.js';

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
const formEditEl = getEleById(`formEdit-modal`);
const tableBodyEl = getEleById(`tbody`);
const breedTypeSeclectEl = getEleById(`input-type`);
const breedSelectEl = getEleById(`input-breed`);
const breedSelectElEdit = getEleById(`input-breed-edit`);

const renderBreeds = (type) => {
  const page = window.location.pathname.split('/').pop();
  if (page === 'edit.html') {
    if (type === 'dog') {
      breedSelectElEdit.innerHTML = ``;
      breedList.Dog.forEach((breed) => {
        breedSelectElEdit.appendChild(createBreedOption(breed));
      })
    } else if (type === 'cat') {
      breedSelectElEdit.innerHTML = ``;
      breedList.Cat.forEach((breed) => {
        breedSelectElEdit.appendChild(createBreedOption(breed));
      })
    }
  } else {
    if (type === 'dog') {
      breedSelectEl.innerHTML = ``;
      breedList.Dog.forEach((breed) => {
        breedSelectEl.appendChild(createBreedOption(breed));
      })
    } else if (type === 'cat') {
      breedSelectEl.innerHTML = ``;
      breedList.Cat.forEach((breed) => {
        breedSelectEl.appendChild(createBreedOption(breed));
      })
    }
  }

}

const createBreedOption = (breed) => {
  const option = document.createElement('option');
  option.value = breed;
  option.textContent = breed;
  return option;
}

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
  cell.style.textAlign = 'center';
  const icon = document.createElement('i');
  icon.className = `bi bi-${iconClass}-circle-fill`;
  cell.appendChild(icon);
  return cell;
}

const createColorCell = (color) => {
  const colorCell = document.createElement('td');
  colorCell.style.textAlign = 'center';
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
  editButton.onclick = () => addEditPetValue(petId);
  deleteCell.appendChild(editButton);
  return deleteCell;
}

const createDeleteBreedButton = (breed, breedType) => {
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteBreed(breed, breedType);
  deleteCell.appendChild(deleteButton);
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
  if (page === 'index.html' || page === '') {
    row.appendChild(createDeleteButton(pet.id));
  } else if (page === 'edit.html') {
    row.appendChild(createEditButton(pet.id));
  }
  return row;
};

const createFragmentContentBreeds = (breed, index) => {
  const row = document.createElement('tr');
  row.appendChild(createCell(++index));
  row.appendChild(createCell(breed.breed));
  row.appendChild(createCell(breed.type));
  row.appendChild(createDeleteBreedButton(breed.breed, breed.type));

  return row;
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

const renderTableData = (petarr) => {
  const petArr = Object.values(petarr);
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

const renderTableDataHealthyPet = (petarr) => {
  const petArr = Object.values(petarr);
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

const renderTableDataBreeds = (breedList) => {
  tableBodyEl.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  if (!breedList.Dog && !breedList.Cat) {
    tableBodyEl.appendChild(fragment);
  } else {
    const breedArr = Object.entries(breedList).flatMap(([type, breeds]) => {
      return breeds.map((breed) => {
        return {
          type: type,
          breed: breed
        }
      }).sort((a, b) => {
        return a.breed.localeCompare(b.breed);
      });
    });

    breedArr.forEach((breed, index) => {
      const row = createFragmentContentBreeds(breed, index);
      fragment.appendChild(row);
    });
    tableBodyEl.appendChild(fragment);
  }
}

const deletePet = (petId) => {
  if (petList.hasOwnProperty(petId)) {
    delete petList[petId];
    localStorage.setItem('petList', JSON.stringify(petList));
    renderTableData(petList);
  }
}

const deleteBreed = (breed, breedType) => {
  const breedIndex = breedList[breedType].indexOf(breed);
  if (breedIndex !== -1) {
    breedList[breedType].splice(breedIndex, 1)
    localStorage.setItem('breedList', JSON.stringify(breedList));
    renderTableDataBreeds(breedList);
  } else {
    window.alert(`Can't find breed: ${breed}`);
  }
}

const addEditPetValue = (petId) => {
  if (petList.hasOwnProperty(petId)) {
    const pet = petList[petId];
    getEleById('input-id-edit').value = pet.id;
    getEleById('input-name-edit').value = pet.name;
    getEleById('input-age-edit').value = pet.age;
    getEleById('input-type-edit').value = pet.type.toLowerCase();
    getEleById('input-weight-edit').value = pet.weight;
    getEleById('input-length-edit').value = pet.length;
    getEleById('input-breed-edit').value = pet.breed.at(0).toUpperCase() + pet.breed.slice(1);
    getEleById('input-color-1-edit').value = pet.color;
    getEleById('input-vaccinated-edit').checked = pet.vaccinated;
    getEleById('input-dewormed-edit').checked = pet.dewormed;
    getEleById('input-sterilized-edit').checked = pet.sterilized;
    formEditEl.classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
    // delete petList[petId];
    // localStorage.setItem('petList', JSON.stringify(petList));
    // renderTableData(petList);
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
  renderTableDataBreeds,
  renderBreeds,
};