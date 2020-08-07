import React from 'react';
import { NavLink } from "react-router-dom";

//import {GlobalContext} from '../../context/global_context';
function Breadscrumb({urls}) {

  const get_li = objli => (
    <li className="breadcrumb-item">
      <NavLink exact to={objli.url}>
        {objli.text}
      </NavLink>       
    </li>
  )

  const get_lis = urls => urls.map((objli) => get_li(objli))

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {get_lis(urls)}
      </ol>
    </nav>
  )
}

export default Breadscrumb;
