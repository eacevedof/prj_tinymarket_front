import React, {useEffect, useState, useRef} from 'react';

import SubmitAsync from 'helpers/bootstrap/button/submitasync';

function InputSearch({text, fnsettext, foundrows}){

  const [issubmitting, set_issubmitting] = useState(false)
  const [error, set_error] = useState("")
  const [success, set_success] = useState("")
  const refsearch = useRef(null)

  const formdefault = {
    search: ""
  }

  const [formdata, set_formdata] = useState({...formdefault})

  const get_id = elem => {
    const idpref = elem.id || ""
    const parts = idpref.split("-")
    //console.log("parts",parts)
    if(parts.length>1) return parts[1]
    //console.log("elem.idpref",idpref)
    return idpref
  }

  const updateform = evt =>{
    const elem = evt.target
    set_formdata({search:elem.value})
    console.log("updateform.formdata",formdata)
  }

  const on_submit = async (evt)=>{
    console.log("product.insert.on_submit.formdata:",formdata)
    evt.preventDefault()

    set_issubmitting(true)
    set_error("")
    set_success("")

    try {
      fnsettext(formdata.search)
      refsearch.current.focus()
    } 
    catch (error) {
      //console.log("error:",error.toString())
      set_error(error.toString())
    } 
    finally {
      set_issubmitting(false)
    }
    
  }// on_submit

  useEffect(()=>{
    return ()=> console.log("inputsearch unmounting")
  },[])  


  return (
    <form className="row" onSubmit={on_submit}>
      <div className="col-8">
        <input type="text" className="form-control" aria-describedby="search" placeholder="filter" 
          
          ref={refsearch}
          value={formdata.search}
          onChange={updateform}        
        />
        <div className="form-text">
          regs: {foundrows}
        </div>
      </div>
      <div className="col-4">
        <SubmitAsync innertext="Search" type="primary" issubmitting={issubmitting} />
      </div>
    </form>
  )
}

export default InputSearch;
