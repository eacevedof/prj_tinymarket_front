import { is_defined, pr } from "helpers/functions"
import apidb from "providers/apidb"
import apiup from "providers/apiupload"
import get_filterand from "helpers/filter"

import {get_obj_list, filterconf} from "./queries/query_list"
import {get_obj_entity} from "./queries/query_entity"
import {get_obj_insert} from "./queries/query_insert"
import {get_obj_update} from "./queries/query_update"
import {get_obj_delete} from "./queries/query_delete"
import {get_obj_deletelogic} from "./queries/query_deletelogic"


export const async_get_list = async (page) => {

  const ippage = 10
  const ifrom = ((page<1 ? 1:page) - 1) * ippage

  const objfilter = get_filterand(filterconf)
  const objparam = {page:{ippage,ifrom},filters:objfilter}
  const objquery = get_obj_list(objparam)
  //pr(objquery,"objquery")
  const r = await apidb.async_get_list(objquery)
  
  if(is_defined(r.error)) return []
  //pr(r); return []
  if(is_defined(r.result.length))
    return r.result
  return r
}

export const async_get_by_id = async (id) => {
  //alert("id:"+id)
  if(!id) return []
  const objparam = {filters:{fields:[{field:"id",value:id}]}}
  const query = get_obj_entity(objparam)
  const r = await apidb.async_get_list(query)
  if(is_defined(r.result.length))
    return r.result[0]
  return r
}

export const async_insert = async (formdata)=>{
  //console.log("product.async_request.async_insert.formdata",formdata)
  let url_image = ""

  let r = await apiup.async_post(formdata.url_image)
  if(!is_defined(r.error)) url_image = r.file_1
  //console.log("product.async_request.async_insert.r",r)

  const objparam = {fields:{...formdata, url_image}}
  const objquery = get_obj_insert(objparam)

  r = await apidb.async_insert(objquery)
  return r
}

export const async_update = async (formdata)=>{
  console.log("url_image",formdata.url_image)
  
  let r = null
  let url_image = formdata.url_image
  
  if(formdata.url_image && is_defined(formdata.url_image.name)){
    r = await apiup.async_post(formdata.url_image)
    if(!is_defined(r.error)) url_image = r.file_1
  }
  //pr(url_image,"url_image")
 
  const keys = ["id"]
  //esto habría que hacerlo con async
  const temp = {...formdata,url_image}
  const fieldsdel = ["delete_date","insert_date","update_date","i"]
  fieldsdel.forEach(field =>{
    delete temp[field] 
  })
  
  const dbfields = Object.keys(temp).map(field_name => ({field_name}))
  const objparam = {fields:temp, keys}
  const objquery = get_obj_update(objparam, dbfields)
  //console.log("objparam",objquery)
  r = await apidb.async_update(objquery)
  return r
}

export const async_delete = async (formdata)=>{
  const keys = ["id"]
  //esto habría que hacerlo con async
  const objparam = {fields:{...formdata}, keys}
  //pr(objparam,"objparam");
  const objquery = get_obj_delete(objparam)
  //console.log("objparam",objquery)
  //pr(objquery,"objquery")
  const r = await apidb.async_delete(objquery)
  //pr(r,"async_delete.r")
  return r
}

export const async_clone = async (formdata)=>{
  const temp = {...formdata}
  const fieldsdel = ["i","id"]
  fieldsdel.forEach(field => {
    delete temp[field] 
  })

  temp.description = "(clone of ".concat(formdata.id).concat(") - ").concat(temp.description)
  
  const objparam = {fields:temp}
  const objquery = get_obj_insert(objparam)
  const r = await apidb.async_insert(objquery)

  return r
}

export const async_deletelogic = async (formdata)=>{
  const keys = ["id"]

  const objdellog = {
    id: formdata.id,
  }
  
  const dbfields = [{field_name:"id"}]
  const objparam = {fields:objdellog, keys}
  const objquery = get_obj_deletelogic(objparam, dbfields)
  const r = await apidb.async_update(objquery)
  return r
}
