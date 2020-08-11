import React, {useContext, useEffect, useState} from 'react';
import { TableContext } from "helpers/bootstrap/tableaction/tablecontext"
import { get_uuid, pr } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  
  const ikey = parseInt(objrow.id)
  const uuid = get_uuid()

  const is_inmulti = ikey => multivalues.includes(ikey)

  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues} = useContext(TableContext)
  const [checked, set_checked] = useState(ismultiaction)
    
  

  const on_singlecheck = evt => {
    const ischecked = evt.target.checked
    const ivalue = parseInt(evt.target.value)
    if(ischecked) add_value(ivalue)
    else remove_value(ivalue)
  }

  const remove_value = value => {
    const values = [...multivalues]
    values.splice(values.indexOf(value))
    set_multivalues(values)
  }

  const add_value = ivalue => {
    //console.log("multivalues:",[...multivalues])
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
    if(!multivalues.includes(ikey)) add_value(ikey)
    //add_value(ikey)
  }

  const check_false = () => {
    set_checked(false)
    if(multivalues.includes(ikey)) remove_value(ikey)
    //remove_value(ikey)
  }  

  /*
  useEffect(()=>{
    console.log("tdmultiaction mounting")
    //set_checked(is_inmulti(ikey))
    set_checked(true)
    return ()=> console.log("tdmultiaction unmounting")
  },[ismultiaction])
*/
  /*
  useEffect(()=>{
    
    if(is_inmulti(ikey)) set_checked(true)
    else set_checked(false)

    return ()=> console.log("tdmultiaction unmounting")
  },[])
*/
/*
  useEffect(()=>{
    if(ismultiaction) check_true()
    else check_false()
    //if(ismultiaction) console.log("is multi action",ismultiaction,ikey)
    //pr(multivalues,"multivalues")
    return ()=> console.log("tdmultiaction unmounting")
  },[ismultiaction])
*/
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
