import React, { useState } from 'react';
import { AuthHooksContext } from '.';
import * as combinedAuthHooks from './combined';

const AuthProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const useAuthState = {
        isLoggedIn,
        currentUser,
        setIsLoggedIn,
        setCurrentUser
    };

    const combinedValues = {
        useAuthState,
        ...combinedAuthHooks,
    }

    return (
        <AuthHooksContext.Provider
            value={combinedValues}
            {...props}
        />

    );
};

export default AuthProvider;
