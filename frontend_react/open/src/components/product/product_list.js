import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from "../context/global_context"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import NumberModal from "../modal/number_modal"
import FormProductSearch from "./forms/form_product_search"
import LoadingWheel from "../common/loading_wheel"
import ProductTable from "./product_table"
import NotificationError from "../common/notifications/notification_error"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function ProductList() {
  
  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)
  
  async function async_load_products(s){
    console.log("async is_laoding: true")
    set_is_loading(true)
    
    const response = await Api.get_async_products(s)

    if(response.error){
      set_is_loading(false)
      set_is_error(true)
      return 
    }

    if(response)
      if(response.status === 200)
        set_products(response.data.result)

    console.log("async is_laoding: false")
    set_is_loading(false)
    set_is_error(false)

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
      <Navbar />
      <div className="main-panel">
        <br id="totop" /><br/>
        <div className="content">
          <div className="container-fluid z-index-2000">
            <FormProductSearch />
            {
              is_loading ? 
                <LoadingWheel /> 
              : is_error ? 
                  <NotificationError title="Error fetching products" message="Please check your internet connection" />
                :
                  <ProductTable />
            }           
          </div>
        </div>
        <Footer />
      </div>
      <NumberModal />
    </div>
  )
}

export default ProductList;
