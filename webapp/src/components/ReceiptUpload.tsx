import React from 'react'
import axios from 'axios';

const ReceiptUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState("");

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
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0])
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )

  }

  export default ReceiptUpload
