import apiauth from '../../providers/apiauth'
import db from "../../helpers/localdb"
import {is_undefined, is_defined} from "../../helpers/functions"

const USER = "fulanito"
const PASSWORD = "menganito"

export const async_gettoken = async () => {
  const objuser = {username: USER, password: PASSWORD}
  console.log("login.index.objuser",objuser)
  const usertoken = await apiauth.async_get_usertoken(objuser)
  
  if(is_defined(usertoken.error))
    return ""

  return usertoken
}// async_gettoken

export const async_islogged = async () => {

  const usertoken = db.select("usertoken")
  if(!usertoken) return false

  //true | obj.error
  const response = await apiauth.async_is_validtoken()
  //alert(response)
  console.log("modules.login.async_islogged.async_is_validtoken.response",response)

  if(is_defined(response.error)){
    return false
  }  

  return true

} // async_islogged
