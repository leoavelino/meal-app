import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
    return (
        <div className="topbar">
            <div className="topbar__links">
                <Link style={{fontSize: '20px', paddingRight: '6vw'}} to="/">Home</Link>
                <Link style={{fontSize: '20px'}} to="/login">Login</Link>
            </div>
        </div>
    )
}

export default TopBar