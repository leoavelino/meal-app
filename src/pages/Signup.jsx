import React from 'react'
import { Card, Button, Input } from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const Signup = () => {

    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [passwordConfirmation, setPasswordConfirmation] = React.useState()


    const isValid = () => {
        const isPasswordValid = () => {
            if (_.isEqual(password, passwordConfirmation) && password.length >= 8) {
                return true
            }
            return false
        }

        if (!_.isNil(password) && !_.isNil(email) && isPasswordValid()) {
            return true
        }
        return false
    }

    return (
        <div className="login">
            <Card
                className="login-card"
                title={
                    <span className="login-title">
                        Create an account
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
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        required
                        value={password}
                        placeholder="Enter your password"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                    <Input
                        label="Repeat password"
                        type="password"
                        value={passwordConfirmation}
                        required
                        placeholder="Enter your password again"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                        onChange={(evt) => setPasswordConfirmation(evt.target.value)}
                    />
                    <Button
                        className="rainbow-m-around_medium"
                        label="Login"
                        disabled={!isValid()}
                        variant="brand"
                        style={{ width: '268px' }}
                    />
                </div>
                
            </Card>
        </div>
    )
}

export default Signup