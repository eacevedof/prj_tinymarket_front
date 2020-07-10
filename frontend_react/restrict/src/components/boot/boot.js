import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/global_context';

import db from "../../helpers/localdb"
import {async_gettoken, async_islogged} from '../../modules/login/index'
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

  const {usertoken, set_usertoken, errorg, set_errorg} = useContext(GlobalContext)

  const async_onload = async () => {

    let token = ""

    //lee el token de la bd y lanza peticion al serv para comprobar si es correcta
    const islogged = await async_islogged()

    if(islogged){
      token = db.select("usertoken")
    }
    else{
      token = await async_gettoken()
      db.save("usertoken",token)
    }

    console.log("boot.token:",token)
    if(!token)
      set_errorg({title:"Error", message:"Empty token"})
    else
      set_errorg({})
    
    set_usertoken(token)

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
