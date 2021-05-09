import React,{useState,useEffect} from 'react';
import {Button,Modal} from 'react-bootstrap';
import axiosInstance from '../../Helpers/Axios'



const DeleteAllTableItems=({shows,close,ModalName,ModalId})=>{
    const store=(localStorage.getItem('token'));
    const[disabled,changeDisable]=useState(false);
    const [notification, setbackenderror] = useState(false);
    
  useEffect(() => {
    if(notification)
    {
        const timers = setTimeout(() => {
            setbackenderror(false)
          }, 4000);
    }   
  },[shows]);

  const handleDeleteDatas=()=>{

     axiosInstance.delete(`/dashboard/${ModalName}/${ModalId}`,{
        headers: {
          'Authorization': `token ${store}`
        }
      })
        .then(res => {
            changeDisable(true)
        //   SetbtnDisabled(true)
          setbackenderror(true)  
        })
        .catch((error) => {
          console.log(error);
        });
 

  }

 return(
     <>  
         <Modal
        show={shows}
        onHide={close}
        backdrop="static"
        keyboard={false}
      >
        
          <Modal.Header>
            <Modal.Title>Are You Sure Want To Delete?</Modal.Title>
          </Modal.Header>
          {notification ? (
        <div className='alert w-40 alert-success alert-dismissible'>
          <strong>success!</strong> Data Deleted Sucessfully
          <button type="button" onClick={() => { setbackenderror(false) }} className="close" data-dismiss="alert">&times;</button>
        </div>
      ) : null}
 
          <Modal.Footer>
            <Button  variant="secondary" onClick={close}>
             close
          </Button>
            <Button type="submit" onClick={handleDeleteDatas} disabled={disabled}  variant="primary">Yes</Button>
          </Modal.Footer>
    
      </Modal>
    </>
    )
       }

export default DeleteAllTableItems
