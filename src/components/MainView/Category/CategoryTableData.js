import React,{useState,useEffect} from 'react';
import { BsPencil,BsTrash } from "react-icons/bs";
import EditCategoryModal from '../../Modals/CategoryModal/EditCategoryModal';

const CategoryTableData = ({items})=> {
  // console.log(items)
        const[AllItem,SetAllItem]=useState([])
    const[ModalData,GetModalData]=useState('');
    const [OpenModal,handleOpenModal]=useState(false)
  const closeModalHandler =()=> handleOpenModal(false);
  useEffect(()=>{
    SetAllItem(items);
  });
  if(!AllItem.length==0)
  {
    return(
      <>
       
       <tbody>
        {
            AllItem.map((index,i)=>{
            
                   return(
                      
                    <tr onDoubleClick={()=>{
                        GetModalData(index)
                        handleOpenModal(true)
                    }
                    } key={index.id} value={index.id}>
                    <td>{i+1}</td>
                    <td>{index.categoryName}</td>
                    <td>
                        <button className="btn btn-warning"><BsPencil/></button>&nbsp;
                        <button className="btn btn-danger"><BsTrash/></button>
                    </td>
                    </tr>
                   
                   ) 
            })
        }
      </tbody>
      
       <EditCategoryModal item={AllItem} shows={OpenModal} ModalData={ModalData}  close={closeModalHandler}/>
      </>
    )
  }

    return (
        <>
        {/* { console.log(AllItem)} */}

      </>
    );
}

export default CategoryTableData;