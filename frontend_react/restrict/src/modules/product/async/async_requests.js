import { is_defined } from "helpers/functions"
import apidb from "providers/apidb"

import {get_obj_entity} from "./queries/queries_entity"
import {get_obj_insert} from "./queries/queries_insert"
import {get_obj_update} from "./queries/queries_update"
import {get_obj_delete} from "./queries/queries_delete"

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
  const objparam = {fields:{...formdata}}
  const objquery = get_obj_insert(objparam)
  const r = await apidb.async_insert(objquery)
  return r
}

export const async_update = async (formdata)=>{
  const fieldsdel = ["delete_date","insert_date","update_date","i"]

  const keys = ["id"]
  //esto habría que hacerlo con async
  const temp = {...formdata}
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