import React from "react"
import { connect } from "react-redux"
import actions from "../../actions/actions"

const BookConfigComponent = (props) => {
    const onChartPropClick = (e) => {
        props.changeChartProp(e.target.value);
    }

    const onColumnOrderClick = (e) => {
        props.changeColumnOrder(e.target.value);
    }

    return <div className='config'>
        <h5>Book Depth Visualization:</h5>
        <input id='total' type='radio' value='total' name='chartProp' onChange={onChartPropClick} checked={props.chartProp === 'total'} />
        <label htmlFor='total'>Cumulative (default)</label><br />
        <input id='amount' type='radio' value='amount' name='chartProp' onChange={onChartPropClick} checked={props.chartProp === 'amount'} />
        <label htmlFor='amount'>Amount</label><br /><br />
        <h5>Column Order:</h5>
        <input id='order1' type='radio' value='order1' name='columnOrder' onChange={onColumnOrderClick} checked={props.columnOrder === 'order1'} />
        <label htmlFor='order1'><span className='text-success'>Count Amount Total Price</span> <span className='text-danger'>Price Total Amount Count</span></label><br />
        <input id='order2' type='radio' value='order2' name='columnOrder' onChange={onColumnOrderClick} checked={props.columnOrder === 'order2'} />
        <label htmlFor='order2'><span className='text-success'>Count Price Amount Total</span> <span className='text-danger'>Total Amount Price Count</span></label><br />
        <input id='order3' type='radio' value='order3' name='columnOrder' onChange={onColumnOrderClick} checked={props.columnOrder === 'order3'} />
        <label htmlFor='order3'><span className='text-success'>Count Total Price Amount</span> <span className='text-danger'>Amount Price Total Count</span></label><br />
    </div>
}
const mapStateToProps = state => ({ chartProp: state.chartProp, columnOrder: state.columnOrder });

const mapDispatchToProps = dispatch => ({
    changeChartProp: data => dispatch(actions.changeChartProp(data)),
    changeColumnOrder: data => dispatch(actions.changeColumnOrder(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookConfigComponent);