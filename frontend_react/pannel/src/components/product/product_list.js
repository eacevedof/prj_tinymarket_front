import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import FormProductSearch from "./forms/form_product_search"
import ProductTable from "./product_table"
import LocalDb from "../../helpers/local_db"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function ProductList({order,set_order, search, set_search}) {
  
  const [products, set_products] = useState([])
  
  async function async_load_products(s){

    const response = await Api.get_async_products(s)
    if(response)
      if(response.status === 200)
        set_products(response.data.result)
  }

  useEffect(()=>{
    console.log("productlist.useEffect search",search)
    HrefDom.document_title("ECH | products")
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_load_products(search)
    return ()=>false
  },[search])
  
  // useMemo(() => {
  //   console.log("productlist.useMemo search",search)
  //   HrefDom.document_title("ECH | products")
  //   async_load_products(search)    
  // }, [search])

  // useCallback(() => {
  //   console.log("productlist.useMemo search",search)
  //   HrefDom.document_title("ECH | products")
  //   async_load_products(search)    
  // }, [search])  

  return (
    <div className="wrapper">
      <div className="main-panel">
        <Navbar order={order} />
        <div className="content">
          <div className="container-fluid z-index-2000">
            <FormProductSearch search={search} set_search={set_search}/>
            <ProductTable products={products} order={order} set_order={set_order} search={search}/>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ProductList;
