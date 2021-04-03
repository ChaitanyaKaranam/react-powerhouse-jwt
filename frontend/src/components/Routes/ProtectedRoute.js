import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserDetails } from '../../context/UserContext';

function ProtectedRoute({ children, ...rest }) {
    const { userDetails } = useUserDetails();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return userDetails ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location,
                            },
                        }}
                    />
                );
            }}
        />
    );
}

export default ProtectedRoute;
