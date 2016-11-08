import React from 'react';

// component which renders the page header
class Header extends React.Component {
    render() {
        return (
          <header>
            <div className="page-header">
              <h1>Grocery List <small>page</small></h1>
            </div>
          </header>
        )
    }
}

export default Header;
