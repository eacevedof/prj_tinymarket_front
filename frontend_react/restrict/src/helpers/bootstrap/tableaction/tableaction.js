import React, {useContext, useEffect} from 'react';

import {TableContext} from "helpers/bootstrap/tableaction/tablecontext"
import TableHead from "helpers/bootstrap/tableaction/tablehead"
import TableBody from "helpers/bootstrap/tableaction/tablebody"
import { pr } from 'helpers/functions';

function TableAction({arhead, ardata, objconf, multiconf}) {

  const {ismultiaction, set_ismultiaction} = useContext(TableContext)

  useEffect(()=>{
    return ()=> console.log("tableaction unmounting")
  },[])

  return (
    <table className="table">
      <TableHead arhead={arhead} objconf={objconf} multiconf={multiconf}  />
      <TableBody arhead={arhead} ardata={ardata} objconf={objconf} multiconf={multiconf} />
    </table>
  )
}

export default TableAction;
