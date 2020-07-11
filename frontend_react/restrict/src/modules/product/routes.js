import React from 'react';
import {Route} from "react-router-dom";
import ProductIndex from "./index"
import ProductInsert from "./form_insert"
import ProductClone from "./form_clone"
import ProductUpdate from "./form_update"
import ProductDetail from "./detail"
import ProductDelete from "./form_delete"

function RoutesProduct() {
  return (
    <>
    <Route exact path="/admin/product/insert">
      <ProductInsert />
    </Route>    
    <Route exact path="/admin/product/:id">
      <ProductDetail />
    </Route>
    <Route exact path="/admin/product/update/:id">
      <ProductUpdate />
    </Route>
    <Route exact path="/admin/product/delete/:id">
      <ProductDelete />
    </Route>
    <Route exact path="/admin/product/delete-logic/:id">
      <ProductDelete />
    </Route>    
    <Route exact path="/admin/product/clone/:id">
      <ProductClone />
    </Route>
    <Route exact path="/admin/product">
      <ProductIndex />
    </Route>    
    </>
  )
}

export default RoutesProduct;
