import React from 'react';
import './modal.component.scss';

export default class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    }
}