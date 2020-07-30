import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"

import { pr } from 'helpers/functions';
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
  
  const history = useHistory()
  const [result, set_result] = useState([])
  const [foundrows, set_foundrows] = useState(0)

  async function async_load_products(){
    const r = await async_get_list(page)

    //pr(r,"R")
    set_result(r.result)
    //pr(r.foundrows)
    set_foundrows(r.foundrows)
  }

  const async_onload = async () => {
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
  },[page])
  
  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="mt-2 mb-2">Products</h1>
        <Breadscrumb arbreads={[]}/>
        <InputSearch text="xx" />
        <TableAction arhead={grid.headers} ardata={result} objconf={null} />
        <PaginationSimple objconf={{page,foundrows,ippage:10,url:"/admin/products"}} />
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
