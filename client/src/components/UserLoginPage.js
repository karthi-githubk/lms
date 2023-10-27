import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from './images/logo.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useMediaQuery } from 'react-responsive';

function UserLoginpage() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem('Authenticated') === 'true';
  const [LocalcourseData, setLocalcourseData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    axios
      .get('http://localhost:5000', { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setEmail(res.data.email);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
      .catch((err) => {
        console.error(err);
        setAuth(false);
        setMessage('An error occurred while checking authentication.');
      });
  }, []);

  const [Userdata, setUserData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/user/get");
    setUserData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        try {
          const response = await axios.post(
            'http://localhost:5000/logout',
            {},
            { withCredentials: true }
          );

          if (response.data.Status === 'Success') {
            setAuth(false);
            Swal.fire('Logged Out!', '', 'success');
            navigate('/');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Logout failed.',
            });
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred during logout.',
          });
        }
      }
    });
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className="navbar navbar-expand-lg navbar-light bg-light app-bar fixed-top"
      style={{ height: '70px' }}
    >
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '12px',
            borderBottomRightRadius: '12px',
          }}
        />
        <div
          style={{
            marginLeft: isMobile ? '5%' : '30%',
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '11px',
          }}
        >
          <h2>LMS</h2>
        </div>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {/* Add your navigation links here */}
          </ul>
          {auth ? (
            <div>
              <span
                style={{
                  marginRight: isMobile ? '1rem' : '3rem',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                Logged in as {email}
              </span>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                style={{
                  marginRight: isMobile ? '0.5rem' : '2rem',
                  height: '40px',
                  width: isMobile ? '100px' : '130px',
                  backgroundColor: '#ff3838',
                }}
              >
                <ExitToAppIcon style={{ marginRight: '5px' }} /> Logout
              </button>
            </div>
          ) : (
            <div>
              <h3>{message}</h3>
              <h3>Login Now</h3>
              <Link to="/" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLoginpage;
