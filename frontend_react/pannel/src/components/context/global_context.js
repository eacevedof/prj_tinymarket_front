import React, {createContext, useState} from 'react';
import objorder from "../../models/order"

export const GlobalContext = createContext();

const GlobalProvider = (props) => {

  const [user, set_user] = useState({})
  const [products, set_products] = useState([])
  const [search, set_search] = useState("")
  const [order, set_order] = useState(objorder)
  const [modalnum, set_modalnum] = useState({})

  //esto publica todo lo que va estar disponible hacia afuera
  return (
    <GlobalContext.Provider
      value={{
        products, set_products, search, set_search, order, set_order,
        modalnum, set_modalnum, user, set_user
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider