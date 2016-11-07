import { dispatch, register } from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _groceryList = [];

const _findGroceryItem = ( description ) => {
    return _groceryList.find( groceryItem => groceryItem.description.toLowerCase() === description.toLowerCase() )
}

const _findGroceryItemIndex = ( description ) => {
    return _groceryList.findIndex(function(item){
        return item.description.toLowerCase() === description.toLowerCase();
    });
}

const _completeItem = ( description ) => {
    var itemIndex = _groceryList.findIndex(function(item){
        return item.description.toLowerCase() === description.toLowerCase();
    });
    _groceryList[itemIndex].isCompleted = true;
}

const _clearItem = ( description ) => {
    _groceryList.splice(_findGroceryItemIndex(description),1);
}

const _clearAllItems = () => {
    _groceryList = [];
}

const _addItem = ( item ) => {
    const groceryItem = _findGroceryItem( item.description );
    if ( !groceryItem ) {
        _groceryList.push( item );
    } else {
        alert(item.description + ' already exists');
    }
}

const GroceryListStore = Object.assign(EventEmitter.prototype, {
    emitChange(){
        this.emit( CHANGE_EVENT );
    },
    //
    addChangeListener( callback ){
        this.on( CHANGE_EVENT, callback)
    },
    //
    removeChangeListener( callback ){
        this.removeListener( CHANGE_EVENT, callback)
    },
    getNeededItems(){
        return _groceryList.filter( groceryItem => groceryItem.isCompleted === false )
    },
    getCompletedItems(){
        return _groceryList.filter( groceryItem => groceryItem.isCompleted === true )
    },
    findDuplicateItem( description ){
      return _findGroceryItem( description );
    },

    //
    dispatcherIndex: register( function( action ){
        switch ( action.actionType ) {
            case AppConstants.ADD_ITEM:
                if(action.item.description.length) {
                    _addItem( action.item );
                } else {
                    return {msg: "Blank"};
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
