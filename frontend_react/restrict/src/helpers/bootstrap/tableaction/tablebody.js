import React, {useContext, useEffect} from 'react';

import Tdaction from "./tdaction"

function TableBody({arhead, ardata, araction}) {

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
        <Tdaction araction={araction} />
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
