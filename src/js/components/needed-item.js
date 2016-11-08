import React from 'react';
import AppActions from '../actions/app-actions';

class NeededItem extends React.Component {
    // use super() constructor to get context of 'this'
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        AppActions.completeItem(event.target.value);
    }
    render() {
        return (
            <tr>
              <td><input onChange={this.handleChange} value={this.props.item.description} type="checkbox" /></td>
              <td>{this.props.item.description}</td>
            </tr>
        );
    }
}

NeededItem.propTypes = {
  item: React.PropTypes.object
};

export default NeededItem;
