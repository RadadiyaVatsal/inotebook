import React, { useContext, useEffect } from 'react';
import AlertContext from '../contexts/alertContext';

const Alert = () => {
    const context = useContext(AlertContext);
    const { msg, type, updateMsg } = context;

    return (
        <>
            {msg && (
                <div className={`alert alert-${type} fixed-top` } role="alert">
                    {msg}
                </div>
            )}
        </>
    );
};

export default Alert;
