import React, {useContext, useEffect} from 'react';
import TableHead from "./tablehead"
import TableBody from "./tablebody"

function TableAction({arhead, ardata}) {

  useEffect(()=>{
    return ()=> console.log("TableAction unmounting")
  },[])

  return (
    <table className="table">
      <TableHead arhead={arhead}/>
      <TableBody arhead={arhead} ardata={ardata} />
    </table>
  )
}

export default TableAction;
