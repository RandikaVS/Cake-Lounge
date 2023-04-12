import * as React from 'react';
import { ChatList } from "../Chat/chatList";
import { Trash } from "../Chat/trash";
import { Archive } from "../Chat/archive";
import { ChatBox } from "../ChatBox/ChatBox";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ChatState } from '../../Context/ChatProvider';
import './messages.css'


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


    const Messages = () => {

        const [value, setValue] = React.useState(0);
        const {chatLen,trashLen,archiveLen} = ChatState();

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };


        return (
            <div>
             <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      style={{marginLeft:'10vw', height:'90vh',backgroundColor:"#E0FFFF"}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label={`Chats (${chatLen})`} {...a11yProps(0)} />
        {/* <Tab label={`Trash (${trashLen})`} {...a11yProps(1)} />
        <Tab label={`Archive (${archiveLen})`} {...a11yProps(2)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChatList/><ChatBox/>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Trash/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Archive/>
      </TabPanel> */}
    </Box>
            </div>
        )
}

export default Messages
