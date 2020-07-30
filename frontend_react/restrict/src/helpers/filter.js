import {pr, get_urlvalue, is_defined, is_empty} from "helpers/functions"
import { map } from "lodash"

//const get_fields = confs => confs.map(conf =>  conf.fields.map( objf => ({name:`${conf.alias}.${objf.name}`,labels:objf.labels})) )  
const get_fields = confs => confs.
                                    filter(objconf => !is_empty(objconf.table) ).//map(objconf =>  objconf.table.alias)  
                                    //map(objconf => pr(objconf.fields,"FFF"))
                                    map(objconf => objconf.table.fields.map(objf => ({name:`${objconf.table.alias}.${objf.name}`,labels:objf.labels}))).
                                    reduce((arac, arcurr) => [...arac, arcurr])
                                    

const filterget = (confs, query) => {
  //pr(confs);return;
  const conff = get_fields(confs)
  pr(conff)
  return conff
  //devuelve un array de condiciones
  return []
}

export default filterget