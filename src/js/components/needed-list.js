import React from 'react';
import AddItem from './add-item.js';
import GroceryListStore from '../stores/grocerylist-store.js';
import NeededItem from './needed-item';

// retrieve an array of items from store which are not marked as completed
function getNeededItems() {
  return { neededItems: GroceryListStore.getNeededItems() }
}

// component to render Needed Items panel and generate list of needed items
class NeededList extends React.Component {
    constructor() {
        super();
        // set the initial state to include any uncompleted objects returned from store
        this.state = getNeededItems();
        this._onChange = this._onChange.bind(this);
    }
    
    /* pass this._onChange as callback so that when store emits a change event,
     * this._onChange will be called to update the componenets state before rendering
     */
    componentWillMount(){
        GroceryListStore.addChangeListener( this._onChange )
    }

    // remove the change listener in the store immediately before the component is unmounted
    componentWillUnmount(){
        GroceryListStore.removeChangeListener( this._onChange )
    }

    // method which is called to update list of completed objects in state
    _onChange(){
        this.setState( getNeededItems() )
    }

    render() {
        /* map each completed item in state to a NeededItem component.
         * set completedItems equal to mapping.
         * include completedItems in tbody to of table.
         */
        let neededItems = this.state.neededItems.map( item => {
            return <NeededItem key={ item.description } item={item} />
        });
        return (
          <div className="bs-example" data-example-id="panel-without-body-with-table">
            <div className="panel panel-info">
              <div className="panel-heading">Needed Items</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <AddItem />
                  </div>
                </div>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="col-sm-1">#</th>
                    <th className="col-sm-11">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {neededItems}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}

export default NeededList;
