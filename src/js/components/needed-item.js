import React from 'react';
import AppActions from '../actions/app-actions';

// component to render and handle actions related to items listed in needed items section
class NeededItem extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    // fire action to mark item as completed in store based on item description
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

// define propType to ensure item being passed in is an object
NeededItem.propTypes = {
  item: React.PropTypes.object
};

export default NeededItem;
