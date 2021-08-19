/* eslint-disable no-param-reassign */
import axios from 'axios';
import urls from '../constants/urls';

const instance = axios.create({
    baseURL: urls.baseUrl,
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = null;
        config.headers['Content-Type'] = 'application/json';
        config.headers.accept = 'application/json';
        return config;
    },
    (error: any) => Promise.reject(error),
);

export default instance;
