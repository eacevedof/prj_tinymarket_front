import React from 'react';
import { NavLink } from "react-router-dom";
import shortid from "shortid"

function Tdaction({objrow, objconf}) {

  const id = shortid.generate()
  const ddid = `dd-${id}`
  const chkid = `chk-${id}`

  const keyname = (objconf!=null && typeof(objconf.key)!="undefined") ? objconf.key : "id"
  const keyval = objrow[keyname]

  const objurl = {
    update: `/admin/product/update/${keyval}`,
    delete: `/admin/product/delete/${keyval}`,
    deletelogic: `/admin/product/delete-logic/${keyval}`,
    clone: `/admin/product/clone/${keyval}`,
  }

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
              <NavLink className="dropdown-item" exact to={objurl.update}> 
                <span><i className="fa fa-pencil"></i>&nbsp;Update</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={objurl.delete}> 
                <span><i className="fa fa-trash"></i>&nbsp;Delete</span>
              </NavLink>  
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={objurl.deletelogic}> 
                <span><i className="fa fa-trash"></i>&nbsp;Delete L</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" exact to={objurl.clone}> 
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
