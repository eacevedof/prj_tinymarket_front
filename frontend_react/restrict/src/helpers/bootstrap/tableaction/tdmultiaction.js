import React, {useContext, useEffect} from 'react';
import { TableContext } from "helpers/bootstrap/tableaction/tablecontext"
import { get_uuid, pr } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  
  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues} = useContext(TableContext)
  const uuid = get_uuid()
  
  const on_singlecheck = evt => {
    const ischecked = evt.target.checked
    const value = parseInt(evt.target.value)
    const values = [...multivalues]

    if(ischecked){
      values.push(value)
    }
    else{
      set_ismultiaction(false)
      values.splice(values.indexOf(value))
    }
    set_multivalues(values)
  }

  useEffect(()=>{
    return ()=> console.log("tdmultiaction unmounting")
  },[])

  return (
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id={uuid} value={objrow.id} onChange={on_singlecheck} />
        <label className="form-check-label" htmlFor={uuid}></label>
      </div>
    </td>
  )
}

export default Tdmultiaction;
