import React from 'react'
import { Card, Button, Input } from 'react-rainbow-components'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="login">
            <Card
                className="login-card"
                title={
                    <span className="login-title">
                        Login
                    </span>
                }
            >
                <div style={{margin: '15px'}}>
                    <Input
                        label="Email address"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                    />
                    <Input
                        label="Password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                    />
                    <Button
                        className="rainbow-m-around_medium"
                        label="Login"
                        variant="brand"
                        style={{ width: '268px' }}
                    />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to="/signup">Create an account</Link>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}

export default Login