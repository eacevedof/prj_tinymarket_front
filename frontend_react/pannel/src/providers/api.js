import axios from "axios"
//import get_localip from "../../helpers/get_localip"
const BASE_URL = process.env.REACT_APP_BASEURLAPI


const Api = {
  //localip: get_localip(),

  get_async_products: async () => {
    const url = `${BASE_URL}/products`
    
    try {
      console.log("api.get_async_products...",url)
      const response = await axios({url,method:"GET"}) 
      return response
    } catch (e) {
      console.error("ERROR: api.get_async_products.url:",url)
    }
  },

}

export default Api;