import React, {createContext, useState} from 'react';

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [gproducts, set_gproducts] = useState([{id:"prod bbbb"}])
  const [gsearch, set_gsearch] = useState("some search")
  const [gorder, set_gorder] = useState({id:"orrder aaaa"})

  //esto publica todo lo que va estar disponible hacia afuera
  return (
    <GlobalContext.Provider
      value={{
        gproducts, set_gproducts, gsearch, set_gsearch, gorder, set_gorder
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider