import React, {useEffect, useState} from 'react';

function InputSearch(){

  const [search, set_search] = useState("")

  useEffect(()=>{
    return ()=> console.log("inputsearch unmounting")
  },[])

  return (
    <form className="row g-3">
      <div className="col-8">
        <input type="text" className="form-control" aria-describedby="search" placeholder="filter" />
        <div className="form-text">
          se puede usar como comandos
        </div>
      </div>
      <div className="col-4">
        <button type="submit" className="btn btn-primary">search</button>
      </div>
    </form>
  )
}

export default InputSearch;
