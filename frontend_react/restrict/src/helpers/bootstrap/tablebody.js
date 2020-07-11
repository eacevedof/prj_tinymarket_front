import React, {useContext, useEffect} from 'react';

function TableBody({arhead, ardata}) {

  useEffect(()=>{
    return ()=> console.log("tablebody unmounting")
  },[])

  const get_tds = () => {
    return (
      <td>xxx</td>
    )
  }

  const get_trs = data => data.map( (objrow,i) => {
    console.log("objrow",objrow)
    return (
      <tr key={i}>
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
