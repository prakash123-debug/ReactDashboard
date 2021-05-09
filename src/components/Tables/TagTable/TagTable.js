import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '../../Pagination/Pagination'
import { Row, Table } from 'react-bootstrap';
import axiosInstance from '../../Helpers/Axios'
import EditTagModal from '../../Modals/TagModal/EditTagModal';
import DeleteAllTableItems from '../../Modals/DeleteAllTableItems/DeleteAllTableItems';
import { BsTrash } from "react-icons/bs";

function TagTable({ show }) {
  const [ModalData, GetModalData] = useState('');
  const [OpenEditModal, handleOpenEditModal] = useState(false);
  const closeModalHandler = () => handleOpenEditModal(false);
  const [loading,setloading]=useState(false);
  const [OpenDeleteModal, handleOpenDeleteModal] = useState(false);
  const closeDeleteModalHandler = () => handleOpenDeleteModal(false);
  const [ModalId, SetModalId] = useState('')

  const GetDeleteModalId = (id) => {
    SetModalId(id);
  }
  const [IsPopupOpen, changePopupOpen] = useState(true)
  const store = (localStorage.getItem('token'));
  const [access_token, setAccessToken] = useState(store);
  const [items, SetItems] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  useEffect(() => {
    changePopupOpen(show)
    fetchingTag();
  }, [show, OpenEditModal, OpenDeleteModal])

  const fetchingTag = useCallback(async () => {
    axiosInstance.get('/dashboard/tag', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    })
      .then(res => {
        setloading(true)
        SetItems(res.data)

      })
      .catch((error) => {
        console.log(error);
      });
  })


  const indexOfLastPost = CurrentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const CurrentPosts = items.slice(indexofFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
      <>
        <Row className="BreadcrumbStyle mt-4">
          <Table className=" table-striped w-100 table-sm ">
            <thead>
              <tr>
                <th>SN</th>
                <th>Tag Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                CurrentPosts.map((index, i) => {

                  return (

                    <tr onDoubleClick={() => {
                      GetModalData(index)
                      handleOpenEditModal(true)
                    }
                    } key={index.id} value={index.id}>
                      <td>{i + 1}</td>
                      <td>{index.tagName}</td>
                      <td onClick={() => {
                        handleOpenDeleteModal(true)
                        GetDeleteModalId(index.id)
                      }}>

                        <button className="btn btn-danger"><BsTrash /></button>
                      </td>
                    </tr>

                  )
                })
              }
            </tbody>

          </Table>
        </Row>
        <div className="float-right mt-2">
          <Pagination paginate={paginate} postPerPage={postPerPage} totalPoste={items.length} />
        </div>
        <EditTagModal shows={OpenEditModal} ModalData={ModalData} close={closeModalHandler} />
        <DeleteAllTableItems shows={OpenDeleteModal} ModalId={ModalId} ModalName="tag" close={closeDeleteModalHandler} />
      </>
    );
 

}

export default TagTable;