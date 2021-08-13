import React from 'react';

type Props = {
    fallback: (error?: Error) => React.ReactChild;
};

type State = {
    hasError: boolean;
    error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
    state = { hasError: false, error: undefined };
    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }

    render() {
        const { hasError, error } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            return fallback(error);
        }

        return children;
    }
}
