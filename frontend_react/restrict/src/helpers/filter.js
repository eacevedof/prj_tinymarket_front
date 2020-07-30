import {pr, get_urlvalue, is_defined, is_empty} from "helpers/functions"
import { map } from "lodash"

//const get_fields = confs => confs.map(conf =>  conf.fields.map( objf => ({name:`${conf.alias}.${objf.name}`,labels:objf.labels})) )  
const get_fields = confs => confs.
                                    filter(objconf => !is_empty(objconf.table) ).//map(objconf =>  objconf.table.alias)  
                                    //map(objconf => pr(objconf.fields,"FFF"))
                                    map(objconf => objconf.table.fields.map(objf => ({name:`${objconf.table.alias}.${objf.name}`,labels:objf.labels}))).
                                    reduce((arac, arcurr) => [...arac, ...arcurr])
                                    
const get_values = arlabels => arlabels.map(strlabel => get_urlvalue(strlabel)).filter(strval => strval!="")[0] || ""

const get_fields_vals = arfields => {
  const arvalues = arfields.map(objfield => ({name:objfield.name, value:get_values(objfield.labels)}))
  return arvalues
}

const filterget = (confs, query) => {
  //pr(confs);return;
  const arfields = get_fields(confs)
  const arvalues = get_fields_vals(arfields)

  return arvalues
  //devuelve un array de condiciones
}

export default filterget