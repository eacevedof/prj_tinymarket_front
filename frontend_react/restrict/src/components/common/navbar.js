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
    <header className="mb-2">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" activeClassName="navlink-active" exact to={"/admin"}> 
            <span><i className="fa fa-home"></i>&nbsp;Home</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="navlink-active" exact to={"/admin"}>
                  <span><i className="fa fa-square"></i>&nbsp;Dashboard</span>
                </NavLink>
              </li>              
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="navlink-active" exact to={"/admin/product"}>
                  <span><i className="fa fa-product-hunt"></i>&nbsp;Products</span>
                </NavLink>
              </li>   
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="navlink-active" exact to={"/admin"}>
                  <span><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}//Navbar()

export default Navbar;