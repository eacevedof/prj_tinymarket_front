import React, {createContext, useState} from 'react';

export const GlobalContext = createContext();

const GlobalProvider = (props) => {

  const [products, set_products] = useState([])
  const [search, set_search] = useState("")
  const [order, set_order] = useState({})
  const [modalnum, set_modalnum] = useState({})

  //esto publica todo lo que va estar disponible hacia afuera
  return (
    <GlobalContext.Provider
      value={{
        products, set_products, search, set_search, order, set_order,
        modalnum, set_modalnum
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider