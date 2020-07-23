import { is_defined, get_datenow, pr } from "helpers/functions"
import apidb from "providers/apidb"
import apiup from "providers/apiupload"

import {get_obj_entity} from "./queries/query_entity"
import {get_obj_insert} from "./queries/query_insert"
import {get_obj_update} from "./queries/query_update"
import {get_obj_delete} from "./queries/query_delete"

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
  let r = await apiup.async_post(formdata.url_image)
  let url_image = ""

  if(!is_defined(r.error)) url_image = r.file_1
  //console.log("product.async_request.async_insert.r",r)

  const objparam = {fields:{...formdata, url_image}}
  const objquery = get_obj_insert(objparam)

  r = await apidb.async_insert(objquery)
  return r
}

export const async_update = async (formdata)=>{
  const keys = ["id"]
  //esto habría que hacerlo con async
  const temp = {...formdata}
  const fieldsdel = ["delete_date","insert_date","update_date","i"]
  fieldsdel.forEach(field =>{
    delete temp[field] 
  })
  
  const dbfields = Object.keys(temp).map(field_name => ({field_name}))
  const objparam = {fields:temp, keys}
  const objquery = get_obj_update(objparam, dbfields)
  //console.log("objparam",objquery)
  const r = await apidb.async_update(objquery)
  return r
}

export const async_delete = async (formdata)=>{
  const keys = ["id"]
  //esto habría que hacerlo con async
  const temp = {...formdata}

  const objparam = {fields:temp, keys}
  const objquery = get_obj_delete(objparam, keys)
  //console.log("objparam",objquery)
  const r = await apidb.async_delete(objquery)
  return r
}

export const async_clone = async (formdata)=>{
  const temp = {...formdata}
  const fieldsdel = ["delete_date","delete_user","insert_date","update_date","i","id"]
  fieldsdel.forEach(field => {
    delete temp[field] 
  })

  temp.description = "(clone of ".concat(formdata.id).concat(" - ").concat(temp.description)
  temp.insert_user = "clone ".concat(formdata.id)
  temp.update_user = "clone ".concat(formdata.id)

  const objparam = {fields:temp}
  const objquery = get_obj_insert(objparam)
  const r = await apidb.async_insert(objquery)

  return r
}

export const async_deletelogic = async (formdata)=>{
  const keys = ["id"]

  const objdellog = {
    id:formdata.id,
    delete_user:"react",
    delete_date:get_datenow(),
    delete_platform: "1",
  }
  
  //comprobar si ya estaba borrado
  const dbfields = [{field_name:"id"},{field_name:"delete_date"},{field_name:"delete_user"},{field_name:"delete_platform"}]
  const objparam = {fields:objdellog, keys}
  const objquery = get_obj_update(objparam, dbfields)
  const r = await apidb.async_update(objquery)
  return r
}
