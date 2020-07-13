import apidb from "../../../providers/apidb"
import {get_obj_entity} from "../queries/queries_entity"
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