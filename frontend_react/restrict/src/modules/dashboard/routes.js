import React from 'react';
import {Switch,Route} from "react-router-dom";
import DashboardIndex from "./index"


function RoutesDashboard() {
  return (

      <Route exact path="/admin">
        <DashboardIndex />
      </Route>

  )
}

export default RoutesDashboard;
