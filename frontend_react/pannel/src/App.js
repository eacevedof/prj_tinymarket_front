//App.js
import React, {useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
  //useRouteMatch,
  //useParams
} from "react-router-dom";
import GlobalProvider, {GlobalContext} from './components/context/global_context';
import ProductList from './components/product/product_list';
import OrderDetail from "./components/order/order_detail"
import objorder from "./models/order"

import LocalDb from "./helpers/local_db"
import E404 from "./components/errors/404/e404"
import _ from "lodash"
import "./index.css"


function App(){

  const [order, set_order] = useState(objorder)
  const [search, set_search] = useState("")

  console.log("App.order ",order)

  useEffect(() => {
    console.log("app.useffect.search",search)
    if(order.products.length === 0){
      const dborder = LocalDb.select("order")
      if(!_.isEmpty(dborder)){
        console.log("app.useeffect.dborder ...loading from localstorage",dborder)
        set_order(dborder)
      }
    }
  }, []);

  return (
    <GlobalProvider>
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
    </GlobalProvider>
  );
}//App

export default App;