import React, { useContext, useState } from 'react';

export const UserContext = React.createContext();

export function useUserDetails() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
}
