import React, {useEffect, useContext} from 'react';
import {TableContext} from "helpers/bootstrap/tableaction/tablecontext"
import { is_defined, get_uuid, pr } from 'helpers/functions';


function TableHead({arhead, objconf, multiconf}) {

  const {ismultiaction, set_ismultiaction, multivalues} = useContext(TableContext)

  const is_conf_singleactions = objconf => {
    if(!is_defined(objconf.ACTIONS)) return false
    const actions = Object.keys(objconf.ACTIONS)
    if(actions.length === 0) return false
    return true
  }

  const is_conf_multiaction = multiconf => {
    if(!is_defined(multiconf.ACTIONS)) return false
    const actions = Object.keys(multiconf.ACTIONS)
    if(actions.length === 0) return false
    return true
  }

  const on_multicheck = evt => {
    const ischecked = evt.target.checked
    set_ismultiaction(ischecked)
  }

  useEffect(()=>{
    console.log("tablehead.mounting")
    return ()=> console.log("tablehead.unmounting")
  },[multivalues])

  //boton multiaction
  const get_th_multiaction = multiconf => is_conf_multiaction(multiconf) && multivalues.length > 0 ? (
    <tr>
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
    </tr>
  ) : null  

  const get_th_checkall = ()=> (
    <th>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="chk-all" onChange={on_multicheck} checked={ismultiaction} />
        <label className="form-check-label" htmlFor="chk-all"></label>
      </div>
    </th>    
  )

  const get_th_action = () => <th>Action</th>

  const get_tds = ar => ar.map( (objth,i) => <th key={i} scope="col">{objth.text}</th>) // get_tds

  return (
    <thead>
      {get_th_multiaction(multiconf)}
      
      <tr>
        { is_conf_multiaction(multiconf) ? get_th_checkall() :null }
        { is_conf_singleactions(objconf) ? get_th_action() : null }
        { get_tds(arhead) }
      </tr>
    </thead>
  )
}

export default TableHead;
