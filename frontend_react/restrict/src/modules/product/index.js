import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from "../../components/context/global_context"
//import Navbar from "../../components/common/navbar"
//import Footer from "../../components/common/footer"
//import NumberModal from "../modal/number_modal"
//import FormProductSearch from "./forms/form_product_search"
//import LoadingWheel from "../../components/common/loading_wheel"
//import ProductTable from "./product_table"
//import NotificationError from "../../components/common/notifications/notification_error"

import HrefDom from "../../helpers/href_dom"
//import Api from "../../providers/api"
import apidb from "../../providers/apidb"
import {get_obj_list, config, grid} from "../../modules/product/queries"


function ProductIndex() {
  
  const {errorg, set_errorg} = useContext(GlobalContext)

  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)
  
  async function async_load_products(){

    const objparam = {page:{},filters:{}}
    const objquery = get_obj_list(objparam)
    const response = await apidb.async_get_list(objquery)

  }

  const async_onload = async () => {
    console.log("ProductIndex.useEffect errorg",errorg)
    HrefDom.document_title("Admin | Products")
    await async_load_products()
  }

  useEffect(()=>{
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_onload()
    
    return ()=> console.log("product.index unmounting")
  },[])

  return (
    <>
    Product index
    </>
  )
}

export default ProductIndex;
