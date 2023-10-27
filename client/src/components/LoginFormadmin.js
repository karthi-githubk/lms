// // import React, { useState } from 'react';
// // import { TextField, Button, FormControl, FormHelperText, Box } from '@mui/material';
// // import { useHistory } from 'react-router-use-history';

// // const LoginFormadmin = () => {
// //   const history = useHistory();
// //   const [name, setName] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [errors, setErrors] = useState({});

// //   const validateName = (value) => {
// //     if (value.trim() === '') {
// //       return 'Name is required';
// //     } else if (value.length < 4 || value.length > 24) {
// //       return 'Name must be between 4 and 24 characters';
// //     }
// //     return '';
// //   };

// //   const validatePassword = (value) => {
// //     if (value.trim() === '') {
// //       return 'Password is required';
// //     } else if (value.length <= 3) {
// //       return 'Password must be longer than 3 characters';
// //     } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
// //       return 'Password must contain both numbers and characters';
// //     }
// //     return '';
// //   };

// //   const handleNameChange = (e) => {
// //     const newName = e.target.value;
// //     setName(newName);
// //     setErrors({ ...errors, name: validateName(newName) });
// //   };

// //   const handlePasswordChange = (e) => {
// //     const newPassword = e.target.value;
// //     setPassword(newPassword);
// //     setErrors({ ...errors, password: validatePassword(newPassword) });
// //   };

// //   const handleLogin = () => {
// //     if (!errors.name && !errors.password) {
// //       // Rest of your login logic
// //       console.log('Name:', name);
// //       console.log('Password:', password);

// //       // Check for specific name-password combinations
// //       if (
// //         (name !== 'karthi@.com' || password !== '2211karthi') &&
// //         (name !== 'admin1@a.com' || password !== 'user1234') &&
// //         (name !== 'user1@gmail.com' || password !== 'user1234')
// //       ) {
// //         setErrors({ general: 'Invalid name or password' });
// //         return;
// //       }

// //       // Simulating successful login
// //       history.push('/Adminpanel');
// //       localStorage.setItem('authadmin', true);
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         height: '100vh',
// //       }}
// //     >
// //       <Box sx={{ width: '300px', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
// //         <form>
// //           <FormControl fullWidth margin="normal" error={!!errors.name}>
// //             <TextField
// //               label="Name"
// //               value={name}
// //               onChange={handleNameChange}
// //             />
// //             {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
// //           </FormControl>
// //           <FormControl fullWidth margin="normal" error={!!errors.password}>
// //             <TextField
// //               label="Password"
// //               type="password"
// //               value={password}
// //               onChange={handlePasswordChange}
// //             />
// //             {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
// //           </FormControl>
// //           {errors.general && (
// //             <FormHelperText sx={{ color: 'red' }}>{errors.general}</FormHelperText>
// //           )}
// //           <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
// //             Login
// //           </Button>
// //         </form>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default LoginFormadmin;

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // function LoginFormadmin() {
// //   const [values, setValues] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     sessionStorage.setItem("Authenticated","true");

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/admin/login', values, {
// //         withCredentials: true,

// //       });

// //       if (response.data && response.data.Status === 'Success') {
// //         navigate('/Admin');
// //       } else {
// //         const errorMessage = response.data.Message || 'Login failed.';
// //         alert(errorMessage);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert('An error occurred during login.');
// //     }
// //   };

// //   const formContainerStyle = {
// //     border: '1px solid #ccc', // Add your desired border styles
// //     boxShadow: '0 0 10px rgba(1, 39, 51, 0.8)', // Add your desired box shadow styles
// //   };

