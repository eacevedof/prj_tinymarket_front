import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from "../context/global_context"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import LoadingWheel from "../common/loading_wheel"
import NotificationError from "../common/notifications/notification_error"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function Dashboard() {
  
  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)


  return (
    <div className="wrapper">
      <Navbar />

      <Footer />      
    </div>
  )
}

export default Dashboard;
