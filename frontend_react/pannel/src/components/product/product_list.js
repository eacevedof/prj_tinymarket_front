import React, {useState, useEffect} from 'react';
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import FormProductSearch from "./forms/form_product_search"
import ProductTable from "./product_table"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function ProductList({order,set_order}) {
  
  const [products, set_products] = useState([])
  const [search, set_search] = useState("")

  useEffect(()=>{
    HrefDom.document_title("ECH | products")

    async function load_products(){
      const response = await Api.get_async_products()
      if(response)
        if(response.status === 200)
          set_products(response.data.result)
    }
    load_products()
  },[])

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
