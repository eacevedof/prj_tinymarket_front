import React, {useContext, useEffect, useState, useCallback, useMemo} from 'react';
import { TableContext } from "helpers/bootstrap/tableaction/tablecontext"
import { get_uuid, pr } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  
  const ikey = parseInt(objrow.id)
  const uuid = get_uuid()

  //const is_inmulti = ikey => multivalues.includes(ikey)

  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues} = useContext(TableContext)
  const [checked, set_checked] = useState(false)
  
  const on_singlecheck = evt => {
    const ischecked = evt.target.checked
    if(ischecked) check_true()
    else check_false()
  }

  const remove_value = value => {
    const values = [...multivalues]
    values.splice(values.indexOf(value))
    set_multivalues(values)
    //if(ismultiaction) set_ismultiaction(false) esto desactiva todo
  }

  const add_value = ivalue => {
    const values = [...multivalues,ivalue]
    set_multivalues(values)
  }

  const check_true = () => {
    //set_checked(true)
    //pr(multivalues)
    if(!multivalues.includes(ikey)) add_value(ikey)
    //add_value(ikey)
  }

  const check_false = () => {
    set_checked(false)
    if(multivalues.includes(ikey)) remove_value(ikey)
    //remove_value(ikey)
  }  

  const fn = useCallback(() => {
    console.log("usecallback returns the function ")
  }, [ismultiaction])

  const v = useMemo(() => {
    //console.log("usememo returns a value")
    set_checked(ismultiaction)
    return ismultiaction
  }, [ismultiaction])

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
