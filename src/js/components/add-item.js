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
            newItemTextValue: "",
            hasError: false,
            errorMessage: ""
        };
    }
    handleChange(event) {
        this.setState({
            newItemTextValue: event.target.value
        });
    }
    isValid() {
      if(!this.state.newItemTextValue.trim()) {
        this.setState({
          // Ensure state error is false and errorMessage is emtpy string
          hasError: true,
          errorMessage: "Item description cannot be empty"
        });
        return false;
      }
      if(GroceryListStore.findDuplicateItem(this.state.newItemTextValue.trim())) {
        this.setState({
          // Ensure state error is false and errorMessage is emtpy string
          hasError: true,
          errorMessage: "Item '" + this.state.newItemTextValue + "' already exists"
        });
        this.refs.newItemTextValue.value = "";
        return false;
      }

      return true;
    }
    handleClickAddItem() {
      // Check to ensure item is not emtpy and is unique
      if (this.isValid()) {
          AppActions.addItem({
              description: this.state.newItemTextValue,
              isCompleted: false
          });
          this.refs.newItemTextValue.value = "";
          // Set state properties
          this.setState({
            // Set input value to empty string
            newItemTextValue: "",
            // Ensure state error is false and errorMessage is emtpy string
            hasError: false,
            errorMessage: ""
          });
      }
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleClickAddItem()
        }
    }
    renderAlert() {
      return (
        <p className="text-danger">{ this.state.errorMessage }</p>
      );
    }
    render() {
        var alert = this.state.hasError ? this.renderAlert() : null;
        return (
          <div>
            <div className = "input-group">
              <input onChange = { this.handleChange } onKeyPress = { this.handleKeyPress } ref = "newItemTextValue"
                type = "text" className = "form-control" placeholder = "Item description..." />
              <span className = "input-group-btn">
                <button onClick = {this.handleClickAddItem} className = "btn btn-warning" type = "button" > Add Item! < /button>
              </span>
            </div>
            { alert }
          </div>
        );
    }
}

export default AddItem;
