import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

import { fetchData, sendCartData } from "./store/cart-actions";


//Add fxnality that when user isLogged in then Layout will be displayed
//Need to add the fxnalities in Redux store


//Since it will render first before running useEFfect 
//we handle the firstRender manually in useEFfect;
let isFirstRender=true;

function App() {
  
  const dispatch = useDispatch();

  //fetching notification data from ui-slice
  const notification = useSelector(state=>state.ui.notification);

  //grab the whole cart state to update backend
  const cart = useSelector((state)=>state.cart);

  //need to take state from (auth-slice.js) the store
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
//   console.log(isLoggedIn);

//   const cartItems = useSelector((state)=> state.cart.itemsList);
// //as in cart-slice the name of is cart so state.cart.itemsList to access that
//   console.log(cartItems);


//This useEffect will enable firebase to access latest state snapshot from redux
//Option1 : See info.txt for detail
  // useEffect(()=>{ 
  //   if(isFirstRender){
  //     isFirstRender=false;
  //     return;
  //   }
  //   const sendRequest = async()=>{
       
  //     //Send state as sending req
  //     dispatch(uiActions.showNotification({
  //         open: true,
  //         type:'warning', //from materialUI type of msgbox
  //         message:"Sending data to server",
  //     }))

  //     //sending data to firebase db
  //     //adding collection to url :cartItems.json
  //     const res = await fetch('https://reduxshoppingapp-default-rtdb.firebaseio.com/cartItems.json',
  //     {
  //       method: "PUT" ,//to Update data.
  //       body: JSON.stringify(cart),
  //     });
      

  //     //when response (res is success we convert it to json)
  //     //whenever we'll get from the server, await (should take some time)
  //     const data= await res.json();

  //     //Send state as Req is successful
  //     dispatch(uiActions.showNotification({
  //         open:true,
  //         type:'success',
  //         message:"Request sent successfully",
  //     }))
  //   };
  //   //catch: attaches a callback for rejection of the promise
  //   sendRequest().catch(err => {
  //     //Send state as error throw a new dispatch then
  //       dispatch(uiActions.showNotification({
  //         open:true,
  //         type:'error',
  //         message:"Sending Request Failed!",
  //     })
  //     )
  //   }); 


  //   //Now will create a notificatiion cmp, create a slice & newState for the
  //   //notification to handle all of the state from UI
  // },[cart])

  //Another useEffect for firebase db data fetch
  useEffect(()=>{
    dispatch(fetchData())
  },[dispatch])


  //Option2: using ActionCreator (react thunk)
  useEffect(()=>{ 
    if(isFirstRender){
      isFirstRender=false;
      return;
    }
   
    //this is thunk fxn & useEffect depends on dispatch now as well
    //Now updated the import for sendCartData from cart-actions.js
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    //Now will create a notificatiion cmp, create a slice & newState for the
    //notification to handle all of the state from UI
  },[cart,dispatch]);



  //So to handle all the states of the notification into redux
  //will create a newSlice : notification-slice
  return (
    <div className="App">
      {notification && 
        <Notification type={notification.type} message={notification.message}/>}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
