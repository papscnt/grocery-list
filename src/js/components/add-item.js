import React from 'react';
import GroceryListStore from '../stores/grocerylist-store';
import AppActions from '../actions/app-actions';

class AddItem extends React.Component {
    constructor() {
        super();
        // bind methods to set context
        this.handleChange = this.handleChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        // set initial state
        this.state = {
            value: "",
            hasError: false,
            errorMessage: ""
        };
    }

    // update componenet value when input value changes
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    // method to validate component value
    isValid() {
      // check to ensure component value is not blank
      if(!this.state.value.trim()) {
        // set error state to true and define message to display
        this.setState({
          hasError: true,
          errorMessage: "Item description cannot be empty",
          value: this.state.value.trim()
        });
        return false;
      }

      // check to ensure the item is unique
      if(GroceryListStore.findDuplicateItem(this.state.value.trim())) {
        // set error state to true and define message to display
        this.setState({
          value: this.state.value.trim(),
          hasError: true,
          errorMessage: "Item '" + this.state.value.trim() + "' already exists"
        });
        return false;
      }
      // default return of true
      return true;
    }

    // method to handle button click
    handleClickAddItem() {
      // validate component value
      if (this.isValid()) {
          // value is valid, so call addItem action
          AppActions.addItem({
              description: this.state.value.trim(),
              isCompleted: false
          });
          // set state to clear any error/message and reset value to blank
          this.setState({
            value: "",
            hasError: false,
            errorMessage: ""
          });
      }
    }

    // method to watch key press for 'Enter' to add item
    handleKeyPress(event) {
        event.key === 'Enter' ? this.handleClickAddItem() : false;
    }

    // method to return error element
    renderAlert() {
      return (
        <p className="text-danger">{ this.state.errorMessage }</p>
      );
    }

    // componenet render method
    render() {
      // check state for error and set alert const based on its condition
      const alert = this.state.hasError ? this.renderAlert() : null;
      return (
        <div>
          <div className = "input-group">
            <input onChange = { this.handleChange } onKeyPress = { this.handleKeyPress } value = { this.state.value }
              type = "text" className = "form-control" placeholder = "Item description..." />
            <span className = "input-group-btn">
              <button onClick = {this.handleClickAddItem} className = "btn btn-warning" type = "button" > Add </button>
            </span>
          </div>
          { alert }
        </div>
      );
    }
}

export default AddItem;
