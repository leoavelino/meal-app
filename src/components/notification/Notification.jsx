import React from 'react';
import { Notification } from 'react-rainbow-components';
import _ from 'lodash'

const NotificationError = ({ message, notificationType }) => (
    <div className="rainbow-p-bottom_x-small">
        <Notification
            style={{top: '5%', right: '5%', position: 'absolute'}}
            title={notificationType === 'info' ? 'Info' : _.capitalize(notificationType)}
            description={message}
            icon={notificationType || 'info'}
        /></div>
);

export default NotificationError;