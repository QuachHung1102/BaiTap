'use strict';

const saveDynamicDataToFile = (data, fileName) => {
  try {
    var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
    console.log(`Data saved to file: ${fileName}`);
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
};

export { saveDynamicDataToFile };
