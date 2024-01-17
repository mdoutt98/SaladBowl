// controllers/wordController.js

const jsonDataManager = require('../utils/jsonDataManager');

const getWords = (req, res) => {
    const data = jsonDataManager.readData();
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ message: 'Error fetching data' });
    }
};

module.exports = {
    getWords
};
