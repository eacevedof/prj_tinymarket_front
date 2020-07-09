import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/global_context';

import ProductList from '../product/product_list';
import OrderDetail from "../order/order_detail"

import LocalDb from "../../helpers/local_db"
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
import Localdb from '../../helpers/local_db';

function Boot() {

  const {user, set_user, order, set_order, search, set_search} = useContext(GlobalContext)
  console.log("App.order ",order)

  useEffect(() => {
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

  }, []);


  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <ProductList order={order} set_order={set_order} search={search} set_search={set_search}/>
        </Route>        
        
        <Route path="/order">
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
