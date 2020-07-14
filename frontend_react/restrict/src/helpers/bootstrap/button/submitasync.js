import React, {useContext} from 'react';

//type: primary, secondary, success, danger, warning, info, light, dark
function SubmitAsync({innertext, type, issubmitting}) {
  console.log("submit",innertext, type, issubmitting)

  if(!type) type="success"

  const butcss = `btn btn-${type}`
  const disabled = issubmitting ? "disabled" : null
  const strloading = " Loading..."

  return (
    <button type="submit" className="btn btn-primary" disabled={disabled}>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {strloading}
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
