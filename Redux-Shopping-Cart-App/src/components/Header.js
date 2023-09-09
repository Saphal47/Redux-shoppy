import React, { useCallback } from "react";
import Cart from "./Cart";
import "./Header.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
const Header = () => {

  //send actions to redux to update data
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(authActions.logout());

    //1:05:23;
  }

  return (
    <header>
      <nav className="header-nav">
        <ul className="header-ul">
          <li>
            <h2
              className="header-h2"
              style={{ fontFamily: "monospace", fontSize: "30px" }}
            >
              Redux Shopping App
            </h2>
          </li>

          {/* adding logout fxnality */}

          <li>
            <Cart />
          </li>
          <li>
            <button onClick={logoutHandler} className="logout-btn">LogOut</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
