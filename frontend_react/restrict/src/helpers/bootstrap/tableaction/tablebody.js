import React, {useContext, useEffect} from 'react';

import Tdaction from "./tdaction"

function TableBody({arhead, ardata, objconf}) {

  useEffect(()=>{
    return ()=> console.log("tablebody unmounting")
  },[])

  const fieldshead = arhead.map(objh => objh.value)

  const get_tds = objrow => {
    return fieldshead
            .map( (strfield,i) => {
              return <td key={i}>{objrow[strfield]}</td>
            })
  }

  const get_trs = data => data.map( (objrow,i) => {
    console.log("objrow",objrow)
    return (
      <tr key={i}>
        <Tdaction objrow={objrow} objconf={objconf} />
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
