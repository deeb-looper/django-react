import React from 'react';
import { useClient } from '../client';
import { UserParams, AuthParams } from '../../../common/domain/entities/user';

export type AuthHooks = {
    useAuthAction(): {
        registerUser: (user: UserParams) => Promise<Object | undefined>;
        loginUser: (user: { email: string, password: string }) => Promise<AuthParams | undefined>;
        logoutUser: () => Promise<Object | undefined>;
    };
    useAuthState: {
        isLoggedIn: boolean;
        currentUser: { id: string; email: string; user_name: string  };
        setCurrentUser: (currentUser?: Object) => void;
        setIsLoggedIn: (isLoggedIn: boolean) => void;
    };
};

export const AuthHooksContext = React.createContext<AuthHooks | null>(
    null,
);

export const useAuthAction: AuthHooks['useAuthAction'] = () => {
    const client = useClient(AuthHooksContext);
    return client.useAuthAction();
};

export const useAuthState = (): AuthHooks['useAuthState'] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const client = useClient(AuthHooksContext);
    return client.useAuthState;
};

