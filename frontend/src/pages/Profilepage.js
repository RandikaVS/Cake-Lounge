import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import './Profilepage.css'
import AccountInfo from '../components/User/accountInfo'
import Messages from "../components/User/messages"
 

import { Image } from 'react-bootstrap';
import { ChatState } from './../Context/ChatProvider';
import axios from 'axios';
import { useEffect } from 'react';

const userData = (JSON.parse(localStorage.getItem("userInfo")));
// const userId = userData._id;

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

const Profilepage = () => {

  const {user, chats, setChats,setLoggedUser} = ChatState();
  const d = new Date();
  const userI = JSON.parse(localStorage.getItem('userInfo'));


 const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



    return(
<div className="profilePage">
        
        <div className="top" style={{display: "block", width: 700, padding: 30}}>
            
            <h1 style={{fontFamily:"sans-serif"}}>My cake lounge</h1><br></br>
          
            
            <Image src={userI.pic}
                roundedCircle>
            </Image>
            <a href="#">Change image</a><br></br>

            <div className="top2" style={{display:"flex"}}>

            <p>Member since <b>{d.getFullYear()}</b></p>

            <Image className="VerticalLine"src="https://res.cloudinary.com/cake-lounge/image/upload/v1650169164/Icons/icons8-vertical-line-50_arkro0.png"/>

            <p> <Image src="https://res.cloudinary.com/cake-lounge/image/upload/v1650168865/Icons/icons8-location-24_dualwq.png"/>
            {userI.address}</p>

           <p> <Image className="VerticalLine" src="https://res.cloudinary.com/cake-lounge/image/upload/v1650169164/Icons/icons8-vertical-line-50_arkro0.png"/>{userI.shopAvailability} Shops</p>

            </div>
        </div>
        
        

         <Box sx={{ width: '75%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Messages" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AccountInfo/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Messages/>
      </TabPanel>
    </Box>

</div>
        
    )
}

export default Profilepage