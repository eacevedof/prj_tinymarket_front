import React from 'react';
import {Switch,Route} from "react-router-dom";
import DashboardIndex from "./index"


function RoutesDashboard() {
  return (
    <Switch>
      <Route exact path="/admin">
        <DashboardIndex />
      </Route>
    </Switch>
  )
}

export default RoutesDashboard;
