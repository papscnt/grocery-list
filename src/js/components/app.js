import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import NeededList from './needed-list.js';
import CompletedList from './completed-list.js';
import ClearAllItemsButton from './clear-all-items-button';

// root container component for react app
class App extends React.Component {
    render() {
        return (
            <section>
              <Header />
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
              <Footer />
            </section>
        )
    }
}

export default App;
