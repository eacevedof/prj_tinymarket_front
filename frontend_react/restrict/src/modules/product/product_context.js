import React, {createContext, useState} from 'react';
//import objorder from "../../models/order"
import _ from "lodash"

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const [txtsearch, set_txtsearch] = useState("")
  
  return (
    <ProductContext.Provider
      value={{
        txtsearch, set_txtsearch
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider