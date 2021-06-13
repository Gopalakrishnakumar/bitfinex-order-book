import React from "react";
import './table.component.scss';

export default class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: []
        }
    }

    componentDidMount() {
        this.initColumns();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.columns !== this.props.columns) {
            this.initColumns();
        }
    }

    initColumns() {
        if (this.props.columns) {
            let columns = [...this.props.columns];
            if (this.props.reverse) {
                columns = columns.reverse();
            }
            this.setState({ columns });
        }
    }

    render() {
        return <div className='grid'>
            <div className='row header' key='headerRow'>
                {this.state.columns?.map(el => <div className='col-md-3' key={el.id}>{el.name}</div>)}
            </div>
            {this.props.data?.map(row => <div className='row' key={'price-' + row.price}>
                {this.state.columns?.map(col => <div className='col-md-3' key={col.id}>{row[col.id]}</div>)}
            </div>)}
        </div>
    }
}