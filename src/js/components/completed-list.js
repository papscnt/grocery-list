import React from 'react';
import AddItem from './add-item.js';
import GroceryListStore from '../stores/grocerylist-store.js';
import CompletedItem from './completed-item';

function getCompletedItems() {
  return { completedItems: GroceryListStore.getCompletedItems() }
}

class CompletedList extends React.Component {
    // use super() constructor to get context of 'this'
    constructor() {
        super();
        this.state = getCompletedItems();
        this._onChange = this._onChange.bind(this);
    }
    componentWillMount(){
        GroceryListStore.addChangeListener( this._onChange )
    }
    componentWillUnmount(){
        GroceryListStore.removeChangeListener( this._onChange )
    }
    _onChange(){
        this.setState( getCompletedItems() )
    }
    render() {
        let completedItems = this.state.completedItems.map( item => {
            return <CompletedItem key={ item.description } item={item} />
        });
        return (
            <div className="panel panel-success">
              <div className="panel-heading">Completed Items</div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="col-sm-11">Description</th>
                    <th className="col-sm-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {completedItems}
                </tbody>
              </table>
            </div>
        );
    }
}

export default CompletedList;
