import React, {createContext, useState} from 'react';
//import objorder from "../../models/order"
import _ from "lodash"

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const [strsearch, set_strsearch] = useState("")
  
  return (
    <ProductContext.Provider
      value={{
        strsearch, set_strsearch
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider