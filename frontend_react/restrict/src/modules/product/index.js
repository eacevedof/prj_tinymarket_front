import React, {useContext, useState, useEffect} from 'react';
import {is_defined,pr} from "../../helpers/functions"
import {GlobalContext} from "../../components/context/global_context"
import Navbar from "../../components/common/navbar"
import Footer from "../../components/common/footer"
//import NumberModal from "../modal/number_modal"
//import FormProductSearch from "./forms/form_product_search"
//import LoadingWheel from "../../components/common/loading_wheel"
//import ProductTable from "./product_table"
//import NotificationError from "../../components/common/notifications/notification_error"

import {async_islogged} from '../../modules/login/index'
import HrefDom from "../../helpers/href_dom"
//import Api from "../../providers/api"
import apidb from "../../providers/apidb"
import {get_obj_list, config, grid} from "./query_list"
import { useHistory } from 'react-router-dom';


function ProductIndex() {
  
  const {errorg, set_errorg, usertoken} = useContext(GlobalContext)

  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)
  
  
  const [result, set_result] = useState([])
  const history = useHistory()
  


  async function async_load_products(){

    const objparam = {page:{},filters:{}}
    const objquery = get_obj_list(objparam)
    const response = await apidb.async_get_list(objquery)
    console.table(response.result)
    set_result(response.result)
  }

  const async_onload = async () => {
    //alert("products async onload")
    console.log("product.async_onload")

    HrefDom.document_title("Admin | Products")

    const islogged = await async_islogged()
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

  const get_trs = result => result.map( (product,i) => {
    
    const units = 2

    return (
      <tr key={product.id}>
        <td>{i+1}</td>
        <td>{product.code_erp}</td>
        <td>{product.description}</td>
        <td>{product.description_full}</td>
        
        <td>{product.slug}</td>
        <td>{product.units_min}</td>
        <td>{product.units_max}</td>
        <td>{product.price_gross}</td>
        <td>{product.price_sale}</td>
        <td>{product.price_sale1}</td>
        <td>{product.price_sale2}</td>
      </tr>
    ) //return
  })//get_trs



  const trs = get_trs(result)
  return (
    <>
      <Navbar />
      <main className="container">
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Nº</th>
            <th scope="col">Código</th>
            <th scope="col">Desc.</th>
            <th scope="col">Desc. L</th>
            <th scope="col">Slug</th>
            <th scope="col">U. min</th>
            <th scope="col">U. max</th>
            <th scope="col">P. gross</th>
            <th scope="col">P. sale</th>
            <th scope="col">P. sale 1</th>
            <th scope="col">P. sale 2</th>
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
        </table>
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
