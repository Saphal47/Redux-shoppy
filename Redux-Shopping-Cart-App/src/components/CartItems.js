import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";

//It will render all the items which are added to cart

const CartItems = () => {

  const cartItems = useSelector(state=>state.cart.itemsList);
  
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {/* <li>
          <CartItem id={1} price={2500} name={"Macbook"} />
        </li> */}
        {cartItems.map(item=>(
          <li key={item.id}>
            <CartItem 
                  id={item.id}
                  quantity={item.quantity}
                  price={item.price}
                  total={item.totalPrice}
                  name={item.name}
          />{" "}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
