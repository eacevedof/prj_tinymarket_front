import React from 'react';
import shortid from "shortid"

function Tdaction({araction}) {
  const id = shortid.generate()
  const strid = `dd-${id}`

  return (
    <td>
      <div className="dropdown">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault"></label>
          <button className="btn btn-secondary dropdown-toggle" type="button" id={strid} data-toggle="dropdown" aria-expanded="false">
            Action
          </button>          
        </div>
        <ul className="dropdown-menu" aria-labelledby={strid}>
          <li><button className="dropdown-item" type="button">Update</button></li>
          <li><button className="dropdown-item" type="button">Delete</button></li>
          <li><button className="dropdown-item" type="button">Delete L</button></li>
          <li><button className="dropdown-item" type="button">Clone</button></li>
        </ul>
      </div>  
    </td>
  )
}

export default Tdaction;
