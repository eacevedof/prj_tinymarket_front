import React, {useEffect, useState} from 'react';

import SubmitAsync from 'helpers/bootstrap/button/submitasync';

function InputSearch(){

  const [search, set_search] = useState("")
  const [issubmitting, set_issubmitting] = useState(false)

  const on_submit = (evt)=>{
  
  }

  useEffect(()=>{
    return ()=> console.log("inputsearch unmounting")
  },[])

  return (
    <form className="row">
      <div className="col-8">
        <input type="text" className="form-control" aria-describedby="search" placeholder="filter" />
        <div className="form-text">
          se puede usar como comandos
        </div>
      </div>
      <div className="col-4">
        <SubmitAsync innertext="Search" type="primary" issubmitting={issubmitting} />
      </div>
    </form>
  )
}

export default InputSearch;
