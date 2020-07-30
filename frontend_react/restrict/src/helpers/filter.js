import {pr, get_urlvalue, is_defined, is_empty} from "helpers/functions"

const get_fields = confs => confs.
                              filter(objconf => !is_empty(objconf.table) ).
                              map(objconf => objconf.table.fields.map(objf => ({name:`${objconf.table.alias}.${objf.name}`,labels:objf.labels}))).
                              reduce((arac, arcurr) => [...arac, ...arcurr])
                                    
const get_values = arlabels => arlabels.map(strlabel => get_urlvalue(strlabel)).filter(strval => strval!="")[0] || ""

const get_fields_vals = arfields => {
  const arvalues = arfields.map(objfield => ({name:objfield.name, value:get_values(objfield.labels) }))
  return arvalues
}

const filterget = (confs) => {
  //pr(confs);return;
  const arfields = get_fields(confs)
  const arvalues = get_fields_vals(arfields)
  const filters = arvalues.filter(obj => obj.value!="").map(obj => `${obj.name} LIKE '%${obj.value}%'`)
  return filters
  //devuelve un array de condiciones
}

export default filterget