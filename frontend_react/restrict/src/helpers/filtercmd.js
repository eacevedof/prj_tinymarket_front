import { pr, is_empty } from "helpers/functions"

const CMD_SEPARATOR = ";"

const get_fields = arconfs => arconfs.
                                filter(objconf => !is_empty(objconf.table) ).
                                map(objconf => objconf.table.fields.map(objf => ({name:`${objconf.table.alias}.${objf.name}`,labels:objf.labels}))).
                                reduce((arac, arcurr) => [...arac, ...arcurr])

const get_cmdkeyval = strkey => strkey.split(CMD_SEPARATOR).
                                  map(strkv => strkv.trim()).
                                  map(strkv => strkv.split(CMD_SEPARATOR)).
                                  filter(ar => ar.length===2).
                                  map(ar => ({label:ar[0].trim().toLowerCase(),value:ar[1].trim()}))

//const get_valuebylabels = arlabels => arlabels.map(strlabel => get_urlvalue(strlabel)).filter(strval => strval!=="")[0] || ""
const get_value_by_label = (arlblsval, label) => arlblsval.filter(objlblval => objlblval.label === label).map(objlblval => objlblval.value)[0] || ""

const get_value_by_labels = (arlabels, arlblsval) => arlabels.map(label => get_value_by_label(arlblsval, label))

const get_mergedbylabel = (arfieldlbls, arlblval) => arfieldlbls.map(objflbls => ({name:objflbls.name, value:get_value_by_labels(objflbls.labels, arlblval)}))


export const get_filtercmd = (arfilterconf, search) => {
  if(!search) return {}
  const cmd =  search.replace(">","").trim()
  
  const arfieldlabels = get_fields(arfilterconf)  
  const arlblval = get_cmdkeyval(cmd)
  pr(arfieldlabels,"arfieldlabels")
  pr(arlblval,"arlblval")
  const x = get_mergedbylabel(arfieldlabels, arlblval)
  pr(x,"x");return {}

  const arvalues = []
  const objfilter = {
    op: "OR",
    fields: arvalues.filter(obj => obj.value !== "").map(obj => ({field:obj.name, value:obj.value})),
  }   
  return objfilter
}