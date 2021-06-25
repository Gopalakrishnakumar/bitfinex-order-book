import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/actions";
import socketRegister from "../../websocketMiddleware";
import BarComponent from "../bar/bar.component";
import ChartConfigComponent from "../chart-config/chart-config.component";
import ChartComponent from "../chart/chart.component";
import LoadingSpinnerComponent from "../loading-spinner/loading-spinner.component";
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
            showModal: false,
            zoomFactor: 1
        }
    }

    componentDidMount() {
        this.socket = socketRegister(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.precision !== this.props.precision) {
            this.socket && this.socket.close();
            this.props.clearSnapshot();
            this.socket = socketRegister(this.props);
        }
    }

    onPrecisionControlClick = (flag) => {
        if ((flag && this.props.precision < 4) || (!flag && this.props.precision > 0)) {
            this.props.setPrecision(flag);
        }
    }

    render() {
        let sortedBids = Object.entries(this.props.bids)?.sort((a, b) => a[1].order - b[1].order);
        let sortedAsks = Object.entries(this.props.asks)?.sort((a, b) => a[1].order - b[1].order);
        return <>
            <nav><span className='logo'>Book Tracker</span></nav>
            <div className='container'>
                <div className='order-container'>
                    <div className='bar'>
                        <span className='header'>Order Book BTC/USD</span>
                        <i className='bi bi-zoom-in' title='Zoom in book depth visualization' onClick={() => this.setState({ zoomFactor: this.state.zoomFactor + 0.2 })}></i>
                        <i className='bi bi-zoom-out' onClick={() => this.setState({ zoomFactor: this.state.zoomFactor - 0.2 })} title='Zoom out book depth visualization'></i>
                        <i className='bi bi-gear-fill' onClick={() => this.setState({ showModal: true })} title='Interface Settings'></i>
                        <i className={`bi bi-plus large ${this.props.precision === 0 ? 'disabled' : ''}`} title='Increase Precision' onClick={this.onPrecisionControlClick.bind(this, false)}></i>
                        <i className={`bi bi-minus large ${this.props.precision === 4 ? 'disabled' : ''}`} title='Decrease Precision' onClick={this.onPrecisionControlClick.bind(this, true)}>-</i>
                    </div>
                    <div className='book-container'>
                        <div className='charts-container'>
                            <div className='chart left-chart'>
                                {(sortedBids?.length === 0 || !sortedBids) && <LoadingSpinnerComponent />}
                                {sortedBids?.map(el => <BarComponent id={el[0]} value={el[1][this.props.chartProp]} maxValue={this.props.maxBid} color='green' key={'left-bar-' + el[0]} zoomFactor={this.state.zoomFactor} />)}
                            </div>
                            <div className='chart right-chart'>
                                {(sortedAsks?.length === 0 || !sortedAsks) && <LoadingSpinnerComponent />}
                                {sortedAsks?.map(el => <BarComponent id={el[0]} value={el[1][this.props.chartProp]} maxValue={this.props.maxAsk} color='red' key={'right-bar-' + el[0]} zoomFactor={this.state.zoomFactor} />)}
                            </div>
                        </div>
                        <div className='table-container'>
                            <TableComponent id='table-1' columns={this.columns[this.props.columnOrder]} data={sortedBids.map(el => ({ price: el[0], ...el[1] }))} reverse={false} key='table-1' keyColumn='price' />
                            <TableComponent id='table-2' columns={this.columns[this.props.columnOrder]} data={sortedAsks.map(el => ({ price: el[0], ...el[1] }))} reverse={true} key='table-2' keyColumn='price' />
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
                <ChartConfigComponent />
            </ModalComponent>}
        </>
    }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    updateAsk: data => dispatch(actions.updateAsk(data)),
    updateBid: data => dispatch(actions.updateBid(data)),
    setSocketStatus: data => dispatch(actions.setSocketStatus(data)),
    addSnapshot: data => dispatch(actions.addSnapshot(data)),
    setPrecision: data => dispatch(actions.setPrecision(data)),
    clearSnapshot: () => dispatch(actions.clearSnapshot())
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);