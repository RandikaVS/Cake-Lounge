import React from 'react'
import {useHistory} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Overlay,ref,show,target,Popover, Spinner, Form, FormControl, Placeholder } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { useRef } from 'react';
import { Skeleton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Swal from 'sweetalert2';
import { alpha } from '@mui/material/styles';
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from './../../Context/ChatProvider';

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

const userData = (JSON.parse(localStorage.getItem("userInfo")));


const SearchBar = ()=>{

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [target, setTarget] = useState(null);

    const{product,setProduct} = ChatState();

    const history = useHistory();

    const submitHandler = ()=> {

        history.push("/profile");
    }

     const [verticalActive, setVerticalActive] = useState('tab1');

        const handleVerticalClick = (value) => {
            if (value === verticalActive) {
            return;
            }

            setVerticalActive(value);
        };


 const handleSearch = async (event) => {
        setShow(!show);
        setTarget(event.target);
    // if (!search) {
    //   Swal.fire('Please enter user name to search..!')
    //   return;
    // }

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.get(`/api/product/searches?search=${search}`, config);
      //console.log(data)
      setSearchResult(data);
    } catch (error) {
      window.alert('Failed to Load the Search Results')
    }
  };

  const productPage = (product)=>{
    setShow(!show);
    setProduct(product);
    history.push('/product');
  }


    return(
        <>

       <div>

           <div ref={ref}>
               <br></br>
                <Search onChange={handleSearch}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search by using keyword"
                    inputProps={{ 'aria-label': 'search' }}
                     onChange={(e)=>setSearch(e.target.value)}
                     sx={{width:'300px'}}
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
                                            {searchResult.map ((product)=>(


                                                <Container onClick={(e)=>productPage(product)} key={product._id}style={{marginBottom:'4px',backgroundColor:'blue'}}>
                                                        <div className="row no-gutters bg-light position-relative">
                                                            <div className="col-md-6 mb-md-0 p-md-4">
                                                                <img src={product.image1} class="w-100" alt='...' className='SearchchatImg'
                                                                style={{width:'50px',height:'50px',borderRadius:'30px'}}
                                                                />
                                                            </div>
                                                            <div className="col-md-6 position-static p-4 pl-md-0">
                                                                    <h5 className="mt-0" style={{fontSize:'15px'}}><b>{product.productName}</b></h5>
                                                    
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
    
       </div>
            
        </>
    )
}
export default SearchBar