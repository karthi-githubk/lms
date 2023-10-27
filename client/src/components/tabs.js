import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginForm from './Loginform';
import LoginFormadmin from './LoginFormadmin';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box classname="logintab" sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="USER LOGIN" value="1" sx={{width:'50%',color:'white'}} /> 
            <Tab label="ADMIN LOGIN" value="2" sx={{width:'50%',color:'white'}}/>
           
          </TabList>
        </Box>
        <TabPanel value="1"><LoginForm/></TabPanel>
        <TabPanel value="2"><LoginFormadmin/></TabPanel>
        
      </TabContext>
    </Box>
  );
}