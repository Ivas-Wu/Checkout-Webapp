import React, { useState } from 'react'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { ImageEditData } from './ImageEditData'
import { Scanner } from '../types/Scanner';


const ReceiptUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [dataFromUpload, setDataFromUpload] = useState<Scanner>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/api/scanner?userId=${localStorage.getItem('user-id')}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDataFromUpload(response.data);
    } catch(error) {
      console.log(error)
    }
    handleOpen();
  }

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const reset = () => {
    handleClose();
    setSelectedFile("")
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageEditData dataFromUpload={dataFromUpload} handleClose={reset}></ImageEditData>
        </Box>
      </Modal>
    </form>
  )

  }

  export default ReceiptUpload
