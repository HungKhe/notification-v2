import React from 'react';
const Snackbar = props => {
    const { error, message } = props;
    return(
        <div className={`pageSnackbar ${ message && message !== '' ? 'openSnackbar' : ''} ${ error ? 'error' : '' }`}>
            <div className="snackText">
                { message }
            </div>
        </div>
    )
}
export default Snackbar;