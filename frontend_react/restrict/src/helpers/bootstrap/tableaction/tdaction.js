import React from 'react';
import { NavLink } from "react-router-dom";
import shortid from "shortid"

function Tdaction({objrow, objconf}) {

  const id = shortid.generate()
  const ddid = `dd-${id}`
  const chkid = `chk-${id}`

  const keyname = (objconf!=null && typeof(objconf.KEYFIELD)!="undefined") ? objconf.KEYFIELD : "id"
  const keyval = objrow[keyname]

  const get_replaced = (string,key) => !string ? "" : string.replace("%key%",key)

  const objaction = {
    detail: get_replaced(objconf.ACTIONS.detail, keyval),
    update: get_replaced(objconf.ACTIONS.update, keyval),
    delete: get_replaced(objconf.ACTIONS.delete, keyval),
    deletelogic: get_replaced(objconf.ACTIONS.deletelogic, keyval),
    clone: get_replaced(objconf.ACTIONS.clone, keyval),
  }

  const get_ucased = string => string.charAt(0).toUpperCase() + string.slice(1);

  const get_li = (objaction, action)=> 
    objaction[action]!="" ? (  
      <li>
        <NavLink className="dropdown-item" exact to={objaction[action]}> 
          <span><i className="fa fa-info-circle"></i>&nbsp;{get_ucased(action)}</span>
        </NavLink>
      </li>
    ): null
  

  const get_lis = objaction => Object.keys(objaction).map(action => get_li(objaction, action))

  return (
    <>
      <td>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id={chkid} />
          <label className="form-check-label" htmlFor={chkid}></label>
        </div>
      </td>
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
    </>
  )
}

export default Tdaction;
