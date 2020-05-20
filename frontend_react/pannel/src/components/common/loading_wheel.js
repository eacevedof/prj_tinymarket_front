import React from 'react';

function LoadingWheel({is_loading}) {

  return (
    <>
      {
        is_loading ? <img src="/assets/img/loading.gif" /> : null
      }
    </>
  )
}

export default LoadingWheel;
