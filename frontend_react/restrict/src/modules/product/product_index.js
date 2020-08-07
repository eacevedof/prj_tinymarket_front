import React, {useContext, useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom"

import { pr } from 'helpers/functions';
import db from "helpers/localdb" 
import HrefDom from "helpers/href_dom"

import {async_islogged} from 'modules/login/login_index'
import {async_get_list} from "modules/product/async/async_requests"

import {grid, CONFIG, get_pages} from "modules/product/async/queries/query_list"

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
    const r = await async_get_list(page, txtsearch)
    const ipages = get_pages(r.foundrows)

    if(page>ipages) history.push(CONFIG.URL_PAGINATION.replace("%page%",1))

    set_result(r.result)
    set_foundrows(r.foundrows)
  }

  const async_onload = async () => {
    //pr(txtsearch)
    console.log("product.index.async_onload")
    const islogged = await async_islogged()
    if(islogged){
      HrefDom.document_title("Admin | Products")
      
      const search = db.select(CONFIG.CACHE_KEY)
      if(!txtsearch && search){
        set_txtsearch(search)
        return
      }
      
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
        <Breadscrumb urls={CONFIG.SCRUMBS}/>
        
        <InputSearch cachekey={CONFIG.CACHE_KEY} fnsettext={set_txtsearch} foundrows={foundrows} />

        <PaginationSimple objconf={{page, foundrows, ippage:CONFIG.PERPAGE, url:CONFIG.URL_PAGINATION}} />
        <TableAction arhead={grid.headers} ardata={result} objconf={CONFIG} />
        <PaginationSimple objconf={{page, foundrows, ippage:CONFIG.PERPAGE, url:CONFIG.URL_PAGINATION}} />
      </main>
      <Footer />
    </>
  )
}

export default ProductIndex;
