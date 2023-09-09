import {createSlice} from '@reduxjs/toolkit';

//new slice for redux
const authSlice = createSlice({
    name:'auth',
    initialState: {isLoggedIn:false},
    reducers:{//here we mutate the state
        login(state) {
            state.isLoggedIn=true;
         },
        logout(state){
            state.isLoggedIn=false;
         },
    }
});

//exporting the authSlice with its actions
export const authActions = authSlice.actions;
export default authSlice;