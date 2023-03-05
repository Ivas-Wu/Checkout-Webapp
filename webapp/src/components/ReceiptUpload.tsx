import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { ImageEditData } from './ImageEditData';
import { Scanner } from '../types/Scanner';

interface IReceiptUploadProps {
  closeParent: () => void;
}

const ReceiptUpload: React.FC<IReceiptUploadProps> = ({closeParent}) => {
  const [selectedFile, setSelectedFile] = React.useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [dataFromUpload, setDataFromUpload] = useState<Scanner>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth*0.5,
    height: window.innerHeight*0.6,
    bgcolor: '#F1FCFF',
    boxShadow: 24,
    pb: 2,
    padding: '4%',
    paddingTop: '2%'
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:3000/api/scanner?userId=${localStorage.getItem(
          'user-id'
        )}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDataFromUpload(response.data);
    } catch (error) {
      console.log(error);
    }
    handleOpen();
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const reset = () => {
    handleClose();
    closeParent();
  };

  return (
    <form onSubmit={handleSubmit} style={{position:'relative', top:'30%'}}>
      <input type="file" onChange={handleFileSelect} style={{position:'relative', left:'30%'}} />
      <input type="submit" value="Upload File" style={{position:'relative', left:'30%'}} />
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <ImageEditData
            dataFromUpload={dataFromUpload}
            handleClose={reset}
          ></ImageEditData>
        </Box>
      </Modal>
    </form>
  );
};

export default ReceiptUpload;
