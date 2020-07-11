import React, {useContext, useEffect} from 'react';
//import {GlobalContext} from '../context/global_context';

function TableHead({arhead}) {

  //const ar = Array.from(arhead)

  useEffect(()=>{
    
    return ()=> console.log("tablehead unmounting")
  },[])


  const get_tds = ar => ar.map( (objth,i) => {
    return (
        <th key={i} scope="col">{objth.text}</th>
    )
  })// get_tds
  
  let tds = (<th>-</th>)

  console.log("arhead",arhead,"length:",arhead.length,", isarray:",Array.isArray(arhead))
  if(Array.isArray(arhead)){
    tds = get_tds(arhead)
    console.log("tds:",tds)
  }
  
  return (
    <thead>
      <tr>
      {tds}
      </tr>
    </thead>
  )
}

export default TableHead;
