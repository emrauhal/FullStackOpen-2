import React from 'react';

// ilmoitus onnistuneesta tapahtumasta
export const Notification = ({message}) => {
    
    if (message === null) {
        return null
    }
    return (
        <div className='info'>
            {message}
        </div>
    )
}

// ilmoitus virheen sattuessa
export const ErrorNotification = ({message}) => {

    if (message === null) {
        return null
    }
    return (
        <div className='error'>
            {message}
        </div>
    )
}