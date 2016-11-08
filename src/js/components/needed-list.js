import React from 'react';
import AddItem from './add-item.js';
import GroceryListStore from '../stores/grocerylist-store.js';
import NeededItem from './needed-item';

function getNeededItems() {
  return { neededItems: GroceryListStore.getNeededItems() }
}

class NeededList extends React.Component {
    // use super() constructor to get context of 'this'
    constructor() {
        super();
        this.state = getNeededItems();
        this._onChange = this._onChange.bind(this);
    }
    componentWillMount(){
        GroceryListStore.addChangeListener( this._onChange )
    }
    componentWillUnmount(){
        GroceryListStore.removeChangeListener( this._onChange )
    }
    _onChange(){
        this.setState( getNeededItems() )
    }
    render() {
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
