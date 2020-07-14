import React, {useContext} from 'react';

//type: primary, secondary, success, danger, warning, info, light, dark
function SubmitAsync({innertext, type, issubmitting}) {
  if(!type) type="success"

  const butcss = `btn btn-${type}`
  const disabled = issubmitting ? "disabled" : ""
  const strloading = "...loading"

  return (
    <button  type="button" className="btn btn-primary" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
  )

  return (
    <button type="submit" className={butcss} disabled={disabled}>
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

export default SubmitAsync;
