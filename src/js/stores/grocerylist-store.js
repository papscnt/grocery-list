import { dispatch, register } from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// array of grocery items containing both needed and completed items
var _groceryList = [];

/* used to indicate if an item with the description already exists
 * returns object or undefined
 */
const _findGroceryItem = ( description ) => {
    return _groceryList.find( groceryItem => groceryItem.description.toLowerCase() === description.toLowerCase() );
}

/* finds the index of item with the given description
 * returns object or undefined
 */
const _findGroceryItemIndex = ( description ) => {
    return  _groceryList.findIndex(function(item){
        return item.description.toLowerCase() === description.toLowerCase();
    });
}

// marks item with given descrition as completed
const _completeItem = ( description ) => {
    _groceryList[_findGroceryItemIndex(description)].isCompleted = true;
}

// removes item with the given description from the array
const _clearItem = ( description ) => {
    _groceryList.splice(_findGroceryItemIndex(description),1);
}

// remove all grocery items from array
const _clearAllItems = () => {
    _groceryList = [];
}

// add item to array
const _addItem = ( item ) => {
    const groceryItem = _findGroceryItem( item.description );
    _groceryList.push( item );
}

const GroceryListStore = Object.assign(EventEmitter.prototype, {
    // broadcasts a change event to listeners
    emitChange(){
        this.emit( CHANGE_EVENT );
    },

    // allows views to add listener to store changes
    addChangeListener( callback ){
        this.on( CHANGE_EVENT, callback);
    },

    // allows views to remove listener to store changes
    removeChangeListener( callback ){
        this.removeListener( CHANGE_EVENT, callback);
    },

    // returns object containing items from _groceryList which are not completed
    getNeededItems(){
        return _groceryList.filter( groceryItem => groceryItem.isCompleted === false );
    },

    // returns object containing items from _groceryList which are marked completed
    getCompletedItems(){
        return _groceryList.filter( groceryItem => groceryItem.isCompleted === true );
    },

    // returns duplicate item if it exists || undefined
    findDuplicateItem( description ){
      return _findGroceryItem( description );
    },

    /* register callback with dispatcher.
     * call appropriate private functions based on actionType.
     * emitChange so that views with listeners will update.
     */
    dispatcherIndex: register( function( action ){
        switch ( action.actionType ) {
            case AppConstants.ADD_ITEM:
                if(action.item.description.length) {
                    _addItem( action.item );
                }
                break;
            case AppConstants.COMPLETE_ITEM:
                _completeItem( action.index );
                break;
            case AppConstants.CLEAR_ITEM:
                _clearItem( action.index );
                break;
            case AppConstants.CLEAR_ALL_ITEMS:
                _clearAllItems();
                break;
        }
        GroceryListStore.emitChange();
    })

})

export default GroceryListStore;
