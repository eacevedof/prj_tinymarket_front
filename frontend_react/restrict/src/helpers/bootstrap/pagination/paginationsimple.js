import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";

function PaginationSimple({page,objconf}){

  const [search, set_search] = useState("")
  const [issubmitting, set_issubmitting] = useState(false)

  const on_submit = (evt)=>{
  
  }

  useEffect(()=>{
    return ()=> console.log("PaginationSimple unmounting")
  },[])

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">

        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li className="page-item">
          <NavLink className="page-link" exact to={"/admin/products/1"}>1</NavLink>
        </li>

        <li className="page-item">
          <NavLink className="page-link" exact to={"/admin/products/2"}>2</NavLink>
        </li>
        
        <li className="page-item">
          <NavLink className="page-link" exact to={"/admin/products/3"}>3</NavLink>
        </li>
        
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

      </ul>
    </nav>
  )
}

export default PaginationSimple;
