//App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
  //useRouteMatch,
  //useParams
} from "react-router-dom";
import ProductList from './components/product/product_list';
import OrderDetail from "./components/order/order_detail"
import objorder from "./models/order"
import LocalDb from "./helpers/local_db"
import E404 from "./components/errors/404/e404"
import _ from "lodash"
import "./index.css"

function App(){

  const [order, set_order] = useState(objorder)
  console.log("App.order ",order)

  useEffect(() => {
    console.log("app.useffect")
    if(order.products.length === 0){
      const dborder = LocalDb.select("order")
      if(!_.isEmpty(dborder)){
        console.log("app.useeffect.dborder ...loading from localstorage",dborder)
        set_order(dborder)
      }
    }
  }, []);

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <ProductList order={order} set_order={set_order}/>
        </Route>        
        
        <Route path="/order">
          <OrderDetail order={order} set_order={set_order}/>
        </Route>
                    
        <Route path="/">
          <E404/>
        </Route>
      </Switch>
    </Router>
  );
}//App

export default App;