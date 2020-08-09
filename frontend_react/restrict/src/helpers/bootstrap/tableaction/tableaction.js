import React, {useState, useEffect} from 'react';
import TableHead from "./tablehead"
import TableBody from "./tablebody"

function TableAction({arhead, ardata, objconf, multiconf}) {



  useEffect(()=>{
    return ()=> console.log("tableaction unmounting")
  },[])

  return (
    <table className="table">
      <TableHead arhead={arhead} objconf={objconf} multiconf={multiconf} />
      <TableBody arhead={arhead} ardata={ardata} objconf={objconf} multiconf={multiconf} />
    </table>
  )
}

export default TableAction;
