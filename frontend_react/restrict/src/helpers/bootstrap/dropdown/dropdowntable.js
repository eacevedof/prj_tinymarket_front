import React, {useState} from 'react';
import { get_uuid, pr } from 'helpers/functions';

function DropdownTable({multiconf}) {
  
  const [selected, set_selected] = useState("...select")

  const on_click = evt => {
    //pr(evt.target.value)
    set_selected(evt.target.value)
  }

  return (
    <div className="row">
      <button type="button" className="btn btn-secondary dropdown-toggle"  id="grid-ulmultiaction" data-toggle="dropdown" aria-expanded="false">
        {selected}
      </button>          
      <ul className="dropdown-menu" aria-labelledby="grid-ulmultiaction">
        {Object.keys(multiconf.ACTIONS).map(action => (
            <li key={get_uuid()}>
              <button type="button" className="dropdown-item" value={multiconf.ACTIONS[action]} onClick={on_click}>{multiconf.ACTIONS[action]}</button>
            </li>
          ))}
      </ul>
      <button type="button" className="btn btn-success"><i className="fa fa-check-circle" aria-hidden="true"></i></button>
    </div>
  )
}

export default DropdownTable;
