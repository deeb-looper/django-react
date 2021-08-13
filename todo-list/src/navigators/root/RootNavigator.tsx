import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthState } from '../../hooks/auth';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { LoginPage } from '../../components/page/Login';
import { RegisterPage } from '../../components/page/Register';
import { MainPage } from '../../components/page/Main';

const ProtectedRoutes = () => (
	<Routes>
		<Route path="/*" element={<Navigate to="/main" />} />
		<Route path="/main" element={<MainPage />} />
	</Routes>
);

const UnprotectedRoutes = () => (
	<Routes>
		<Route path="/*" element={<Navigate to="/login" />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
	</Routes>
); 

const Navigator = () => {
	const { isLoggedIn, setIsLoggedIn } = useAuthState();
	// TODO: Temporarily use localstorage
	const accessToken = localStorage.getItem('access_token');
	const refreshToken = localStorage.getItem('refresh_token');

	useEffect(() => {
		if (accessToken) {
			setIsLoggedIn(true);
		}
		if (!refreshToken || !accessToken) {
			setIsLoggedIn(false);
		}
	}, [accessToken, refreshToken, setIsLoggedIn]);

	return (
		<ErrorBoundary
			fallback={error => {
				return <div>ERROR!!! {error?.message}</div>;
			}}>
			<BrowserRouter>
				{isLoggedIn ? <ProtectedRoutes /> : <UnprotectedRoutes />}
			</BrowserRouter>
		</ErrorBoundary>
	);
};

const RootNavigator = (): React.ReactElement => {
    return (
        <React.Suspense fallback={null}>
            <Navigator />
        </React.Suspense>
    );
};

export default RootNavigator;
