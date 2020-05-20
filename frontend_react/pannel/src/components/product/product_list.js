import React, {useContext, useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {GlobalContext} from "../context/global_context"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import FormProductSearch from "./forms/form_product_search"
import LoadingWheel from "../common/loading_wheel"
import ProductTable from "./product_table"
import LocalDb from "../../helpers/local_db"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function ProductList() {
  
  const {products, set_products, order,set_order, search, set_search} = useContext(GlobalContext)

  const [is_loading, set_is_loading] = useState(false)
  
  async function async_load_products(s){
    console.log("async is_laoding: true")
    set_is_loading(true)
    
    const response = await Api.get_async_products(s)
    if(response)
      if(response.status === 200)
        set_products(response.data.result)

    console.log("async is_laoding: false")
    set_is_loading(false)
  }

  useEffect(()=>{
    console.log("productlist.useEffect search",search)
    HrefDom.document_title("ECH | products")
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_load_products(search)
    
    return ()=> console.log("unmounting")
  },[search])

  return (
    <div className="wrapper">
      <div className="main-panel">
        <Navbar />
        <div className="content">
          <div className="container-fluid z-index-2000">
            <FormProductSearch />
            <LoadingWheel is_loading={is_loading} />
            <ProductTable products={products} order={order} set_order={set_order} search={search}/>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ProductList;
