import React, {useEffect} from 'react';
import TableHead from "./tablehead"
import TableBody from "./tablebody"

function TableAction({arhead, ardata, objconf, fnmultiselect, fnmultiaction}) {

  useEffect(()=>{
    return ()=> console.log("tableaction unmounting")
  },[])

  return (
    <table className="table">
      <TableHead arhead={arhead} objconf={objconf} />
      <TableBody arhead={arhead} ardata={ardata} objconf={objconf} />
    </table>
  )
}

export default TableAction;
