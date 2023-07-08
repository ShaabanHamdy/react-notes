import {
  MDBModal,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import NoteEmpty from "../NoteEmpty/NoteEmpty";
import { getAPIData } from "../Redux/APPSlice/displaySlice";
import { SyncLoader } from "react-spinners";
import { addToApi } from "../Redux/APPSlice/addToListSlice";
import { deleteFromAPI } from "../Redux/APPSlice/deleteSlice";
import { updateAPI } from "../Redux/APPSlice/updateSlice";

//====================================================================== note
export const Note = () => {
  //========================= useSelector for displayData
  const { data } = useSelector((state) => state.displayData);
  // =============================== dispatch to use redux function
  const dispatch = useDispatch();
  //========================= useState for  modal toggleShow
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  //================================= useState for post data to api
  const [user, setUser] = useState({
    title: "",
    description: "",
  });
  //======================================================================
  const [getId, setGetId] = useState(""); // to get id for update
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  }); // to get value for update
  //=============================== send this object to update dispatch as a parameter
  const objectUpdateData = {
    getId,
    updateData,
  };
  //===================================================
  const titleValue = useRef(null); // useRef to get title input value
  const descriptionValue = useRef(null); // useRef to get description input value
  //========================================== get user value
  const getUserValue = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
    setUpdateData({
      ...updateData,
      title: titleValue.current.value,
      description: descriptionValue.current.value,
    });
  };
  //=============================== button add note to show modal
  const AddBtn = useRef(null); // useRef to change button Modal to Add
  const addNoteBtn = () => {
    toggleShow(true);
    AddBtn.current.innerHTML = "Add";
  };

  //========================= btn edit function for show modal with data to update

  const btnEditFunction = (index) => {
    toggleShow(true);
    titleValue.current.value = data[index].title;
    descriptionValue.current.value = data[index].description;
    AddBtn.current.innerHTML = "Update";
  };
  //========================= function for  hide modal and to empty value title and disc
  const addBtnFunction = () => {
    setBasicModal(false);
    titleValue.current.value = "";
    descriptionValue.current.value = "";
    if (AddBtn.current.innerHTML == "Update") {
      dispatch(updateAPI(objectUpdateData));
      dispatch(getAPIData());
    } else {
      dispatch(addToApi(user));
      dispatch(getAPIData());
    }
  };
  //========================== useEffect for  add and update and delete data
  useEffect(() => {
    dispatch(getAPIData());
  }, [data]);
  useEffect(() => {
    if (!data) {
      dispatch(getAPIData());
    }
  }, []);
  //===========================================================================================
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(function () {
      setIsShown(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //===============================================================================================================================================================

  return (
    <>
      {/* ====================================================Modal================== */}
      <div className="row">
        <div className=" my-5">
          <button
            className="btn btn-primary float-end fw-bold fs-5"
            onClick={addNoteBtn}
          >
            {/* <BiPlusCircle/> */}
            <HiOutlinePlusCircle className="me-1 fs-4" />
            Add New
          </button>
          <div className="clearfix"></div>
        </div>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <div className="w-100 mt-5">
                  <input
                    ref={titleValue}
                    onChange={getUserValue}
                    placeholder="Type Title "
                    className="form-control"
                    type="text"
                    name="title"
                  />
                </div>
                <div className="mb-5">
                  <button
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></button>
                </div>
              </MDBModalHeader>
              <div className="m-3">
                <textarea
                  ref={descriptionValue}
                  onChange={getUserValue}
                  className=" form-control "
                  placeholder="Type Description"
                  name="description"
                  cols="20"
                  rows="7"
                ></textarea>
              </div>

              <MDBModalFooter>
                <button className="btn btn-secondary" onClick={toggleShow}>
                  Cancel
                </button>
                <button
                  onClick={addBtnFunction}
                  ref={AddBtn}
                  className="btn btn-success"
                >
                  Add
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
      {/* ==================================================== Data  ================== */}
      {isShown ? (
        <div className=" text-center">
          <SyncLoader  size={25} className=" text-center" color="#36d7b7" />
        </div>
      ) : data?.length ? (
        <div className="row">
          {data.map((elm, index) => (
            <div key={index} className="col-md-4 colNotList">
              <div className="note  alert alert-danger d-flex">
                <div>
                  <h2>{elm.title}</h2>
                  <p>{elm.description}</p>
                </div>
                <div className="ms-3">
                  <i
                    onClickCapture={() => setGetId(elm._id)}
                    onClick={() => btnEditFunction(index)}
                    className="fas fa-edit float-right text-warning edit"
                  ></i>
                  <i
                    onClick={() => dispatch(deleteFromAPI(elm._id))}
                    className="fas fa-trash-alt float-right text-danger  edit"
                  ></i>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoteEmpty />
      )}
    </>
  );
};
