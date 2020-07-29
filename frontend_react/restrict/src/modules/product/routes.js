import React from 'react';
import {Redirect} from "react-router-dom"

import ProductIndex from "./product_index"
import ProductInsert from "./forms/product_insert"
import ProductClone from "./forms/product_clone"
import ProductUpdate from "./forms/product_update"
import ProductDetail from "./forms/product_detail"
import ProductDelete from "./forms/product_delete"
import ProductDeleteLogic from "./forms/product_deletelogic"

export const routes = [
  {
    path:"/admin/product/insert",
    component: (<ProductInsert />)
  },
  {
    path:"/admin/product/:id",
    component: (<ProductDetail />)
  },
  {
    path:"/admin/product/update/:id",
    component: (<ProductUpdate />)
  }, 
  {
    path:"/admin/product/delete/:id",
    component: (<ProductDelete />)
  },     
  {
    path:"/admin/product/delete-logic/:id",
    component: (<ProductDeleteLogic />)
  },  
  {
    path:"/admin/product/clone/:id",
    component: (<ProductClone />)
  },  
  {
    path:"/admin/products/:page(\\d+)",
    component: (<ProductIndex />)
  },
  {
    path:"/admin/products/",
    component: (<Redirect to="/admin/products/1" />)
  },  
]