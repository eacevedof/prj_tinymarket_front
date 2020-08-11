import React, {useContext, useEffect, useState, useCallback, useMemo} from 'react';
import { TableContext } from "helpers/bootstrap/tableaction/tablecontext"
import { get_uuid, pr } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  
  const ikey = parseInt(objrow.id)
  const uuid = get_uuid()

  //const is_inmulti = ikey => multivalues.includes(ikey)

  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues,
    issingle, set_issingle} = useContext(TableContext)

  const [checked, set_checked] = useState(multivalues.includes(ikey))

  const on_singlecheck = (evt) => {
    const ischecked = evt.target.checked
    set_checked(ischecked)
    if(ischecked){
      set_multivalues([...multivalues, ikey])
    }
    else{
      const nv = multivalues.filter(ival => ival != ikey)
      set_multivalues(nv)
      set_ismultiaction(false)
    }
  }
  
  return (
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id={uuid} value={ikey} onChange={on_singlecheck} checked={checked}/>
        <label className="form-check-label" htmlFor={uuid}></label>
      </div>
    </td>
  )
}

export default Tdmultiaction;
