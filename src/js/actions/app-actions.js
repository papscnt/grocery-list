import React from 'react';
import { dispatch, register } from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';

export default {
    addItem( item ) {
        dispatch({
            actionType: AppConstants.ADD_ITEM,
            item
        })
    },
    completeItem( index ) {
        dispatch({
            actionType: AppConstants.COMPLETE_ITEM,
            index
        })
    },
    clearItem( index ) {
        dispatch({
            actionType: AppConstants.CLEAR_ITEM,
            index
        })
    },
    clearAllItems() {
        dispatch({
            actionType: AppConstants.CLEAR_ALL_ITEMS
        })
    }
}
