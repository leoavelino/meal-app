import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const TopBar = () => {
    const { authContext } = useContext(AppContext);
    return (
        <div className="topbar">
            <div className="topbar__links">
                <Link style={{ fontSize: '20px', paddingRight: '6vw' }} to="/">Home</Link>
                {authContext.isLoggedIn ?
                    <span style={{ fontSize: '20px' }}>Hello, {authContext.username}!</span>
                    :
                    <Link style={{ fontSize: '20px' }} to="/login">Login</Link>}
            </div>
        </div>
    );
};

export default TopBar;