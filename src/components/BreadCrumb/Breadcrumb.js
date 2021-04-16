import React from 'react';
import { brown } from '../../colors';
import './BreadCrumbStyle.css'

const breadcrumb={
    backgroundColor:"white",
    borderRadius:'0.37'
}
const Breadcrumb=(props)=>{
    function isLast(index){
        return index===props.crumbs.length-1;
    }
    return(
        // <nav className="row">
            <nav className="mainbody-section nopadding text-center">
        <ol className="breadcrumb" style={breadcrumb}>
        {
            props.crumbs.map((crumb,ci)=>{
                const disabled=isLast(ci)?"disabled" : "";
                return(
                   <button className={`btn btn-link ${disabled} `} onClick={()=>props.selected(crumb)}>
                    {crumb}
                </button>
          
                    // <li key={ci}  className="breadcrumb-item align-item-center"
                    // >
                    
                    // </li>
                )
            })
        }
        </ol>
        </nav>
    )

}
export default Breadcrumb;
