import React, {useContext, useEffect} from 'react';

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
        <th>Actions</th>
        {get_tds(arhead)}
      </tr>
    </thead>
  )
}

export default TableHead;
