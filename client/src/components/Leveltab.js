import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Practise from './Practise';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';



function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function Leveltab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };

  return (
    <div>
     
    <div className='d-flex'>
      
    <div style={{width: '80%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs style={{color:'#d600e8'}}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="EASY" {...a11yProps(0)}  sx={{width:'30%'}}/>
          <Tab label="MEDIUM" {...a11yProps(1)} sx={{width:'30%'}} />
          <Tab label="HARD" {...a11yProps(2)}  sx={{width:'30%'}}/>
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <h4 className='d-flex justify-content-center'>EASY LEVEL</h4>
        <Practise/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h4 className='d-flex justify-content-center'>MEDIUM LEVEL</h4>
        <Practise/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h4 className='d-flex justify-content-center'>HARD LEVEL</h4>
        <Practise/>
      </TabPanel>
      <Link className='back-icon' to= '/html'><KeyboardReturnIcon fontSize='larger'/></Link>
      </div>
    </div>
    </div>
  );
}

export default Leveltab;