import React, {useEffect} from 'react';

//type: primary, secondary, success, danger, warning, info, light, dark
function RefreshAsync({innertext, issubmitting, fnrefresh}) {
  const type="success"
  const cssbutton = `btn btn-info`
  const disabled = issubmitting ? "disabled" : null
  const strloading = " Loading..."

/*  
  useEffect(()=>{
    console.log("refreshasync.useffect")
    return ()=> console.log("refreshasync unmounting")
  },[issubmitting])
*/

  return (
    <button type="button" className={cssbutton} disabled={disabled} onClick={fnrefresh()}>
      {issubmitting ?
        (<>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {strloading}
        </>)
      :
        innertext
      }
    </button>
  )

}

export default RefreshAsync;
