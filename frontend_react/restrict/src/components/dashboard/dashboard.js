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
  
  async function async_load_products(s){
    console.log("async is_laoding: true")
    set_is_loading(true)
    
    const response = await Api.get_async_products(s)

    if(response.error){
      set_is_loading(false)
      set_is_error(true)
      return 
    }

    if(response)
      if(response.status === 200)
        set_products(response.data.result)

    console.log("async is_laoding: false")
    set_is_loading(false)
    set_is_error(false)

  }

  useEffect(()=>{
    console.log("Dashboard.useEffect search",search)
    HrefDom.document_title("Admin | Dashboard")
    //https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    async_load_products(search)
    
    return ()=> console.log("unmounting")
  },[search])

  return (
    <div className="wrapper">
      Hola Q tal
      <Navbar />

        <Footer />
      
    </div>
  )
}

export default Dashboard;
