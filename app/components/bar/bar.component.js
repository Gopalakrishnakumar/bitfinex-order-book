import React from "react";
import './bar.component.scss';

const BarComponent = (props) => {
    return <div className='chart-bar' style={{ width: ((props.value * 100 * (props.zoomFactor || 1) / props.maxValue || 0) + '%'), backgroundColor: props.color || 'green' }} key={'chart-bar-' + props.id}></div>
}

export default React.memo(BarComponent);