import axios from 'axios';
import urls from '../constants/urls';

const instance = axios.create({
    baseURL: urls.baseUrl,
});

instance.interceptors.request.use(
    config => {
        config.timeout = 5000;
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'JWT ' + token;
        } else {
            config.headers['Authorization'] = null;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['accept'] = 'application/json';
        return config;
    },
    error => {
        const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === urls.baseUrl + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return instance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response: { data: { access: string; refresh: string; }; }) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							instance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return instance(originalRequest);
						})
						.catch((err: any) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		return Promise.reject(error);
    }
);

export default instance;
