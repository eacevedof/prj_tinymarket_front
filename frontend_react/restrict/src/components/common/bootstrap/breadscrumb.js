import React from 'react';
import { NavLink } from "react-router-dom";

//import {GlobalContext} from '../../context/global_context';
function Breadscrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink exact to={"/admin"}>
            Dashboard
          </NavLink>          
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <NavLink exact to={"/admin/product"}>
            Products
          </NavLink>          
        </li>        
        <li className="breadcrumb-item">
          <NavLink exact to={"/admin/product/insert"}>
            <i className="fa a-plus-square-o"></i>&nbsp;New product
          </NavLink>          
        </li>
      </ol>
    </nav>
  )
}

export default Breadscrumb;
