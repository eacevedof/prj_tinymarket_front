import React, {useEffect} from 'react';

function InputSearch({arhead}) {

  useEffect(()=>{
    return ()=> console.log("inputsearch unmounting")
  },[])

  return (
    <form>
      <div className="mb-3">
        <input type="email" className="form-control" aria-describedby="search" placeholder="filter" />
        <div id="txt-search" className="form-text">
          se puede usar como comandos
        </div>
      </div>
    </form>
  )
}

export default InputSearch;
