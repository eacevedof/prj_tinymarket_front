import React from 'react';

function DropdownTable() {
  
  return (
    <div className="row">
      <th colSpan="2">
        <button type="button" className="btn btn-secondary dropdown-toggle"  id="grid-ulmultiaction" data-toggle="dropdown" aria-expanded="false">
          Multiaction
        </button>          
        <ul className="dropdown-menu" aria-labelledby="grid-ulmultiaction">
          {Object.keys(multiconf.ACTIONS).map(action => <li key={get_uuid()} ><button className="dropdown-item" type="button">{multiconf.ACTIONS[action]}</button></li>)}
        </ul>
      </th>
      <th>
        <button type="button" className="btn btn-success"><i className="fa fa-check-circle" aria-hidden="true"></i></button>
      </th>
    </div>
  )
}

export default DropdownTable;
