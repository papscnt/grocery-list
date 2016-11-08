import React from 'react';
import AddItem from './add-item.js';
import GroceryListStore from '../stores/grocerylist-store.js';
import CompletedItem from './completed-item';

// retrieve an array of items from store which are marked as completed
function getCompletedItems() {
  return { completedItems: GroceryListStore.getCompletedItems() }
}

// component to render Completed Items panel and generate list of completed items
class CompletedList extends React.Component {
    constructor() {
      super();
      // set the initial state to include any completed objects returned from store
      this.state = getCompletedItems();
      this._onChange = this._onChange.bind(this);
    }

    /* pass this._onChange as callback so that when store emits a change event,
     * this._onChange will be called to update the componenet's state before rendering
     */
    componentWillMount(){
      GroceryListStore.addChangeListener( this._onChange );
    }

    // remove the change listener in the store immediately before the component is unmounted
    componentWillUnmount(){
      GroceryListStore.removeChangeListener( this._onChange );
    }

    // method which is called to update list of completed objects in state
    _onChange(){
      this.setState( getCompletedItems() );
    }

    render() {
      /* map each completed item in state to a CompletedItem component.
       * set completedItems equal to mapping.
       * include completedItems in tbody to of table.
       */
      let completedItems = this.state.completedItems.map( item => {
          return <CompletedItem key={ item.description } item={item} />
      });
      return (
          <div className="panel panel-success">
            <div className="panel-heading">Completed Items</div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="col-sm-11" colSpan="2">Description</th>
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
