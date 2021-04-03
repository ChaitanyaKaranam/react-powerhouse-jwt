import React from 'react';
import { useUserDetails } from '../context/UserContext';

function Home(props) {
    const { userDetails } = useUserDetails();

    return (
        <div>
            <h2>This is home page</h2>
            <pre>{JSON.stringify(userDetails)}</pre>
        </div>
    );
}

export default Home;
