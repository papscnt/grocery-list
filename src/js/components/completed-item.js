import React from 'react';
import AppActions from '../actions/app-actions';

class CompletedItem extends React.Component {
    // use super() constructor to get context of 'this'
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        AppActions.clearItem(this.props.item.description);
    }
    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> {this.props.item.description}</td>
                <td><button onClick={this.handleClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
            </tr>
        );
    }
}

export default CompletedItem;
