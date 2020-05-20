import React, {useContext} from 'react';
import {GlobalContext} from "../context/global_context"

function LoadingWheel() {

  const {is_loading} = useContext(GlobalContext)

  return (
    <>
      {
        is_loading ? <img src="/assets/img/loading.gif" /> : null
      }
    </>
  )
}

export default LoadingWheel;
