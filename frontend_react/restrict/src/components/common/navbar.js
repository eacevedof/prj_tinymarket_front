//Navbar.js
import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from '../context/global_context';
import { NavLink } from "react-router-dom";
import _ from "lodash"

function Navbar() {
  
  const {order} = useContext(GlobalContext)
  console.log("navbar.order",order)

  const [iitems, set_iitems] = useState(0)

  useEffect(()=>{
    console.log("navbar.useeffect.order",order)
    if(!_.isEmpty(order))
    {
      const i = order.products.length
      set_iitems(i)
    }
  },[order])

  return (
    <nav className="navbar navbar-expand fixed-top">
      <div className="collapse navbar-collapse" id="navigation">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="navlink-active" exact to={"/"}>
                <span><i className="nc-icon nc-bullet-list-67"></i>&nbsp;Products</span>
              </NavLink>
            </li>            

            <li className="nav-item dropdown">
              <NavLink className="nav-link" id="nav-order" activeClassName="navlink-active" to={"/order"}>
                  <span><i className="nc-icon nc-cart-simple"></i>&nbsp; Cart</span>
                  <span className="notification">{iitems}</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#totop">
                <span><i className="nc-icon nc-stre-up"></i>&nbsp;top</span>
              </a>
            </li>            
          </ul>
      </div>
    </nav>
  )
}//Navbar()

export default Navbar;