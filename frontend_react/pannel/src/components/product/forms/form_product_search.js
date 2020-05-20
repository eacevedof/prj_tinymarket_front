import React,{useContext, useState, useEffect, useRef} from 'react';
import {GlobalContext} from '../../context/global_context';
//import LocalDb from "../../../helpers/local_db"
//import styles from "./formsearch.module.css"

function FormProductSearch() {

  const {search, set_search} = useContext(GlobalContext)

  const [txtsearch, set_txtsearch] = useState(search)
  const inputtxtsearch = useRef(null)

  const on_submit = (e)=>{
    e.preventDefault()
    console.log("on submit search")
    console.log("onsubmit.txtsearch setting to search",txtsearch)
    set_search(txtsearch)
    //LocalDb.save("txtsearch",txtsearch)
  }

  const on_search_change = (e)=>{
    const strsearch = e.target.value
    set_txtsearch(strsearch)
    //console.log("formproductsearch.on_search_change.strsearch",strsearch)
  }

  const reset = (e)=>{
    //set_search("")
    set_txtsearch("")
    inputtxtsearch.current.focus()
    //LocalDb.save("txtsearch","")
  }

  useEffect(() => {
    console.log("(no hay logica) formproductsearch.useEffect search",search)
    set_txtsearch(search)
  }, []);

  return (
    <>
     <form onSubmit={on_submit} > 
      <div className="form-row align-items-center">
        <div className="col-md-3">
          {
            txtsearch!=="" ? (
              <button 
                type="button" 
                className="btn btn-dark btn-fill pull-right"
                onClick={reset}
              ><i className="nc-icon nc-simple-remove"></i></button>
            ): null
          }
        </div>         
        <div className="col-md-6">
          <label className="sr-only" htmlFor="txt-search">Search</label>
          <div className="input-group mb-2">
            <input 
              ref={inputtxtsearch}
              id="txt-search"
              type="text"
              className="form-control" 
              value={txtsearch}
              placeholder="Search" 
              onChange={on_search_change}
              />
          </div>
        </div>
        <div className="col-md-3">
          <button 
            type="submit" 
            className="btn btn-primary btn-fill pull-left"
            >Go <i className="nc-icon nc-zoom-split"></i></button>
        </div>           
      </div>
     </form>
     <hr/>
     </>
  )
}

export default FormProductSearch;
