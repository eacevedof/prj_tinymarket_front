import React, {useEffect} from 'react';
import { is_defined, get_uuid } from 'helpers/functions';


function TableHead({arhead, objconf}) {

  useEffect(()=>{
    return ()=> console.log("tablehead unmounting")
  },[])

  const is_multiaction = objconf => {
    if(!is_defined(objconf.MULTIACTIONS)) return false
    const actions = Object.keys(objconf.MULTIACTIONS)
    if(actions.length === 0) return false
    return true
  }

  const get_th_multiaction = objconf => is_multiaction(objconf) ? (
    <tr>
      <th colSpan="2">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="ulmultiaction" data-toggle="dropdown" aria-expanded="false">
          Multiaction
        </button>          
        <ul className="dropdown-menu" aria-labelledby="ulmultiaction">
          {Object.keys(objconf.MULTIACTIONS).map(action => <li key={get_uuid()} ><button className="dropdown-item" type="button">{objconf.MULTIACTIONS[action]}</button></li>)}
        </ul>
      </th>
    </tr>
  ) : null
  
  const get_tds = ar => ar.map( (objth,i) => <th key={i} scope="col">{objth.text}</th>) // get_tds

  return (
    <thead>
      {get_th_multiaction(objconf)}
      <tr>
        { 
          is_multiaction(objconf) ? (
            <>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="chk-all" />
                <label className="form-check-label" htmlFor="chk-all"></label>
              </div>
            </th>
            <th>
              Action
            </th>
            </>
          ):null
        }
        {get_tds(arhead)}
      </tr>
    </thead>
  )
}

export default TableHead;
