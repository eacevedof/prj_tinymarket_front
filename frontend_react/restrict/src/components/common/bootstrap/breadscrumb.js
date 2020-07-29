import React from 'react';
import { NavLink } from "react-router-dom";

//import {GlobalContext} from '../../context/global_context';
function Breadscrumb({arbreads}) {

  const get_lis = ar => ar.map((objli, i) => {
    return (
      <li className="breadcrumb-item">
        <NavLink exact to={objli.path}>
          {objli.text}
        </NavLink>       
      </li>
    )
  })

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink exact to={"/admin"}>
            Dashboard
          </NavLink>          
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <NavLink exact to={"/admin/products"}>
            Products
          </NavLink>          
        </li>        
        <li className="breadcrumb-item">
          <NavLink exact to={"/admin/product/insert"}>
            <i className="fa a-plus-square-o"></i>New product
          </NavLink>          
        </li>
      </ol>
    </nav>
  )
}

export default Breadscrumb;
