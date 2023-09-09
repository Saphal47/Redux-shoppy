import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";


//one more fxn to fetch data from firebase and update frontend
//another action creator thunk
export const fetchData = ()=>{
    return async(dispatch) =>{
        const fetchHandler = async()=>{
            const res = await fetch("https://reduxshoppingapp-default-rtdb.firebaseio.com/cartItems.json")
            const data= await res.json();

            return data;
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        }catch(err){
            dispatch(uiActions.showNotification({
                    open:true,
                    type:'error',
                    message:"Sending Request Failed!",
                })
            );
        } 
    }
}


export const sendCartData = (cart)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            open: true,
            type:'warning', //from materialUI type of msgbox
            message:"Sending data to server",
        }));


        const sendRequest = async()=>{
       
            //Send state as sending req
            dispatch(uiActions.showNotification({
                open: true,
                type:'warning', //from materialUI type of msgbox
                message:"Sending data to server",
            }))
      
            //sending data to firebase db
            //adding collection to url :cartItems.json
            const res = await fetch('https://reduxshoppingapp-default-rtdb.firebaseio.com/cartItems.json',
            {
              method: "PUT" ,//to Update data.
              body: JSON.stringify(cart),
            });
            
      
            //when response (res is success we convert it to json)
            //whenever we'll get from the server, await (should take some time)
            const data= await res.json();
      
            //Send state as Req is successful
            dispatch(uiActions.showNotification({
                open:true,
                type:'success',
                message:"Request sent successfully",
            }))
          };

          try{
            await sendRequest();
          }catch (err){
                dispatch(uiActions.showNotification({
                    open:true,
                    type:'error',
                    message:"Sending Request Failed!",
                })
                );
          };
          //catch: attaches a callback for rejection of the promise
    }
};