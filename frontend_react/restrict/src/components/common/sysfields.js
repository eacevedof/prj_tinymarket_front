import React, {useState, useEffect} from 'react';
import async_get_useralias from "components/common/sysfields"
import {is_defined, pr} from "helpers/functions"

function Sysfields({sysdata}){
  //pr("sysfields:")
  //pr(sysdata)

  const objdefault = {
    insert_date: "a",
    insert_user: "b",
    update_date: "c",
    update_user: "d",
    delete_date: "e",
    delete_user: "f",
  }

  const [objsys, set_objsys] = useState({...objdefault})

  const async_onload = async () => {
    //pr(objdefault)
    //pr(sysdata)
    //const objsysdata = {...sysdata}
    //pr(objsysdata)
    //const id = objobjsys.insert_user
    //const insert_user = await async_get_useralias(objdefault.insert_user)
    //const insert_user = await async_get_useralias(objobjsys.insert_user)
    //const update_user = await async_get_useralias(objobjsys.update_user)
    //const delete_user = await async_get_useralias(objobjsys.delete_user)

    //const temp = {...objsys, insert_user, update_user, delete_user}
    set_objsys({...objdefault, ...sysdata})
    pr("objsys to async_onload")
    pr(objsys)
  }

  useEffect(()=>{
    async_onload()
    //pr(sysdata)
    //set_objsys({...objdefault, ...sysdata})
    return () => console.log("sysfields.unmount")
  
  },[sysdata])  

  return (
    <>
      <h4>sysfields</h4>
      <div className="row">
        <div className="col-3">Created at:</div>
        <div className="col-3">{objsys.insert_date}</div>
        <div className="col-3">Created by:</div>
        <div className="col-3">{objsys.insert_user}</div>              
      </div>
      <div className="row">
        <div className="col-3">Modified:</div>
        <div className="col-3">{objsys.update_date}</div>
        <div className="col-3">Modified by:</div>
        <div className="col-3">{objsys.update_user}</div>                        
      </div>
      {
        is_defined(objsys.delete_date) && objsys.delete_date!=null && objsys.delete_date!=="" ?
        (
          <div className="row">
            <div className="col-3">Delete:</div>
            <div className="col-3">{objsys.delete_date}</div>
            <div className="col-3">Delete by:</div>
            <div className="col-3">{objsys.delete_user}</div>                        
          </div>          
        ): null
      }
    </>
  )

}

export default Sysfields;
