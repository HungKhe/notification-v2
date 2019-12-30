import React from 'react';

const Loading = () => {
    return(
        <div className="lineLoading">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading;