import React from 'react';
import { NavLink } from "react-router-dom";
import { get_uuid } from 'helpers/functions';


function Tdaction({objrow, objconf}) {
  const ddid = get_uuid()
  
  const keyname = (objconf!=null && typeof(objconf.KEYFIELD)!="undefined") ? objconf.KEYFIELD : "id"
  const keyval = objrow[keyname]

  const get_replaced = (string, key) => !string ? "" : string.replace("%key%",key)

  const objaction = {
    detail: get_replaced(objconf.ACTIONS.detail.url, keyval),
    update: get_replaced(objconf.ACTIONS.update.url, keyval),
    delete: get_replaced(objconf.ACTIONS.delete.url, keyval),
    deletelogic: get_replaced(objconf.ACTIONS.deletelogic.url, keyval),
    clone: get_replaced(objconf.ACTIONS.clone.url, keyval),
  }

  const get_li = (objaction, action)=> 
    //null
    objaction[action]!="" ? (  
      <li key={get_uuid()}>
        <NavLink className="dropdown-item" exact to={objaction[action]}> 
          <span><i className="fa fa-info-circle"></i>&nbsp;{objaction[action]}</span>
        </NavLink>
      </li>
    ): null
  
  const get_lis = objaction => Object.keys(objaction).map(action => get_li(objaction, action))

  return (
    <td>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id={ddid} data-toggle="dropdown" aria-expanded="false">
          <span><i className="fa fa-bars"></i></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby={ddid}>
          {get_lis(objaction)}
        </ul>
      </div>  
    </td>
  )
}

export default Tdaction;
