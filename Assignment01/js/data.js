const petList = {
  // '1': {
  //   id: "1",
  //   name: "Bob",
  //   age: 3,
  //   type: "dog",
  //   weight: "30",
  //   length: "50",
  //   color: "#000000",
  //   breed: "Rottweiler",
  //   vaccinated: true,
  //   dewormed: true,
  //   sterilized: true,
  //   bmi: `1 tỉ`,
  //   dateCreate: "2023-09-12",
  // },
  // '2': {
  //   id: "2",
  //   name: "Poppy",
  //   age: 5,
  //   type: "dog",
  //   weight: "20",
  //   length: "40",
  //   color: "#ffffff",
  //   breed: "Rottweiler",
  //   vaccinated: true,
  //   dewormed: true,
  //   sterilized: false,
  //   bmi: `10 tỉ`,
  //   dateCreate: "2023-09-12",
  // },
  // '3': {
  //   id: "3",
  //   name: "Harry",
  //   age: 3,
  //   type: "dog",
  //   weight: "8",
  //   length: "30",
  //   color: "#ffff00",
  //   breed: "Shiba",
  //   vaccinated: true,
  //   dewormed: true,
  //   sterilized: true,
  //   bmi: `100`,
  //   dateCreate: "2023-09-12",
  // },
};

// checkData để validate 
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
  console.log(`localStorage is available!`);
  data ? Object.assign(petList, JSON.parse(data)) : localStorage.setItem('petList', JSON.stringify(petList));
  console.log("pet list:" + localStorage.getItem('petList'));
  // localStorage.removeItem('petList');
} else {
  // Sorry! No Web Storage support..
  console.log(`localStorage is not available!`);
}

export { petList };