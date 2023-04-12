import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Overlay,ref,show,target,Popover, Spinner, Form, FormControl, Placeholder } from 'react-bootstrap';
import './chatList.css'
import { Stack } from 'react-bootstrap';
import { getSender, getSenderPic ,getUser} from '../../config/chatLogics'
import { useRef } from 'react';
import { IconButton, List, ListItem, ListItemText, Skeleton, Tooltip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Swal from 'sweetalert2';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import ScrollableFeed from 'react-scrollable-feed'
import { selectedIndexPropType } from 'react-tabs/lib/helpers/propTypes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Chat List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

const userData = (JSON.parse(localStorage.getItem("userInfo")));

export const ChatList = ({fetchAgain}) => {


    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [loggedUser, setLoggedUser] = useState();
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const {user, chats, setChats,setSelectedChat,selectedChat,setUser,setChatLen,chatLen} = ChatState();
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();
    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    



    
    if(chats){
            setChatLen(chats.length);
          }
  
    
    const fetchChats = async() =>{
        
       console.log(userData.token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log("Chat array");
      console.log(data);
      setChats(data);
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fail to load the chats!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    };
    };


    useEffect(() => {

     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
     fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    const userData = (JSON.parse(localStorage.getItem("userInfo")));
  }, [])
  

    const handleSearch = async (event) => {
        setShow(!show);
        setTarget(event.target);
    if (!search) {
      Swal.fire('Please enter user name to search..!')
      return;
    }

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      //console.log(data)
      setSearchResult(data);
    } catch (error) {
      window.alert('Failed to Load the Search Results')
    }
  };


    const accessChat = async (userId) => {
        console.log(userData);

        try {
        
        const config = {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);

        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        //window.alert(data)
        setSelectedChat(data);
        } catch (error) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error to access chat!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
        }
    };

    const deleteChat = async(chat,user)=>{

      console.log(chat);
      console.log(user);
       try {
         const config = {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
            },
        };

      const { data } = await axios.post(`/api/chat/deleteChat`,{_id:chat,userId:user}, config);
      console.log(data)
      setChats(data);
      //alert("Chat Deleted !!!")
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Chat has been deleted',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fail to delete the chat!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

 }

 const handleToggle = (value) => () => {
   
            if(selected[0]==null){
                setSelected([value]);
            }else{
              setSelected([...selected,value]);
            }
            console.log(selected);
            console.log(selected.length);
   
  };



        return (

             <div>
            
            
            <div ref={ref}>
                <Search onChange={handleSearch}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                     onChange={(e)=>setSearch(e.target.value)}
                  />
                  <span><Button variant="outlined" size="small" startIcon={<PersonSearchIcon />}onClick={handleSearch} style={{marginLeft:'30px'}}>
                  Search
                </Button></span>
                </Search>

                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                    >
                        <Popover id="popover-contained">
                        <Popover.Header as="h3">Search Results</Popover.Header>
                        <Popover.Body >
                          <div style={{maxHeight:'300px'}}>
                            <ScrollableFeed>
                                    {searchResult ? (
                                        
                                        <Stack>
                                            {searchResult.map ((user)=>(


                                                <Container onClick={()=>accessChat(user._id)} key={user._id} style={{marginBottom:'4px',backgroundColor:'blue'}}>
                                                        <div className="row no-gutters bg-light position-relative">
                                                            <div className="col-md-6 mb-md-0 p-md-4">
                                                                <img src={user.pic} class="w-100" alt='...' className='SearchchatImg'
                                                                style={{width:'50px',height:'50px',borderRadius:'30px'}}
                                                                />
                                                            </div>
                                                            <div className="col-md-6 position-static p-4 pl-md-0">
                                                                    <h5 className="mt-0" style={{fontSize:'15px'}}><b>{user.name}</b></h5>
                                                    
                                                                {/* <a href="#" class="stretched-link"></a> */}
                                                                </div>
                                                        </div>
                                                </Container>
                                            ))}
                                        </Stack>
                                    ):(
                                        <div>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </div>
                                    )}
</ScrollableFeed></div>
                        </Popover.Body>
                        </Popover>
                    </Overlay>
                    </div>
                    
          
            
                   <div >

                    
                      <Box sx={{width: '100%'}}>
                          <Paper sx={{ width: '100%', mb: 2 }}>

                            <EnhancedTableToolbar numSelected={selected.length} />
                          <TableContainer>
                            <Table
                             sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            >
                              <Checkbox
                                color="primary"
                              />
                              
                              <TableBody>
                                {chats? (
                                  <>
                                  {chats.map((chat)=>(
                                    
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                    >

                                      <TableCell padding="checkbox" key={chat}>
                                        <Checkbox
                                          color="primary"
                                          onClick={handleToggle(chat)}
                                          // checked={selected.indexOf(chat) !== -1}
                                          inputProps={{ 'aria-labelledby': chat }}
                                        />
                                      </TableCell>
                                      <TableCell padding="checkbox"onClick={()=>setSelectedChat(chat)}>
                                        <Avatar>
                                          <img src={getSenderPic(user._id,chat.users)} style={{width:'50px',height:'50px'}}/>
                                        </Avatar>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="10px"
                                        onClick={()=>setSelectedChat(chat)}
                                      >
                                        {getSender(user._id,chat.users) }
                                      </TableCell>
                                      <TableCell align="left"> <b>{chat.latestMessage && (
                                                      
                                                        <b>{chat.latestMessage.content.length > 50
                                                          ? chat.latestMessage.content.substring(0, 51) + "..."
                                                          : chat.latestMessage.content}</b>
                                                    )}</b></TableCell>
                                      
                                    <TableCell align="right">
                                                  <IconButton aria-label="delete"
                                                  onClick={()=>{
                                                    
                                                    Swal.fire({
                                                      title: 'Are you sure?',
                                                      text: "You won't be able to revert this!",
                                                      icon: 'warning',
                                                      showCancelButton: true,
                                                      confirmButtonColor: '#3085d6',
                                                      cancelButtonColor: '#d33',
                                                      confirmButtonText: 'Yes, delete it!'
                                                    }).then((result) => {
                                                      if (result.isConfirmed) {
                                                        {deleteChat(chat._id,user._id)};
                                                       
                                                      }else if (
                                                        /* Read more about handling dismissals below */
                                                        result.dismiss === Swal.DismissReason.cancel
                                                      ) {
                                                        swalWithBootstrapButtons.fire(
                                                          'Cancelled',
                                                          'Your chat is safe :)',
                                                          'error'
                                                        )
                                                      }
                                                    })}}
                                                  >
                                                      <DeleteIcon />
                                                    </IconButton>
                                                    
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                  </>
                                ):(
                                  <>
                                  <Skeleton variant="text" />
                                  <Skeleton animation="wave" />
                                  <Skeleton variant="text" />
                                  <Skeleton animation="wave" />
                                  <Skeleton variant="text" />
                                  <Skeleton animation="wave" />
                                
                                  </>
                                )}
                              </TableBody>

                            </Table>
                          </TableContainer>
                          </Paper>

                        </Box>

                       
            </div>

            
            </div>
        
        )
}






