import React, {createContext, useState} from 'react';
import objorder from "../../models/order"
import _ from "lodash"

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  console.log("globalprovider.start.objorder.reset()",objorder.reset())

  const [user, set_user] = useState({})
  const [products, set_products] = useState([])
  const [search, set_search] = useState("")
  const [order, set_order] = useState(objorder)
  const [order_total, set_order_total] = useState(0)
  const [selproduct, set_selproduct] = useState({})
  const [is_loading, set_is_loading] = useState(false)

  //esto publica todo lo que va estar disponible hacia afuera
  return (
    <GlobalContext.Provider
      value={{
        products, set_products, search, set_search, order, set_order,
        selproduct, set_selproduct, user, set_user, is_loading, set_is_loading,
        order_total, set_order_total
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider