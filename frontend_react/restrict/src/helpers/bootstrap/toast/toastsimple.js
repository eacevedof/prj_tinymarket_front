import React, {useEffect, useState} from 'react';

//type: primary, secondary, success, danger, warning, info, light, dark
function ToastSimple({message, title}) {

  const [isvisible, set_isvisible] = useState(false)
  const [css, set_css] = useState("toast")

  const toggle = () => {
    alert(isvisible)
    set_isvisible(!isvisible)
    alert(isvisible)
    if(isvisible) set_css("toast fade show")
    else set_css("toast")
  }

  useEffect(()=>{
    console.log("toastsimple.useffect")
    set_css("toast fade show")
    return ()=> console.log("toastsimple unmounting")
  },[])


  return (
    <div className={css} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <img src="..." className="rounded mr-2" alt="..." />
        <strong className="mr-auto">{title}</strong>
        <small>11 mins ago</small>
        <button type="button" className="ml-2 mb-1 close" onClick={toggle} data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  )
}

export default ToastSimple;
