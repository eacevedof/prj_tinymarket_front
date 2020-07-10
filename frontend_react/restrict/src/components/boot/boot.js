import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/global_context';

import {async_login, async_islogged} from '../../modules/login/index'
import Dashboard from '../../modules/dashboard/dashboard';
import ProductIndex from "../../modules/product/index"

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


function Boot() {

  const {usertoken, set_usertoken} = useContext(GlobalContext)

  const async_onload = async () => {

    await async_login()
  

  }

  useEffect(() => {
    
    console.log("boot.useeffect")
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
          <>orders</>
        </Route>

        <Route path="/admin/clients">
          <>clients</>
        </Route>
                    
        <Route path="*" status={404}>
          <E404/>
        </Route>
      </Switch>
    </Router>
  )

}//Boot


export default Boot;
