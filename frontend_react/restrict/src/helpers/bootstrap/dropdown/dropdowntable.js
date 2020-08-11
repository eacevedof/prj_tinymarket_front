import React, {useState} from 'react';
import { get_uuid, pr } from 'helpers/functions';

function DropdownTable({multiconf, set_action}) {
  
  const [selected, set_selected] = useState("...select")

  const on_click = evt => {
    //pr(evt.target.value)
    set_selected(evt.target.value)
  }

  const on_confirm = evt => {
    //pr(selected)
    set_action(selected)
  }

  return (
    <div className="row">
      <div className="col-3">
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
      </div>
      <div className="col-2 float-left pl-0">
        <button type="button" className="btn btn-success"><i className="fa fa-check-circle" aria-hidden="true" onClick={on_confirm}></i></button>
      </div>
    </div>
  )
}

export default DropdownTable;
