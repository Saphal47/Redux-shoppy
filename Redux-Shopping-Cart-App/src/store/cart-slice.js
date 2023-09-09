import  {createSlice} from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name:'cart',
    initialState:{//we wish to update the state of each card,price,quantity
        itemsList: [],
        totalQty:0,
        showCart:false,
        changed: false, //whenever data change then only render

    },
    reducers:{
        replaceData(state,action){ 
            state.totalQty = action.payload.totalQty;
            state.itemsList =action.payload.itemsList;
        },

        addToCart(state,action){
            state.changed=true;
            //action data : will get from user
            //when click on addToCart in card then qty and price will update
            const newItem=action.payload;
            //check if item is already there equal to newItem's id
            const existingItem = state.itemsList.find((item)=> item.id===newItem.id);
            
            //it exists
            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice+=newItem.price;
            }else{
                //create a new prod if not available  
                //handling the state only from the redux store not
                //from the component store               
                state.itemsList.push({
                    id: newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.name
                });

                //updating the state of totalQty (no. of items in cart)
                state.totalQty++;
            }           
         },

        removeFromCart(state,action){ 
            state.changed=true;
            //the id of item to be removed will get from user using Payload
            const id =action.payload;
            const existingItem = state.itemsList.find(item=>item.id===id);

            if(existingItem.quantity===1){
                //we need to remove it so return all in state except that item
                state.itemsList = state.itemsList.filter(item=> item.id !==id);
                //decrement the totalItem of cart when not present
                state.totalQty--;
            }else{ //qty >1
                //just decrease the quantity and totalPrice
                existingItem.quantity--;
                existingItem.totalPrice -=existingItem.price;
            }
        },
        setShowCart(state){ 
            state.showCart= !state.showCart;
        }
    }
});

//this makes thunk component clean code: added now in new file cart-actions.js


export const cartActions = cartSlice.actions;
export default cartSlice;

//Added this fxnality now import in Product.js