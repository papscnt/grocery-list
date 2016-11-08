import React from 'react';
import GroceryListStore from '../stores/grocerylist-store';
import AppActions from '../actions/app-actions';

class AddItem extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: "",
            hasError: false,
            errorMessage: ""
        };
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    isValid() {
      if(!this.state.value.trim()) {
        this.setState({
          // Ensure state error is false and errorMessage is emtpy string
          hasError: true,
          errorMessage: "Item description cannot be empty",
          value: this.state.value.trim()
        });
        return false;
      }
      if(GroceryListStore.findDuplicateItem(this.state.value.trim())) {
        this.setState({
          // Ensure state error is false and errorMessage is emtpy string
          value: this.state.value.trim(),
          hasError: true,
          errorMessage: "Item '" + this.state.value.trim() + "' already exists"
        });
        return false;
      }

      return true;
    }
    handleClickAddItem() {
      // Check to ensure item is not emtpy and is unique
      if (this.isValid()) {
          AppActions.addItem({
              description: this.state.value.trim(),
              isCompleted: false
          });
          this.refs.newItemTextValue.value = "";
          // Set state properties
          this.setState({
            // Set input value to empty string
            value: "",
            // Ensure state error is false and errorMessage is emtpy string
            hasError: false,
            errorMessage: ""
          });
      }
    }
    handleKeyPress(event) {
        event.key === 'Enter' ? this.handleClickAddItem() : false;
    }
    renderAlert() {
      return (
        <p className="text-danger">{ this.state.errorMessage }</p>
      );
    }
    render() {
        const alert = this.state.hasError ? this.renderAlert() : null;
        return (
          <div>
            <div className = "input-group">
              <input onChange = { this.handleChange } onKeyPress = { this.handleKeyPress } value = { this.state.value } ref = "newItemTextValue"
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
