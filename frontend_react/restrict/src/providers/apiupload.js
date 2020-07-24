import axios from "axios"
import db from "helpers/localdb"

// https://github.com/eacevedof/prj_svelte/blob/master/tools/src/components/Tools.svelte
const BASE_URL = process.env.REACT_APP_BASEURLAPI

const Apiupload = {
  
  async_post: async (inputfile) => {
    //const url = `${BASE_URL}/api/v1/products?page=1&perpage=100&s=${search}`
    const url = `http://localhost:4000/upload`
    const uploadtoken = db.select("token_upload")
    
    if(!inputfile || inputfile.name==="") return {file_1:""}

    console.log("apiupload.async_post.inputfile",inputfile)

    if(!uploadtoken) throw "Upload token not found!"
    
    try {
      const data = new FormData()
      data.append("resource-usertoken",uploadtoken)
      data.append("folderdomain","tinymarket.es")
      data.append("file_1", inputfile)
      const response = await axios.post(url, data)
      //console.log("apiupload.async_post.response:",response)
      console.log("apiupload.async_post.response.data.data.url:",response.data.data.url)
      const objurl = response.data.data.url
      return objurl
    } 
    catch (e) {
      console.error("ERROR: apiupload.async_post.url:",url,"e:",e)
      return {
        error: "Error uploading file. "+e
      }      
    }
  },  

}

export default Apiupload;