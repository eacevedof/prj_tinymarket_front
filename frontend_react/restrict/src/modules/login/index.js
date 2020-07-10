import apiauth from '../../providers/apiauth'
import db from "../../helpers/localdb"
import {is_undefined} from "../../helpers/functions"

const USER = "fulanito"
const PASSWORD = "menganito"

export const async_login = async () => {
  const objuser = {username:USER,password:PASSWORD}
  console.log("login.index.objuser",objuser)
  const usertoken = await apiauth.async_get_usertoken(objuser)

  return usertoken

}// async_login

export const async_islogged = async () => {

  const usertoken = db.select("usertoken")
  if(!usertoken) return false

  const response = await apiauth.async_is_validtoken()
  console.log("modules.login.async_islogged.async_is_validtoken.response",response)

  if(!is_undefined(response.error)){
    if(response.error.includes("403"))
      return false
  }  

  return true

} // async_islogged
