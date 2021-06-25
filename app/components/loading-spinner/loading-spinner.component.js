import React from "react";
import './loading-spinner.component.scss';

const LoadingSpinnerComponent = () => {
    return <div className='spinner'>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <span>Loading...</span>
    </div>
}

export default LoadingSpinnerComponent;