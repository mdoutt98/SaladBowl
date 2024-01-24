// utils/jsonDataManager.js

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'words.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return null;
    }
};

// Add more functions for updating data if needed

module.exports = {
    readData
};
