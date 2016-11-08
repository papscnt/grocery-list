import React from 'react';
import GroceryListStore from '../stores/grocerylist-store';
import AppActions from '../actions/app-actions';

// component which renders the input and button used to add item to list
class AddItem extends React.Component {
    constructor() {
        super();
        // bind methods to set context
        this.handleChange = this.handleChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this._onChange = this._onChange.bind(this);
        // set initial state
        this.state = {
            value: "",
            hasError: false,
            errorMessage: ""
        };
    }

    /* pass this._onChange as callback so that when store emits a change event,
     * this._onChange will be called to update the componenets state before rendering.
     *
     * prevents preexisting errors from being dispaled when clicking 'Clear List' or
     * 'X' (clear) buttons
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
      this.resetState();
    }

    // update componenet value when input value changes
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    // set state to clear any current error/message and reset value to blank
    resetState() {
      this.setState({
        value: "",
        hasError: false,
        errorMessage: ""
      });
    }

    setStateError( msg ) {
      this.setState({
        hasError: true,
        errorMessage: msg,
        value: this.state.value.trim()
      });

    }

    // method to validate component value
    isValid() {
      // check to ensure component value is not blank
      if(!this.state.value.trim()) {
        // set error state to true and define message to display
        this.setStateError("Item description cannot be empty");
        return false;
      }

      // check to ensure the item is unique
      if(GroceryListStore.findDuplicateItem(this.state.value.trim())) {
        // set error state to true and define message to display
        this.setStateError("Item '" + this.state.value.trim() + "' already exists");
        return false;
      }
      // if not returned early, value is valid
      return true;
    }

    // method to handle button click
    handleClickAddItem() {
      // validate component value
      if (this.isValid()) {
          AppActions.addItem({
              description: this.state.value.trim(),
              isCompleted: false
          });
          // set state to clear any current error/message and reset value to blank
          this.resetState();
      }
    }

    // method to watch key press for 'Enter' to add item
    handleKeyPress(event) {
        event.key === 'Enter' ? this.handleClickAddItem() : false;
    }

    renderAlert() {
      return (
        <p className="text-danger">{ this.state.errorMessage }</p>
      );
    }

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
