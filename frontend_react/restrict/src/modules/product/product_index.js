import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"

//import db from "helpers/localdb" 
import { pr } from 'helpers/functions';
//import {ProductContext} from 'modules/product/product_context';
import HrefDom from "helpers/href_dom"

import {async_islogged} from 'modules/login/login_index'
import {async_get_list} from "./async/async_requests"

import {grid} from "./async/queries/query_list"
import { useHistory } from 'react-router-dom';

import Navbar from "components/common/navbar"
import InputSearch from "helpers/bootstrap/input/inputsearch"
import TableAction from "helpers/bootstrap/tableaction/tableaction"
import PaginationSimple from "helpers/bootstrap/pagination/paginationsimple"
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import Footer from "components/common/footer"

function ProductIndex() {

  const {page} = useParams()
  const [txtsearch, set_txtsearch] = useState("")
  
  const history = useHistory()
  const [result, set_result] = useState([])
  const [foundrows, set_foundrows] = useState(0)

  async function async_load_products(){
    //if(!txtsearch)
    //pr(db.select("products.search"))
    const r = await async_get_list(page, txtsearch)
    const ipages = grid.perpage>0 ? Math.ceil(r.foundrows / grid.perpage) : 0
    //pr(ipages,"ipages")
    if(page>ipages) history.push(`/admin/products/1`)

    set_result(r.result)
    set_foundrows(r.foundrows)
  }

  const async_onload = async () => {
    //pr(txtsearch)
    console.log("product.index.async_onload")
    const islogged = await async_islogged()
    if(islogged){
      HrefDom.document_title("Admin | Products")
      await async_load_products()
    }
    else{
      history.push("/admin")
    }
  }

  useEffect(()=>{
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_onload()

    return ()=> console.log("product.index unmounting")
  },[page, txtsearch])
  
  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="mt-2 mb-2">Products</h1>
        <Breadscrumb arbreads={[]}/>
        
        <InputSearch fnsettext={set_txtsearch} foundrows={foundrows} />

        <PaginationSimple objconf={{page, foundrows, ippage:grid.perpage, url:"/admin/products/%page%"}} />
        <TableAction arhead={grid.headers} ardata={result} objconf={null} />
        <PaginationSimple objconf={{page, foundrows, ippage:grid.perpage, url:"/admin/products/%page%"}} />
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
