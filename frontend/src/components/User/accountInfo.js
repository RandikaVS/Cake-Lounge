import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PersonalInfomation from "./UserComponents/PersonalInfomation"
import SigninAndSecurity from "./UserComponents/SigninAndSecurity"
import Shop from './UserComponents/Shop';


const userData = (JSON.parse(localStorage.getItem("userInfo")));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({fetchAgain}) {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
    
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      style={{marginLeft:'10vw', height:'70vh',backgroundColor:"#E0FFFF",height:"600px"}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Personal Information" {...a11yProps(0)} />
        <Tab label="Sign in and security" {...a11yProps(1)} />
        <Tab label="Shops" {...a11yProps(2)} />
        <Tab label="Orders" {...a11yProps(3)} />
        <Tab label="Wishlist" {...a11yProps(4)} />
        <Tab label="Cart" {...a11yProps(5)} />
        <Tab label="Saved sellers" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PersonalInfomation/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SigninAndSecurity/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Shop/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Orders
      </TabPanel>
      <TabPanel value={value} index={4}>
        Wishlist
      </TabPanel>
      <TabPanel value={value} index={5}>
        Cart
      </TabPanel>
      <TabPanel value={value} index={6}>
        Saved sellers
      </TabPanel>
    </Box>
  );
}