import React, {useContext, useState, useEffect} from 'react';
import apiauth from '../../providers/apiauth';
import db from "../../helpers/localdb"

const USER = "fulanito"
const PASSWORD = "pepino123"

function LoginIndex() {
  
  const [is_error, set_is_error] = useState(false)
  const [strerror, set_strerror] = useState({title:"",message:""})

  async function async_login(){
    const objuser = {username:USER,password:PASSWORD}
    const usertoken = await apiauth.async_get_usertoken(objuser)
    
    if(usertoken.error) {
      error.title = "Error"
      set_is_error(true)
      set_strerror({title:"Error",message: usertoken.error.toString()})
      return
    }

    db.save("usertoken",usertoken)
  }

  useEffect(()=>{
    async_login()
    
    return ()=> console.log("unmounting")
  },[])

  return (
    <>
    login
    </>
  )

}// LoginIndex

export default LoginIndex;
