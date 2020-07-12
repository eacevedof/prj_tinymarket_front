import React, {useContext, useState, useEffect} from 'react';
import {is_defined,pr} from "../../helpers/functions"
import {GlobalContext} from "../../components/context/global_context"
import Navbar from "../../components/common/navbar"
import Footer from "../../components/common/footer"

import {async_islogged} from '../login/index'
import HrefDom from "../../helpers/href_dom"
import apidb from "../../providers/apidb"
import {get_obj_list, config, grid} from "./queries/query_list"
import { useHistory } from 'react-router-dom';
import TableAction from "../../helpers/bootstrap/tableaction/tableaction"
import Breadscrumb from '../../components/common/bootstrap/breadscrumb';


function ProductIndex() {
  
  const {errorg, set_rrorg, usertoken} = useContext(GlobalContext)

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
      //alert("loaded")
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
      <Navbar />
      <main className="container">
        <Breadscrumb arbreads={[]}/>
        <TableAction arhead={grid.headers} ardata={result} araction={[]} />
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
