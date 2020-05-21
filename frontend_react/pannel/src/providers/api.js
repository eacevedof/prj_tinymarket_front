import axios from "axios"
//import get_localip from "../../helpers/get_localip"
const BASE_URL = process.env.REACT_APP_BASEURLAPI


const Api = {
  //localip: get_localip(),

  get_async_products: async (search="") => {
    const url = `${BASE_URL}/api/v1/products?page=1&perpage=100&s=${search}`
    
    try {
      console.log("api.get_async_products...",url)
      const response = await axios({url,method:"GET"}) 
      console.log("api.get_async_products.response",response)
      return response
    } catch (e) {

      console.error("ERROR: api.get_async_products.url:",url,"e:",e)
    }
  },

  get_async_chekcemail: async (email="") => {
    const url = `${BASE_URL}/api/v1/user/email`
    const data = {
      email
    }
    
    try {
      console.log("api.get_async_chekcemail...",url)
      //const response = await axios({url,method:"post", data})
      const response = await axios.post(url, data)
      //const response = await axios({url, method:"get"})
      console.log("api.get_async_chekcemail.response",response)
      return response
    } catch (e) {
      console.error("ERROR: api.get_async_chekcemail.url:",url,"e:",e)
    }
  },  
}

export default Api;