import React, {useEffect, useState, useRef} from 'react';
import { NavLink } from "react-router-dom";
import { pr } from 'helpers/functions';
import shortid from "shortid"


function PaginationSimple({objconf}){

  const urlpattern = objconf.url
  const ipage = parseInt(objconf.page)
  const foundrows = parseInt(objconf.foundrows)
  const ippage = parseInt(objconf.ippage)


  const refli = useRef(null)
  const [npages, set_npages] = useState(0)
  const [urls, set_urls] = useState([])
  const [hops, set_hops] = useState([])

  const get_uuid = () => shortid.generate()
  
  const get_buttons = (ipage,ipages) => {

    if(ipages==0) return []
    if(ipages==1) return []

    const ibuttons = 8
    const ihalf = Math.ceil(ibuttons/2)

    //botones por izq y derecha
    const idistleft = ipage - 1
    const idistright = ipages - ipage

    let icomplleft=0, icomplright=0, ireall=0, irealr=0

    if(idistleft >= ihalf){
      ireall = ihalf
    }
    else{
      ireall = idistleft
      icomplright = ihalf - idistleft
    }

    if(idistright >= ihalf){
      irealr = ihalf
    }
    else{
      irealr = idistright
      icomplleft = ihalf - idistright
    }    

    ireall = ireall + icomplleft
    irealr = irealr + icomplright
   
    //pr(`page:${ipage}, left:${ireall}, right:${irealr}`)

    let buttons = []
    for(let i=1; i<=ireall; i++) buttons.push(ipage - i)
    buttons.push(ipage)
    for(let i=1; i<=irealr; i++) buttons.push(ipage + i)

    buttons = buttons.sort((a,b) => a-b)
    buttons = [1,...buttons,ipages]
    buttons = Array.from(new Set(buttons)).filter(i => i>0 && i<=ipages)
    return buttons
  }

  const on_load = () => {
    //pr(objconf,"obconf")
    const ipages = ippage>0 ? Math.ceil(foundrows / ippage) : 0
    const buttons = get_buttons(ipage, ipages)
    //pr(buttons,"buttons")
    const arurls = [...Array(ipages).keys()].filter(i => buttons.includes(i+1)).map(ipage => ({url:urlpattern.replace("%page%",ipage+1), text:ipage+1}))

    //si hay boton con puntos [...]
    let hops = []
    if(buttons[1] !== (buttons[0]+1)) hops.push(1)
    if(buttons[buttons.length-1] !== (buttons[buttons.length-2]+1)) hops.push(buttons[buttons.length-2])
  
    //pr(hops,"hops")
    set_hops(hops)
    set_npages(ipages)
    set_urls(arurls)
    //console.log("paginationsimple.on_load:","ipage",ipage,"foundrows",foundrows,"hops",hops,"ipages",ipages,"arurls",arurls)
  }

  useEffect(()=>{
    on_load()
    return ()=> console.log("paginationsimple unmounting")
  },[objconf.page, objconf.foundrows])


  const get_li_button = (url, text) => (
    <li key={get_uuid()} className="page-item" >
      <NavLink className="page-link" exact to={url}>{text}</NavLink>
    </li>
  )

  const get_dotted_button = () => (<li key={get_uuid()}><span className="page-link spanhover">...</span></li>)
  
  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {
          objconf.page >1 ? (
            <li key={get_uuid()} className="page-item">
              <NavLink className="page-link" exact to={urlpattern.replace("%page%",ipage-1)}>&laquo;</NavLink>
            </li>
          ):null
        }

        {
          urls.map((objurl) => (
            objurl.text==objconf.page ?
              (
                <li key={get_uuid()} className="page-item active" ref={refli}>
                  <NavLink className="page-link" exact to={objurl.url}>{objurl.text}</NavLink>
                </li> 
              )
              : //si no es la página actual
              hops.includes(objurl.text) ? get_dotted_button() :get_li_button(objurl.url, objurl.text)
          ))
        }
        
        {
          objconf.page < npages ? (
            <li key={get_uuid("n")} className="page-item">
              <NavLink className="page-link" exact to={urlpattern.replace("%page%",ipage+1)}>&raquo;</NavLink>
            </li>
          ):null
        }

      </ul>
    </nav>
  )
}

export default PaginationSimple
