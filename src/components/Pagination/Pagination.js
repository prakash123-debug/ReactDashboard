import React from 'react';

const Pagination=({postPerPage,totalPoste,paginate})=>{
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalPoste/postPerPage);i++){
        pageNumbers.push(i);
    }
    return (
       
        
             <nav>
            <ul className="pagination">
                {
                    pageNumbers.map((number)=>{
                       return(
                        <li key={number} className="page-item">
                        <span onClick={()=>paginate(number)} className="page-link">{number}</span>
                    </li>
                       ) 
                    })
                }
            </ul>
        </nav>
      
    )
}

export default Pagination