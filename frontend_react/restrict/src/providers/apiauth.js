import {BASE_URL} from "../config/constants"
import axios from "axios"
import {is_undefined, pr, get_error} from "../helpers/functions"
import db from "../helpers/localdb"

const Apiauth = {

  async_get_apifytoken: async (objlogin)=>{

    const url = `${BASE_URL}/apifiy/security/login`
    
    try {
      const data = new FormData()
      data.append("user",objlogin.username)
      data.append("password",objlogin.password)
      
      console.log("apidb.async_get_apifytoken",url)
      const response = await axios.post(url, data)

      console.log("apidb.async_get_apifytoken.response",response)
      //pr(response)
      if(is_undefined(response.data.data.token))
        throw new Error("Wrong data received from server. No token")

      return response.data.data.token
    } 
    catch (e) {
      console.error("ERROR: apidb.async_get_apifytoken.url:",url,"e:",e)
      return get_error(e)
    }
  },//async_get_apifytoken

  async_is_validtoken: async () => {
    const apifytoken = db.select("token_dbsapify")
    const url = `${BASE_URL}/apifiy/security/is-valid-token`
    //hay que enviar header: apify-auth: token
    try {

      const data = new FormData()
      data.append("apify-apifytoken",apifytoken)

      console.log("apidb.async_is_validtoken.url",url)
      
      const response = await axios.post(url,data)
      console.log("apidb.async_is_validtoken.response raw",response)
      //pr(response,"async_is_valid_token")
      
      if(is_undefined(response.data.data.isvalid))
        throw new Error("Wrong data received from server. Token validation")

      return response.data.data.isvalid
    } 
    catch (e) {
      console.error("ERROR: apidb.async_is_validtoken.url:",url,"e:",e)
      return get_error(e)
    }    
  },

}//Apiauth

export default Apiauth;