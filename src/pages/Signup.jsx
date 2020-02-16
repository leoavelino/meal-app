import React from 'react';
import { Card, Button, Input } from 'react-rainbow-components';
import _ from 'lodash';
import axios from 'axios';
import Notification from '../components/notification/Notification';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const url = 'https://api.meetplan.ml/api/v1/auth/register';
    // const url = 'http://localhost:3001/api/v1/auth/register';

    const [username, setUsername] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordConfirmation, setPasswordConfirmation] = React.useState();

    const [notification, setNotification] = React.useState({ show: false, message: '', type: null });

    const history = useHistory();

    const onSignup = () => {
        axios.post(url, {
            name: username,
            email,
            password
        }).then(((response) => {
            console.log(response);
            if (response.data && response.data.code) {
                throw new Error(response.data.message);
            }
            setNotification({ show: true, message: `A confirmation email was sent to: ${email}` });
            history.push("/login");
        })).catch(err => {
            console.log(err)
            setNotification({ show: true, message: err, type: "error" });
        });
    };

    const isValid = () => {
        const isPasswordValid = () => {
            if (_.isEqual(password, passwordConfirmation) && password.length >= 8) {
                return true;
            }
            return false;
        };

        if (!_.isNil(password) && !_.isNil(email) && isPasswordValid()) {
            return true;
        }
        return false;
    };

    React.useEffect(() => {
        if (notification.show) {
            setTimeout(() => setNotification({ ...notification, show: false }), 10000);
        }
    }, [notification]);

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
                <div style={{ margin: '15px' }}>
                    <Input
                        label="Username"
                        type="text"
                        required
                        placeholder="Enter your username"
                        className="rainbow-p-around_medium"
                        style={{ width: '300px' }}
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
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
                        onClick={onSignup}
                        label="Login"
                        disabled={!isValid()}
                        variant="brand"
                        style={{ width: '268px' }}
                    />
                </div>

            </Card>
            {notification.show && <Notification message={notification.message.toString()} notificationType={notification.type} />}
        </div>
    );
};

export default Signup;