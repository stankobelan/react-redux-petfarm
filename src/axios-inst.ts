import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:5001/api'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;
