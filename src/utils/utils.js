const axios = require('axios');

const getData = async (url) => {
    try {
        return response = await axios(url);
    } catch (e) {
        console.log('Server is not available');
    }
}

module.exports = {
    getData
}