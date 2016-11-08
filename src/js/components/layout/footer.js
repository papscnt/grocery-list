import React from 'react';

// component which renders the page footer
class Footer extends React.Component {
    render() {
        return (
          <footer>
            <hr />
            <div className="row">
              <div className="col-lg-12">
                <ul className="list-unstyled">
                  <li className="pull-right"><a href="#top">Back to top</a></li>
                </ul>
              </div>
            </div>
          </footer>
        )
    }
}

export default Footer;
