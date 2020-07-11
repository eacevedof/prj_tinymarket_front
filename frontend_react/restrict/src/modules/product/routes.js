import React from 'react';

import ProductIndex from "./index"
import ProductInsert from "./form_insert"
import ProductClone from "./form_clone"
import ProductUpdate from "./form_update"
import ProductDetail from "./detail"
import ProductDelete from "./form_delete"

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
    component: (<ProductDelete />)
  },  
  {
    path:"/admin/product/clone/:id",
    component: (<ProductClone />)
  },  
  {
    path:"/admin/product",
    component: (<ProductIndex />)
  },         
]