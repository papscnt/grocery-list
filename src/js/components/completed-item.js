import React from 'react';
import AppActions from '../actions/app-actions';

// component to render and handle actions related to items listed in completed section
class CompletedItem extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    // fire action to clear single item from groceryList array in store based on item description
    handleClick() {
        AppActions.clearItem(this.props.item.description);
    }
    render() {
        return (
            <tr>
              <td className="col-sm-1">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              </td>
              <td className="col-sm-10">{this.props.item.description}</td>
              <td className="col-sm-1"><button onClick={this.handleClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
            </tr>
        );
    }
}

// define propType to ensure item being passed in is an object
CompletedItem.propTypes = {
  item: React.PropTypes.object
};

export default CompletedItem;
