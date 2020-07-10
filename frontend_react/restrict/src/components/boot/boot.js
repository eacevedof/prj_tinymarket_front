import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/global_context';

import asynclogin from '../../modules/login/index'
import Dashboard from '../../modules/dashboard/dashboard';
import ProductIndex from "../../modules/product/index"
import OrderDetail from "../order/order_detail"


import LocalDb from "../../helpers/localdb"
import E404 from "../errors/404/e404"
import _ from "lodash"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
  //useRouteMatch,
  //useParams
} from "react-router-dom";
import Localdb from '../../helpers/localdb';

function Boot() {

  const {user, set_user, order, set_order, search, set_search} = useContext(GlobalContext)
  console.log("App.order ",order)

  const async_onload = async () => {

    await asynclogin()

    console.log("app.useffect.search",search)
    if(_.isEmpty(order) || order.products.length === 0){
      const dborder = LocalDb.select("order")
      if(!_.isEmpty(dborder)){
        console.log("app.useeffect.dborder ...loading from localstorage",dborder)
        set_order(dborder)
      }
    }

    if(_.isEmpty(user) || !user.id){
      const dbuser = Localdb.select("user")
      if(!_.isEmpty(dbuser))
        set_user(dbuser)
    }
  }

  useEffect(() => {
    async_onload()

  }, []);


  return (
    <Router>
      <Switch>

        <Route exact path="/admin">
          <Dashboard />
        </Route>
        
        <Route path="/admin/products">
          <ProductIndex />
        </Route>

        <Route path="/admin/orders">
          <OrderDetail order={order} set_order={set_order} search={search}/>
        </Route>

        <Route path="/admin/clients">
          <OrderDetail order={order} set_order={set_order} search={search}/>
        </Route>
                    
        <Route path="*" status={404}>
          <E404/>
        </Route>
      </Switch>
    </Router>
  )
}


export default Boot;
