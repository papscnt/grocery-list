import React from 'react';
import AppActions from '../actions/app-actions';

// component to render and handle actions related to the 'Clear List' button
class ClearAllItemsButton extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    // fire action to clear grocery list in store when button clicked
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
