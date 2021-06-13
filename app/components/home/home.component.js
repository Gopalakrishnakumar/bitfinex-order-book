import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/actions";
import ChartComponent from "../chart/chart.component";
import ModalComponent from "../modal/modal.component";
import TableComponent from "../table/table.component";
import './home.component.scss';

class HomeComponent extends React.Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.columns = {
            order1: [
                { name: 'Count', id: 'count' },
                { name: 'Amount', id: 'amount' },
                { name: 'Total', id: 'total' },
                { name: 'Price', id: 'price' }
            ],
            order2: [
                { name: 'Count', id: 'count' },
                { name: 'Price', id: 'price' },
                { name: 'Amount', id: 'amount' },
                { name: 'Total', id: 'total' }
            ],
            order3: [
                { name: 'Count', id: 'count' },
                { name: 'Total', id: 'total' },
                { name: 'Price', id: 'price' },
                { name: 'Amount', id: 'amount' }
            ]
        };
        this.state = {
            chartProp: 'total',
            columnOrder: 'order1'
        };
    }

    componentDidMount() {
        this.props.greet();
    }

    onChartPropClick = (e) => {
        this.setState({ chartProp: e.target.value });
    }

    onColumnOrderClick = (e) => {
        this.setState({ columnOrder: e.target.value });
    }

    render() {
        let sortedBids = Object.entries(this.props.bids)?.sort((a, b) => a[1].order - b[1].order);
        let sortedAsks = Object.entries(this.props.asks)?.sort((a, b) => a[1].order - b[1].order);
        return <>
            <h3>{this.props.message}</h3>
            <div className='container'>
                <div className='order-container'>
                    <div className='bar'>
                        <span className='header'>Order Book BTC/USD</span>
                        <i className='bi bi-gear-fill' onClick={() => this.setState({ showModal: true })} title='Interface Settings'></i>
                    </div>
                    <div className='chart-container'>
                        <ChartComponent key='bid' id='bid' data={sortedBids?.map(el => el[1][this.state.chartProp])} color={'green'} height={484} width={400} swap={false} />
                        <ChartComponent key='ask' id='ask' data={sortedAsks?.map(el => el[1][this.state.chartProp])} color={'red'} height={484} width={400} swap={true} />
                        <div className='table-container'>
                            <TableComponent columns={this.columns[this.state.columnOrder]} data={sortedBids.map(el => ({ price: el[0], ...el[1] }))} reverse={false} />
                            <TableComponent columns={this.columns[this.state.columnOrder]} data={sortedAsks.map(el => ({ price: el[0], ...el[1] }))} reverse={true} />
                        </div>
                    </div>
                    <div className='bar status-bar'>
                        <div style={{ float: "right" }}>
                            {this.props.socketStatus === 1 && 'Online' || this.props.socketStatus === -1 && 'offline' || 'Connecting'}
                            <i className={'bi bi-circle-fill ' + (this.props.socketStatus === 1 && 'online' || this.props.socketStatus === -1 && 'offline' || 'reconnect')}></i>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.showModal && <ModalComponent title={'Configuration'} onClose={() => this.setState({ showModal: false })}>
                <div className='config'>
                    <h5>Book Depth Visualization:</h5>
                    <input id='total' type='radio' value='total' name='chartProp' onChange={this.onChartPropClick} checked={this.state.chartProp === 'total'} />
                    <label htmlFor='total'>Cumulative (default)</label><br />
                    <input id='amount' type='radio' value='amount' name='chartProp' onChange={this.onChartPropClick} checked={this.state.chartProp === 'amount'} />
                    <label htmlFor='amount'>Amount</label><br /><br />
                    <h5>Column Order:</h5>
                    <input id='order1' type='radio' value='order1' name='columnOrder' onChange={this.onColumnOrderClick} checked={this.state.columnOrder === 'order1'} />
                    <label htmlFor='order1'><span className='text-success'>Count Amount Total Price</span> <span className='text-danger'>Price Total Amount Count</span></label><br />
                    <input id='order2' type='radio' value='order2' name='columnOrder' onChange={this.onColumnOrderClick} checked={this.state.columnOrder === 'order2'} />
                    <label htmlFor='order2'><span className='text-success'>Count Price Amount Total</span> <span className='text-danger'>Total Amount Price Count</span></label><br />
                    <input id='order3' type='radio' value='order3' name='columnOrder' onChange={this.onColumnOrderClick} checked={this.state.columnOrder === 'order3'} />
                    <label htmlFor='order3'><span className='text-success'>Count Total Price Amount</span> <span className='text-danger'>Amount Price Total Count</span></label><br />
                </div>
            </ModalComponent>}
        </>
    }
}

const mapStateToProps = state => ({ message: state.message, socketStatus: state.socketStatus, bids: state.bids, asks: state.asks });
const mapDispatchToProps = dispatch => ({
    greet: () => dispatch(actions.greet())
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);