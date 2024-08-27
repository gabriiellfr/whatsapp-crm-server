const axiosInstance = require('axios');

const WA_SESSION_MANAGER_URL = process.env.WA_SESSION_MANAGER_URL;

const axios = axiosInstance.create({
    baseURL: WA_SESSION_MANAGER_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

module.exports = {
    axios,
};
