import React, {useContext, useEffect} from 'react';

function TableBody({arhead},{ardata}) {

  useEffect(()=>{
    return ()=> console.log("tablebody unmounting")
  },[])

  const get_tds = arrow => arrow.map((objf, i) => {

    return arhead.map(objh => {
      return (
        <td>xxx</td>
      )
    });
    
  })

  const get_trs = data => data.map( (arrow,i) => {
    console.log("arrow",arrow)
    return (
      <tr key={i}>
        {get_tds(arrow)}
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
