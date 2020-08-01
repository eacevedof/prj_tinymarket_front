import React, {useEffect} from 'react';

function TableHead({arhead}) {

  useEffect(()=>{
    return ()=> console.log("tablehead unmounting")
  },[])

  const get_tds = ar => ar.map( (objth,i) => {
    return (
      <th key={i} scope="col">{objth.text}</th>
    )
  })// get_tds

  return (
    <thead>
      <tr>
        <th>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="chk-all" />
            <label className="form-check-label" htmlFor="chk-all"></label>
          </div>
        </th>
        <th>
          Action
        </th>
        {get_tds(arhead)}
      </tr>
    </thead>
  )
}

export default TableHead;
