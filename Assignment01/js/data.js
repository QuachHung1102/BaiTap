'use strict';

const petList = {
  '1': {
    id: "1",
    name: "Bob",
    age: 3,
    type: "Dog",
    weight: "30",
    length: "50",
    color: "#000000",
    breed: "Rottweiler",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: `1 tỉ`,
    dateCreate: "2023/09/12",
  },
  '2': {
    id: "2",
    name: "Poppy",
    age: 5,
    type: "Dog",
    weight: "20",
    length: "40",
    color: "#ffffff",
    breed: "Rottweiler",
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    bmi: `10 tỉ`,
    dateCreate: "2023/09/12",
  },
  '3': {
    id: "3",
    name: "Harry",
    age: 3,
    type: "Dog",
    weight: "8",
    length: "30",
    color: "#ffff00",
    breed: "Shiba",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: `100`,
    dateCreate: "2023/09/12",
  },
};

const breedList = {
  Dog: ['Terrier', 'Greyhound', 'Rottweiler'],
  Cat: ['Tabby', 'Domestic Medium Hair', 'Mixed Breed', 'Domestic Short Hair', 'Persian']
};

// checkData để validate 

const checkId = (id) => {
  let flag = true;
  if (Object.keys(petList).length > 0) {
    const arrPetList = Object.values(petList);
    flag = !arrPetList.some((pet) => pet.id == id);
    console.log(flag);
  }
  return flag;
}

export const findPetWithInfo = (findData) => {
  const arrPetList = Object.values(petList);
  const result = arrPetList.filter((pet) => {
    return (findData.id ? pet.id.includes(findData.id) : true) &&
      (findData.name ? pet.name.toLowerCase().includes(findData.name.toLowerCase()) : true) &&
      (findData.type ? pet.type == findData.type : true) &&
      (findData.breed ? pet.breed == findData.breed : true) &&
      ((pet.vaccinated == findData.vaccinated && pet.dewormed == findData.dewormed && pet.sterilized == findData.sterilized)
        ? (pet.vaccinated == findData.vaccinated && pet.dewormed == findData.dewormed && pet.sterilized == findData.sterilized)
        : true
      );
  });
  return result;
}

export const checkData = (data) => {
  console.log(data); // In ra dữ liệu nhập vào( là data chưa qua xủ lý)
  let flag = Object.values(data).every(value => {
    if (typeof (value) === 'boolean') {
      return true;
    }
    return value !== null && value !== undefined && value !== '';
  });

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

if (typeof (Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
  const data = localStorage.getItem('petList');
  const breedData = localStorage.getItem('breedList');
  console.log(`localStorage is available!`);
  data ? Object.assign(petList, JSON.parse(data)) : localStorage.setItem('petList', JSON.stringify(petList));
  breedData ? Object.assign(breedList, JSON.parse(breedData)) : localStorage.setItem('breedList', JSON.stringify(breedList));
  console.log("pet list:" + localStorage.getItem('petList'));
  console.log("breed list:" + localStorage.getItem('breedList'));
  // localStorage.removeItem('petList');
  // localStorage.removeItem('breedList');
} else {
  // Sorry! No Web Storage support..
  console.log(`localStorage is not available!`);
}

export {
  petList,
  breedList,
};