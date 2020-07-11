import React from 'react';

function Tdaction({araction}) {
  return (
    <td>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="false">
          Action
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
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
