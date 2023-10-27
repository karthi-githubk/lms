// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const [values, setValues] = useState({
//     email: '',
//     password: '',
//     agreeTerms: false,
//   });

//   const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // State to track if in forgot password mode
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     sessionStorage.setItem('Authenticated', 'true');

//     try {
//       if (!values.agreeTerms) {
//         alert('Please agree to the terms before submitting.');
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/login', values, {
//         withCredentials: true,
//       });

//       if (response.data && response.data.Status === 'Success') {
//         navigate('/userloginpage');
//       } else {
//         const errorMessage = response.data.Message || 'Login failed.';
//         alert(errorMessage);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('An error occurred during login.');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Toggle the forgot password mode
//     setForgotPasswordMode(!forgotPasswordMode);
//   };

//   const handleForgotPasswordSubmit = async () => {
//     try {
//       // Send a request to your server to resend the password reset email
//       const response = await axios.post('http://localhost:5000/api/user/check-email', {
//         email: forgotPasswordEmail,
//       });

//       if (response.data && response.data.success) {
//         alert(`A password reset email has been resent to ${forgotPasswordEmail}.`);
//         console.log('Password Reset Email Resent');
//         setForgotPasswordMode(false); // Close the email input field and submit button
//       } else {
//         alert('Failed to resend the password reset email.');
//       }
//     } catch (error) {
//       console.error('An error occurred while resending the email:', error);
//       alert('An error occurred while resending the email.');
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center align-items-center'>
//       <div>
//         <form onSubmit={handleSubmit} >
//           <div className='mb-3'>
//             <label htmlFor='name' style={{color:'white'}}><strong>Email</strong></label>
//             <input
//               type='email'
//               placeholder='Enter Email'
//               name='email'
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//               className='form-control rounded-3'
//             />
//           </div>
//           <div className='mb-3'>
//             <label htmlFor='password' style={{color:'white'}}><strong>Password</strong></label>
//             <input
//               type='password'
//               placeholder='Enter Password'
//               name='password'
//               onChange={(e) => setValues({ ...values, password: e.target.value })}
//               className='form-control rounded-3'
//             />
//           </div>
//           <div className='mb-3 form-check'>
//             <input
//               type='checkbox'
//               className='form-check-input'
//               id='agreeTerms'
//               checked={values.agreeTerms}
//               onChange={(e) => setValues({ ...values, agreeTerms: e.target.checked })}
//             />
//             <label className='form-check-label' htmlFor='agreeTerms' style={{color:'white'}}>
//               I agree to the terms and policies
//             </label>
//           </div>
//           <button type='submit' className='btn btn-danger w-100 rounded-1'>Log in</button>
//         </form>
//         <div className='mb-3'>
//           {/* Conditionally render the forgot password elements */}
//           {forgotPasswordMode ? (
//             <>
//               <input
//                 type='email'
//                 placeholder='Enter Email'
//                 value={forgotPasswordEmail}
//                 onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                 className='form-control rounded-3'
//               />
//               <button
//                 type='button'
//                 className='btn btn-primary'
//                 onClick={handleForgotPasswordSubmit}
//               >
//                 Submit
//               </button>
//             </>
//           ) : (
//             <button
//               type='button'
//               className='btn btn-link'
//               onClick={handleForgotPassword}
//             >
//               Forgot Password?
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";

function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Real-time validation for email
  const validateEmail = (email) => {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|co|in|co\.in)$/; // Updated regex
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Real-time validation for password
  const validatePassword = (password) => {
    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    sessionStorage.setItem("Authenticated", "true");

    try {
      const response = await axios.post("http://localhost:5000/login", values, {
        withCredentials: true,
      });

      if (response.data && response.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in!",
          customClass: {
            container: "custom-swal-container",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/userloginpage");
          }
        });
      } else {
        const errorMessage = response.data.Message || "Login failed.";
        if (errorMessage === "No record exists") {
          Swal.fire({
            icon: "warning",
            title: "No Record Exists",
            text: "No record exists with the provided credentials.",
            customClass: {
              container: "custom-swal-container",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
            customClass: {
              container: "custom-swal-container",
            },
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred during login.",
      });
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordMode(!forgotPasswordMode);
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/check-email",
        {
          email: forgotPasswordEmail,
        }
      );

      if (response.data && response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Password Reset Email Sent",
          text: `A password reset email has been resent to ${forgotPasswordEmail}.`,
        });
        setForgotPasswordMode(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Resend Email",
          text: "Failed to resend the password reset email.",
        });
      }
    } catch (error) {
      console.error("An error occurred while resending the email:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while resending the email.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" style={{ color: "white" }}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                validateEmail(e.target.value);
              }}
              className="form-control rounded-3"
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="mb-3 password-input">
            <label htmlFor="password" style={{ color: "white" }}>
              <strong>Password</strong>
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={values.password}
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                  validatePassword(e.target.value);
                }}
                className="form-control rounded-3"
              />
              <span
                className="password-toggle-icon"
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button type="submit" className="btn btn-danger w-100 rounded-1">
            Log in
          </button>
        </form>
        <div className="mb-3">
          {forgotPasswordMode ? (
            <>
              <input
                type="email"
                placeholder="Enter Email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="form-control rounded-3"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleForgotPasswordSubmit}
              >
                Submit
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-link"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
