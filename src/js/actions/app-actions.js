import React from 'react';
import { dispatch, register } from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';

export default {
    // add item to grocery list in store
    addItem( item ) {
        dispatch({
            actionType: AppConstants.ADD_ITEM,
            item
        })
    },

    // mark single item as completed in store
    completeItem( index ) {
        dispatch({
            actionType: AppConstants.COMPLETE_ITEM,
            index
        })
    },

    // remove single item from grocery list in store
    clearItem( index ) {
        dispatch({
            actionType: AppConstants.CLEAR_ITEM,
            index
        })
    },

    // remove all items from grocery list in store
    clearAllItems() {
        dispatch({
            actionType: AppConstants.CLEAR_ALL_ITEMS
        })
    }
}
