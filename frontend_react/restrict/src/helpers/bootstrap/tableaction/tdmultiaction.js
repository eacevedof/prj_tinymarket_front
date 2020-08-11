import React, {useContext, useEffect, useState} from 'react';
import { TableContext } from "helpers/bootstrap/tableaction/tablecontext"
import { get_uuid, pr } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  
  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues} = useContext(TableContext)
  const [checked, set_checked] = useState(false)
  
  const ikey = parseInt(objrow.id)
  const uuid = get_uuid()
  
  const on_singlecheck = evt => {
    const ischecked = evt.target.checked
    const value = parseInt(evt.target.value)
    const values = [...multivalues]

 
  }

  const remove_value = value => {
    const values = [...multivalues]
    values.splice(values.indexOf(value))
    set_multivalues(values)
  }

  const add_value = ivalue => {
    console.log("multivalues:",[...multivalues])
    const v = [...multivalues,ivalue]
    //const values = [...new Set([...multivalues, ivalue])]
    //pr(multivalues, "multivalues")
    //pr(values,`values of ${ikey}`)
    //set_multivalues(values)
    set_multivalues(v)
  }

  const check_true = () => {
    set_checked(true)
    //pr(multivalues)
    if(!multivalues.includes(ikey))
      add_value(ikey)
  }


  useEffect(()=>{
    if(ismultiaction) check_true()
    //if(ismultiaction) console.log("is multi action",ismultiaction,ikey)
    //pr(multivalues,"multivalues")
    return ()=> console.log("tdmultiaction unmounting")
  },[ismultiaction])

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
