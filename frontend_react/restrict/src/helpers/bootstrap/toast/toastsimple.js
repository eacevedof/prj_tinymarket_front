import React, {useEffect, useState} from 'react';

//type: primary, secondary, success, danger, warning, info, light, dark
function ToastSimple({message, title, isvisible}) {

  const [show, set_show] = useState(isvisible)

  const close = () => set_show(false)
  

  useEffect(()=>{
    console.log("toastsimple.useffect")
    return ()=> console.log("toastsimple unmounting")
  },[])

  if(show)
    return (
      <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <img src="..." className="rounded mr-2" alt="..." />
          <strong className="mr-auto">{title}</strong>
          <small>11 mins ago</small>
          <button type="button" className="ml-2 mb-1 close" onClick={close} data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    )
    else return (null)
}

export default ToastSimple;
