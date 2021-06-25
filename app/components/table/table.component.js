import React from "react";
import TableRowComponent from "../table-row/table-row.component";
import './table.component.scss';

export default class TableComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='grid'>
            <TableRowComponent id={this.props.id + '-headerRow'} class='header' columns={this.props.reverse && this.props.columns?.slice().reverse() || this.props.columns} key='headerRow' />
            {this.props.data?.map(row => <TableRowComponent data={row} columns={this.props.reverse && this.props.columns?.slice().reverse() || this.props.columns} key={`${this.props.id}-row-${row[this.props.keyColumn]}`} id={`${this.props.id}-row-${row[this.props.keyColumn]}`} />)}
        </div>
    }
}