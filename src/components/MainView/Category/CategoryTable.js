import React,{useState,useEffect,useLayoutEffect,useCallback} from 'react';
import axiosInstance from '../../Helpers/Axios'
import Pagination from '../../Pagination/Pagination'
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import CategoryTableData from './CategoryTableData';
import axios from 'axios';
const url='http://localhost:5000/api/category'
function CategoryTable({show}) {

const [IsPopupOpen,changePopupOpen]=useState(true)
  const store=(localStorage.getItem('token'));
    const [access_token, setAccessToken] = useState(store);
    const[items,SetItems]=useState([]);
    const [CurrentPage,setCurrentPage]=useState(1);
    const[postPerPage,setPostsPerPage]=useState(4);
        useEffect(()=>{
          changePopupOpen(show)
            fetchingPosts();
          },[show])

        const fetchingPosts=useCallback(async ()=>{
            axios.get(url,{
                headers: {
                  "Content-Type": "application/json",
                 "Authorization": `Bearer ${access_token}`
                }
              })
                .then(res => {
              
                    SetItems(res.data)
                  
                })
                .catch((error) => {
                    console.log(error);
                });       
        })
     

    const indexOfLastPost=CurrentPage*postPerPage;
    const indexofFirstPost=indexOfLastPost-postPerPage;
    const CurrentPosts=items.slice(indexofFirstPost,indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber); 
    if(!items[0]=='')
    {
      return (
        <>
      
     
         <Row className="BreadcrumbStyle mt-4">
         <Table className=" table-striped w-100 table-sm ">
          <thead>
            <tr>
              <th>SN</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
      
              <CategoryTableData items={CurrentPosts} />
    
        </Table>
        </Row>
        <div className="float-right mt-2">
        <Pagination paginate={paginate} postPerPage={postPerPage} totalPoste={items.length}/>
        </div>
        </>
    );

    }
    return(
      <>

      </>
    )
   
}

export default CategoryTable;