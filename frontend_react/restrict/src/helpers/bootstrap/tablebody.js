import React, {useContext, useEffect} from 'react';

function TableBody({arhead, ardata}) {

  useEffect(()=>{
    return ()=> console.log("tablebody unmounting")
  },[])

  const fieldshead = arhead.map(objh => objh.value)

  const get_tds = objrow => {
    const fields = Object.keys(objrow)
    //{value:fieldname, text:label}
    return fields.filter(strfield => fieldshead.includes(strfield)).map( strfield => {
      return <td>{objrow[strfield]}</td>
    })


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
