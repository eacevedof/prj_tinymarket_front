import React, {useState, useEffect} from 'react';
import async_get_useralias from "components/common/sysfields"
import {pr} from "helpers/functions"

function Sysfields({sysdata}){
    
  const objdefault = {
    insert_date: "",
    insert_user: "",
    update_date: "",
    update_user: "",
    delete_date: "",
    delete_user: "",
  }

  const [objsys, set_objsys] = useState({...objdefault})

  const async_onload = async () => {
    //const objsysdata = {...sysdata}
    //pr(objsysdata)
    //const id = objsysdata.insert_user
    //const insert_user = await async_get_useralias(objdefault.insert_user)
    //const insert_user = await async_get_useralias(objsysdata.insert_user)
    //const update_user = await async_get_useralias(objsysdata.update_user)
    //const delete_user = await async_get_useralias(objsysdata.delete_user)

    //const temp = {...objsys, insert_user, update_user, delete_user}
    //set_objsys(temp)
  }

  useEffect(()=>{
    async_onload()
    return () => console.log("sysfields.unmount")
  },[])  

  return (
    <>
      <div className="row">
        <div className="col-3">Created at:</div>
        <div className="col-3">{sysdata.insert_date}</div>
        <div className="col-3">Created by:</div>
        <div className="col-3">{sysdata.insert_user}</div>              
      </div>
      <div className="row">
        <div className="col-3">Modified:</div>
        <div className="col-3">{sysdata.update_date}</div>
        <div className="col-3">Modified by:</div>
        <div className="col-3">{sysdata.update_user}</div>                        
      </div>
      {
        sysdata.delete_date!=""?
        (
          <div className="row">
            <div className="col-3">Delete:</div>
            <div className="col-3">{sysdata.delete_date}</div>
            <div className="col-3">Delete by:</div>
            <div className="col-3">{sysdata.delete_user}</div>                        
          </div>          
        ): null
      }
    </>
  )

}

export default Sysfields;
