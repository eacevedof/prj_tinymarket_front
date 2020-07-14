import apidb from "../../../providers/apidb"
import {get_obj_entity} from "../queries/queries_entity"
import {get_obj_insert} from "../queries/queries_insert"
import {get_obj_update} from "../queries/queries_update"

import { is_defined } from "../../../helpers/functions"


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
  const objinsert = get_obj_insert(objparam)
  const r = await apidb.async_insert(objinsert)
  return r
}