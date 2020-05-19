import React,{useState} from 'react';
import LocalDb from "../../../helpers/local_db"
//import styles from "./formsearch.module.css"

function FormProductSearch({search,set_search}) {


  const on_submit = (e)=>{
    e.preventDefault()
    console.log("on submit search")
    //set_search()
    //LocalDb.dropdb()
    //llamada a api
  }

  const on_search_change = (e)=>{
    const strsearch = e.target.value
    set_search(strsearch)
    console.log("formproductsearch.on_search_change.search",search)
  }

  return (
    <>
     <form onSubmit={on_submit}> 
      <div className="form-row align-items-center">
        <div className="col-md-6">
          <label className="sr-only" htmlFor="txt-search">Search</label>
          <div className="input-group mb-2">
            <input 
              type="text" 
              className="form-control" 
              defaultValue={search}
              placeholder="Search" 
              onChange={on_search_change}
              />
          </div>
        </div>
        <div className="col-md-6">
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
