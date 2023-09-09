import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        notification: null
    },
    reducers:{
        showNotification(state,action){
            //action.payload will have data provided by user
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open
                //open Prop when need to open the notification
            }

        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;
//Now will add this slice to index.js/store

