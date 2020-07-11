import React from 'react';
import {Route} from "react-router-dom";
import ProductIndex from "./index"


function RoutesProduct() {
  return (
    <>
    <Route path="/admin/product">
      <ProductIndex />
    </Route>
    <Route exact path="/admin/product/:id">
      <>prod id</>
    </Route>
    <Route exact path="/admin/product/update/:id">
      <>update</>
    </Route>
    <Route exact path="/admin/product/delete/:id">
      <>deletex</>
    </Route>
    <Route exact path="/admin/product/delete-logic/:id">
      <>delete logic</>
    </Route>    
    <Route exact path="/admin/product/clone/:id">
      <>clone</>
    </Route>        
    </>
  )
}

export default RoutesProduct;
