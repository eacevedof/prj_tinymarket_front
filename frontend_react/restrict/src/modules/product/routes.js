import React from 'react';
import {Route} from "react-router-dom";
import ProductIndex from "./index"


function Routes() {
  return (
    <Route path="/admin/product">
      <ProductIndex />
    </Route>
  )
}

export default Routes;
