import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function Ppt() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant='secondary'>View PDF</Button>
      <Dialog sx={{marginLeft:'50%',marginTop:'5%'}}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: 'transparent-dialog' }}
      >

        <DialogContent>
        <object
            data="https://ww2.cs.fsu.edu/~faizian/cgs3066/resources/Lecture3-Intro%20to%20HTML.pdf"
            type="application/pdf"
            width="1000px"
            height="500px"
          >
            This browser does not support PDFs. You can download the PDF file{' '}
            <a href="https://ww2.cs.fsu.edu/~faizian/cgs3066/resources/Lecture3-Intro%20to%20HTML.pdf">
              here
            </a>
            .
          </object>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        .transparent-dialog {
          background-color: transparent;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
