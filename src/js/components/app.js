import React from 'react';
import NeededList from './needed-list.js';
import CompletedList from './completed-list.js';
import ClearAllItemsButton from './clear-all-items-button';

export default class App extends React.Component {
    render() {
        return (
            <section>
                <div className="page-header">
                  <h1>Grocery List <small>page</small></h1>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <ClearAllItemsButton />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-lg-6">
                        <NeededList />
                    </div>
                    <div className="col-lg-6">
                        <CompletedList />
                    </div>
                </div>
            </section>
        )
    }
}
