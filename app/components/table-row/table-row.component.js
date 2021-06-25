import React from 'react';

const TableRow = (props) => {
    return <div className={`row ${props.class || ''}`} key={'element-' + props.id}>
        {props.columns?.map(col => <div className='col-md-3' key={props.id + col.id}>{props.data ? props.data[col.id] : col.name}</div>)}
    </div>
}

export default React.memo(TableRow);