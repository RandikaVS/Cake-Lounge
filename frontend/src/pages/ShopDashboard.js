import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Messages from "../components/User/messages"
import ShopSettings from './../components/Shop/shopSettings';
import  ShopOverview  from '../components/Shop/shopOverview';
import Product from './../components/Shop/product';
import ShopUpdate from './../components/Shop/ShopUpdate';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ShopDashboard = () => {

const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <div>

         <Box sx={{ width: '75%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
          <Tab label="Messages" {...a11yProps(2)} />
          <Tab label="Listings" {...a11yProps(3)} />
          <Tab label="Stats" {...a11yProps(4)} />
          <Tab label="Advertisements" {...a11yProps(5)} />
          <Tab label="Community & Help" {...a11yProps(6)} />
          <Tab label="Settings" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <ShopOverview></ShopOverview>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Orders
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Messages/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Product/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Stats
      </TabPanel>
      <TabPanel value={value} index={5}>
        Advertisements
      </TabPanel>
      <TabPanel value={value} index={6}>
        Community & Help
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ShopUpdate/>
      </TabPanel>
    </Box>

       
    </div>
  )
}

export default ShopDashboard