import React, {useContext, useState, useEffect} from 'react';
import {is_defined,pr} from "../../helpers/functions"
import {GlobalContext} from "../../components/context/global_context"
//import Navbar from "../../components/common/navbar"
//import Footer from "../../components/common/footer"
//import NumberModal from "../modal/number_modal"
//import FormProductSearch from "./forms/form_product_search"
//import LoadingWheel from "../../components/common/loading_wheel"
//import ProductTable from "./product_table"
//import NotificationError from "../../components/common/notifications/notification_error"

import {async_islogged} from '../../modules/login/index'
import HrefDom from "../../helpers/href_dom"
//import Api from "../../providers/api"
import apidb from "../../providers/apidb"
import {get_obj_list, config, grid} from "../../modules/product/queries"
import { useHistory } from 'react-router-dom';



function ProductIndex() {
  
  const {errorg, set_errorg, usertoken} = useContext(GlobalContext)

  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)
  //const [is_logged, set_is_logged] = useState(false)
  const history = useHistory()

  
  async function async_load_products(){

    alert("async products")
    //const objparam = {page:{},filters:{}}
    //const objquery = get_obj_list(objparam)
    //const response = await apidb.async_get_list(objquery)

  }

  const async_onload = async () => {
    //alert("products async onload")
    console.log("product.async_onload")

    HrefDom.document_title("Admin | Products")

    const islogged = await async_islogged()
    //alert(islogged)
    //set_is_logged(islogged)
    if(islogged){
      await async_load_products()
    }
    else{
      //alert("prod notlogged")
      history.push("/admin")
    }
  }

  useEffect(()=>{
    console.log("product.index.useeffect.errorg",errorg)
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
