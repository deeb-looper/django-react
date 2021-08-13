import { useCallback } from 'react';
import axios from '../../../config/axios';
import { AuthHooks } from '../index';
import urls from '../../../constants/urls';
import { UserParams } from '../../../../common/domain/entities/user';

export const useAuthAction: AuthHooks['useAuthAction'] = () => {
    const registerUser = useCallback(
        async (user: UserParams) => {
            console.log(user, 'user');
            try {
                const res = await axios.post(`${urls.auth.register}`, user);
                return res.data;
            } catch (e) {
                console.log( e.response )
                throw new Error(e);
            }
        },
        [],
    );

    const loginUser = useCallback(
        async (user: { email: string, password: string }) => {
            try {
                const res = await axios.post(`${urls.auth.login}`, user);
                localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axios.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                return res.data;
            } catch (e) {
                console.log( e.response )
                throw new Error(e);
            }
        },
        [],
    );

    const logoutUser = useCallback(
        async () => {
            try {
                const refreshToken= localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const res = await axios.post(`${urls.auth.logout}`, { refresh_token: refreshToken });
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    axios.defaults.headers['Authorization'] = null;
                    return res.data;
                }
            } catch (e) {
                console.log( e.response )
                throw new Error(e);
            }
        },
        [],
    );

    return {
        registerUser,
        loginUser,
        logoutUser,
    };
};
