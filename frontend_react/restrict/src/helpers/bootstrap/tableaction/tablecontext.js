//tablecontext.js
import React, {createContext, useState} from 'react';

export const TableContext = createContext();

const TableProvider = props => {
  
  const [ismultiaction, set_ismultiaction] = useState(false)
  const [multiaction, set_multiaction] = useState("")
  const [multivalues, set_multivalues] = useState([])
  const [issingle, set_issingle] = useState(false) 
  
  return (
    <TableContext.Provider
      value={{
        ismultiaction, set_ismultiaction,
        multiaction, set_multiaction,
        multivalues, set_multivalues,
        issingle, set_issingle,
      }}
    >
      {props.children}
    </TableContext.Provider>
  )
  
}

export default TableProvider