// //   return (
// //     <div className='d-flex justify-content-center align-items-center' style={{marginTop:'5%'}}>
// //       <div className=''>
// //         <form onSubmit={handleSubmit}>
// //           <div className='mb-3'>
// //             <label htmlFor='name' style={{color:'white'}}><strong>Email</strong></label>
// //             <input
// //               type='email'
// //               placeholder='Enter Email'
// //               name='email'
// //               onChange={(e) => setValues({ ...values, email: e.target.value })}
// //               className='form-control rounded-3'
// //             />
// //           </div>
// //           <div className='mb-3'>
// //             <label htmlFor='password' style={{color:'white'}}><strong>Password</strong></label>
// //             <input
// //               type='password'
// //               placeholder='Enter Password'
// //               name='password'
// //               onChange={(e) => setValues({ ...values, password: e.target.value })}
// //               className='form-control rounded-3'
// //             />
// //           </div>
// //           <button type='submit' className='btn  w-100 rounded-1 mt-3' style={{backgroundColor:'#1e90ff'}}>Log in</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default LoginFormadmin;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginFormadmin() {
//   const [values, setValues] = useState({
//     email: '',
//     password: '',
//   });

//   const [emailDomainError, setEmailDomainError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     sessionStorage.setItem('Authenticated', 'true');

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', values, {
//         withCredentials: true,
//       });

//       if (response.data && response.data.Status === 'Success') {
//         navigate('/Admin');
//       } else {
//         const errorMessage = response.data.Message || 'Login failed.';
//         alert(errorMessage);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('An error occurred during login.');
//     }
//   };

//   const handleEmailChange = (e) => {
//     const email = e.target.value;
//     setValues({ ...values, email });

//     // Validate email domain (accept only org, com, co, in)
//     const emailDomain = email.split('@')[1];
//     const validDomains = ['org', 'com', 'co', 'in'];

//     if (!validDomains.includes(emailDomain)) {
//       setEmailDomainError('Invalid email domain');
//     } else {
//       setEmailDomainError('');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const password = e.target.value;
//     setValues({ ...values, password });

//     // Validate password (minimum 4 characters, letters, and numbers)
//     if (password.length < 4 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
//       setPasswordError('Password must be at least 4 characters and contain letters and numbers');
//     } else {
//       setPasswordError('');
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '5%' }}>
//       <div className=''>
//         <form onSubmit={handleSubmit}>
//           <div className='mb-3'>
//             <label htmlFor='name' style={{ color: 'white' }}><strong>Email</strong></label>
//             <input
//               type='email'
//               placeholder='Enter Email'
//               name='email'
//               onChange={handleEmailChange}
//               className='form-control rounded-3'
//             />
//             {emailDomainError && <p style={{ color: 'red' }}>{emailDomainError}</p>}
//           </div>
//           <div className='mb-3'>
//             <label htmlFor='password' style={{ color: 'white' }}><strong>Password</strong></label>
//             <input
//               type='password'
//               placeholder='Enter Password'
//               name='password'
//               onChange={handlePasswordChange}
//               className='form-control rounded-3'
//             />
//             {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
//           </div>
//           <button type='submit' className='btn  w-100 rounded-1 mt-3' style={{ backgroundColor: '#1e90ff' }}>Log in</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginFormadmin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2"; // Import SweetAlert

function LoginFormadmin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    sessionStorage.setItem("Authenticated", "true");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.Status === "Success") {
        // Use SweetAlert for successful login
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Admin");
          }
        });
      } else {
        const errorMessage = response.data.Message || "Login failed.";
        Swal.fire({
          // Use SweetAlert for displaying error messages
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        // Use SweetAlert for displaying error messages
        icon: "error",
        title: "Oops...",
        text: "An error occurred during login.",
      });
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setValues({ ...values, email });

    // Real-time validation for email
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|co|in|co\.in)$/; // Updated regex
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Real-time validation for password
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setValues({ ...values, password });

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "" }}
    >
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" style={{ color: "white" }}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleEmailChange}
              className="form-control rounded-3"
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" style={{ color: "white" }}>
              <strong>Password</strong>
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                onChange={handlePasswordChange}
                className="form-control rounded-3"
              />
              {showPassword ? (
                <VisibilityOffIcon
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <VisibilityIcon
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="btn  w-100 rounded-1 mt-3"
            style={{ backgroundColor: "#1e90ff" }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormadmin;
