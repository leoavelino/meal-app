import React from 'react'
import { Card, Button, Input } from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Notification from '../components/notification/Notification'
import AppContext from '../context/AppContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const url = 'https://api.meetplan.ml/api/v1/auth/login'
    // const url = 'http://localhost:3001/api/v1/auth/login'
    const {authContext, setAuthContext} = React.useContext(AppContext)
    const history = useHistory()
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()
    
    const [notification, setNotification] = React.useState({show: false, message: ''})

    const onUsernameInputChange = (evt) => setUsername(evt.target.value)
    const onPasswordInputChange = (evt) => setPassword(evt.target.value)
    const onLogin = () => {
        axios.post(url, {
            name: username,
            password
        }).then(((response) => {
            console.log(response)
            if (response.data && response.data.code === 'NotAuthorizedException') {
                setAuthContext({...authContext, isLoggedIn: false})
                throw new Error('NotAuthorizedException')
            }
            setAuthContext({...authContext, token: response.data, username: username, isLoggedIn: true})
            history.push("/");
        })).catch(err => {
            setNotification({show: true, message: err})
        })
    }
    React.useEffect(() => {
        if (notification.show) {
            setTimeout(() => setNotification({...notification, show: false}), 10000)
        }
    }, [notification])
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
                        label="Username"
                        type="email"
                        onChange={onUsernameInputChange}
                        // value={username}
                        required
                        placeholder="Enter your username"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                    />
                    <Input
                        label="Password"
                        type="password"
                        onChange={onPasswordInputChange}
                        required
                        placeholder="Enter your password"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                    />
                    <Button
                        onClick={onLogin}
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
            {notification.show && <Notification message={notification.message.toString()} notificationType="error" />}
        </div>
    )
}

export default Login