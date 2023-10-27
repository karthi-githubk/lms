// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import CancelIcon from '@mui/icons-material/Cancel';
// import IconButton from '@mui/material/IconButton';
// import EnquiryForm from './EnquiryForm';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '45%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   boxShadow: 24,
//   p: 4,
// };

// export default function Enquirymodal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen} style={{marginTop:'3%',backgroundColor:'#ffffff',width:'130px',borderRadius:'px',fontWeight:'bold'}}>Enquiry Now</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//           style={{backgroundColor:'#778beb'}}>
//         <div style={style}>
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleClose}
//             aria-label="Close"
//             sx={{
//               position: 'absolute',
//               top: 0,
//               right: '-10%',
//               backgroundColor:'#ffa801'
              
//             }}
//           >
//             <CancelIcon />
//           </IconButton>
//           <EnquiryForm />
//         </div>
//       </Modal>
//     </div>
//   );
// }
