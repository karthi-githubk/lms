import React, { useState } from 'react';


function Fileuploadbtn() {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    return (
      <div>
        <input  type="file" onChange={handleFileChange} />
      </div>
    );
  }
  export default Fileuploadbtn;