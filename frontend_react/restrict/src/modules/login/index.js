//import React, {useContext, useState, useEffect} from 'react';
import apiauth from '../../providers/apiauth';
import db from "../../helpers/localdb"

const USER = "fulanito"
const PASSWORD = "menganito"


const async_login = async () => {
  const objuser = {username:USER,password:PASSWORD}
  console.log("login.index.objuser",objuser)
  const usertoken = await apiauth.async_get_usertoken(objuser)
  
  //alert(usertoken)
  if(usertoken.error) 
    throw "Error in login"
  
  console.log("login.index ok",usertoken)
  db.save("usertoken",usertoken)
}

const async_is_valid = async () => {
  const objuser = {username:USER,password:PASSWORD}
  console.log("login.index.objuser",objuser)
  const usertoken = await apiauth.async_get_usertoken(objuser)
  
  //alert(usertoken)
  if(usertoken.error) 
    throw "Error in login"
  
  console.log("login.index ok",usertoken)
  db.save("usertoken",usertoken)
}




export default async_login;