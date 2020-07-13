import apidb from "../../../providers/apidb"
import {get_obj_entity} from "../queries/queries_entity"

export const async_get_by_id = async (id) => {
  if(!id) return []
  const objparam = {filters:{id}}
  const query = get_obj_entity(objparam)
  const r = await apidb.async_get_list(query)
  return r
}