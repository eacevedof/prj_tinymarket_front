import React, {useContext, useEffect} from 'react';

import {TableContext} from "helpers/bootstrap/tableaction/tablecontext"
import DropdownTable from "helpers/bootstrap/dropdown/dropdowntable"
import TableHead from "helpers/bootstrap/tableaction/tablehead"
import TableBody from "helpers/bootstrap/tableaction/tablebody"

import { pr } from 'helpers/functions';

function TableAction({arhead, ardata, objconf, multiconf}) {

  const {multivalues, set_multiaction} = useContext(TableContext)

  useEffect(()=>{
    console.log("tableaction.mounting")
    return ()=> console.log("tableaction.unmounting")
  },[multivalues])

  return (
    <>
      {
        multivalues.length > 0 ? <DropdownTable multiconf={multiconf} set_action={set_multiaction} /> : null
      }
      
      <table className="table">
        <TableHead arhead={arhead} objconf={objconf} multiconf={multiconf} />
        <TableBody arhead={arhead} ardata={ardata} objconf={objconf} multiconf={multiconf} />
      </table>
    </>
  )
}

export default TableAction;
