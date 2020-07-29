import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"

import { pr } from 'helpers/functions';
import HrefDom from "helpers/href_dom"

import {async_islogged} from 'modules/login/login_index'
import {async_get_list} from "./async/async_requests"

import {grid} from "./async/queries/query_list"
import { useHistory } from 'react-router-dom';

import Navbar from "components/common/navbar"
import Footer from "components/common/footer"
import TableAction from "helpers/bootstrap/tableaction/tableaction"
import Breadscrumb from 'components/common/bootstrap/breadscrumb';


function ProductIndex() {

  const {page} = useParams()
  
  const history = useHistory()
  const [result, set_result] = useState([])

  async function async_load_products(){

    const filters = {}
    const r = await async_get_list(page, filters)
    //pr(grid)
    set_result(r)
  }

  const async_onload = async () => {
    console.log("product.index.async_onload")
    HrefDom.document_title("Admin | Products")

    const islogged = await async_islogged()
    if(islogged){
      //await async_load_products()
      async_load_products()
    }
    else{
      history.push("/admin")
    }
  }

  useEffect(()=>{
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_onload()

    return ()=> console.log("product.index unmounting")
  },[])
  
  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="mt-2 mb-2">Products</h1>
        <Breadscrumb arbreads={[]}/>
        <TableAction arhead={grid.headers} ardata={result} objconf={null} />
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
