import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { uploadAllVideos } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [video , setVideos]=useState({

        id:"",
        caption:"",
        url:"",
        embedLink:""

  })



  const embedVideoLink =(e)=>{
      const {value} = e.target 
         console.log(value.slice(-11));
         const link = `https://www.youtube.com/embed/${value.slice(-11)}`
         setVideos({...video,embedLink:link})

  }
   console.log(video);

   const handleUpload = async()=>{
      const {id,caption,url,embedLink}=video
        if (!id || !caption || !url ||!embedLink) {
          toast.warning('Please fill the form completely')
        } 
        
        else {
          const response = await uploadAllVideos(video)
          console.log(response);

          if (response.status>=200 && response.status<300) {
            toast.success(`${response.data.caption} is successfully uploaded`)

            //to change the value of uploadVideoStatus
            setUploadVideoStatus(response.data)

            //making the state value none
            setVideos({
                            
                  id:"",
                  caption:"",
                  url:"",
                  embedLink:""
            })

            handleClose()
          }
          else{
            console.log(response);
            toast.error('something went wrong. Try again later')
          }
        }
      
   }

  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className="btn">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-film me-2 text-warning"></i>Upload Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following form completely</p>

          <form className="border border-seconday rounded p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video ID" onChange={(e)=>setVideos({...video,id:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video caption" onChange={(e)=>setVideos({...video,caption:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video image Url" onChange={(e)=>setVideos({...video,url:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Youtube video link" onChange={embedVideoLink}/>
            </Form.Group>

          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" theme="colored" autoClose={2000}/>
    </>
  );
}

export default Add;
