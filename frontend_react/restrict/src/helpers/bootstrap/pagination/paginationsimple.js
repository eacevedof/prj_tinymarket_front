import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { pr } from 'helpers/functions';

function PaginationSimple({objconf}){

  const ipage = parseInt(objconf.page)
  const [npages, set_npages] = useState(0)
  const [urls, set_urls] = useState([])

  const get_buttons = (ipage,ipages) => {

    if(ipages==0) return []
    if(ipages==1) return [1]

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

    return buttons
  }

  const on_load = () => {
    //pr(objconf,"obconf")
    const ipages = objconf.ippage>0 ? Math.ceil(objconf.foundrows / objconf.ippage) : 0
    const buttons = get_buttons(ipage, ipages)
    const arurls = [...Array(ipages).keys()].filter(i => buttons.includes(i+1)).map(ipage => ({url:`${objconf.url}/${ipage+1}`, text:ipage+1}))

    set_npages(ipages)
    set_urls(arurls)
  }

  useEffect(()=>{
    on_load()
    return ()=> console.log("paginationsimple unmounting")
  },[objconf.page, objconf.foundrows])

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          objconf.page >1 ? (
            <li className="page-item">
              <NavLink className="page-link" exact to={objconf.url.concat(`/${parseInt(objconf.page)-1}`)}>&laquo;</NavLink>
            </li>
          ):null
        }

        {
          urls.map((objurl,i) => (
            objurl.text==objconf.page ?
              (<li key={i} className="page-item active">
              <NavLink className="page-link" exact to={objurl.url}>{objurl.text}</NavLink>
              </li>)
              :
              (<li key={i} className="page-item">
              <NavLink className="page-link" exact to={objurl.url}>{objurl.text}</NavLink>
              </li>)          
          ))
        }
        
        {
          objconf.page < npages ? (
            <li className="page-item">
              <NavLink className="page-link" exact to={objconf.url.concat(`/${parseInt(objconf.page)+1}`)}>&raquo;</NavLink>
            </li>
          ):null
        }

      </ul>
    </nav>
  )
}

export default PaginationSimple;
