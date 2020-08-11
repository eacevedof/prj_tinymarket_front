import React, {useEffect, useContext} from 'react';

import {TableContext} from "helpers/bootstrap/tableaction/tablecontext"
import Tdaction from "helpers/bootstrap/tableaction/tdaction"
import Tdmultiaction from "helpers/bootstrap/tableaction/tdmultiaction"
import { get_uuid, is_defined, pr } from 'helpers/functions';

function TableBody({arhead, ardata, objconf, multiconf}) {

  const {ismultiaction, set_ismultiaction, multivalues, set_multivalues} = useContext(TableContext)

  const add_all = () => {
    const keys = ardata.map(objrow => parseInt(objrow.id))
    set_multivalues(keys)
  }  

  const remove_all = () => {
    set_multivalues([])
  }

  useEffect(()=>{
    if(ismultiaction) add_all()
    else remove_all()

    return ()=> console.log("tablebody unmounting")
  },[ismultiaction])
  
  const is_singleactions = objconf => {
    if(!is_defined(objconf.ACTIONS)) return false
    const actions = Object.keys(objconf.ACTIONS)
    if(actions.length === 0) return false
    return true
  }

  const is_multiactions = multiconf => {
    if(!is_defined(multiconf.ACTIONS)) return false
    const actions = Object.keys(multiconf.ACTIONS)
    if(actions.length === 0) return false
    return true
  }  

  const is_singleaction = is_singleactions(objconf)
  const is_multiaction = is_multiactions(multiconf)

  const fieldshead = arhead.map(objh => objh.value)

  const get_tds = objrow => {
    return fieldshead
            .map( strfield => {
              return <td key={get_uuid()}>{objrow[strfield]}</td>
            })
  }

  const get_trs = data => data.map( objrow => {

    return (
      <tr key={get_uuid()}>
        {is_multiaction ? <Tdmultiaction objrow={objrow} objconf={objconf} /> : null }
        {is_singleaction ? <Tdaction objrow={objrow} objconf={objconf} /> : null }
        {get_tds(objrow)}
      </tr>
    ) //return

  })//get_trs

  return (
    <tbody>
      {get_trs(ardata)}
    </tbody>
  )
}

export default TableBody;
