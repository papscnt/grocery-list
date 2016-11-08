import React from 'react';
import AppActions from '../actions/app-actions';

class ClearAllItemsButton extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        AppActions.clearAllItems();
    }
    render() {
        return (
          <button onClick={ this.handleClick } type="button" className="btn btn-danger">
            <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Clear List
          </button>
        );
    }
}

export default ClearAllItemsButton;
