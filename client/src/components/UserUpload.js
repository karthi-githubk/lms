import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button } from '@mui/material';

function UserUpload() {
  const [importedData, setImportedData] = useState([]);

  const importUsers = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          const response = await axios.post('http://localhost:5000/api/user/import', {
            data: excelData, // Send the entire array of data
          });

          if (response.status === 200) {
            toast.success('Users Imported Successfully!!');
            setImportedData(excelData);
          } else {
            toast.error('Error importing users');
          }
        } catch (error) {
          console.error(error);
          toast.error('Error importing users');
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
      toast.error('Error importing users');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        id="file-input"
        style={{ display: 'none' }}
        onChange={importUsers}
      />
      <Button
        variant="contained"
        onClick={() => document.getElementById('file-input').click()}
      >
        Import Users
      </Button>
    </div>
  );
}

export default UserUpload;