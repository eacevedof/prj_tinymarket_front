import React from 'react';
import { NavLink } from "react-router-dom";
import shortid from "shortid"

function Tdaction({araction}) {
  const id = shortid.generate()
  const ddid = `dd-${id}`
  const chkid = `chk-${id}`

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
            <li>
              <NavLink className="dropdown-item" exact to={"/admin/product/update/123"}> 
                <span><i className="fa fa-pencil"></i>&nbsp;Update</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={"/admin/product/delete/123"}> 
                <span><i className="fa fa-trash"></i>&nbsp;Delete</span>
              </NavLink>  
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={"/admin/product/delete-logic/123"}> 
                <span><i className="fa fa-trash"></i>&nbsp;Delete L</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={"/admin/product/clone/123"}> 
                <span><i className="fa fa-files-o"></i>&nbsp;Clone</span>
              </NavLink>
            </li>
          </ul>
        </div>  
      </td>
    </>
  )
}

export default Tdaction;
