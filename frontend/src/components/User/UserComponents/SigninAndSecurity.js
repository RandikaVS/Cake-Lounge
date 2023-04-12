import React from 'react'
import Box from '@mui/material/Box';
import { Grid, TextField, FormGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import asyncHandler from 'express-async-handler';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


 const SigninAndSecurity = () => {

    const userData = (JSON.parse(localStorage.getItem("userInfo")));

    const [pwSelected,setpwSelected]=useState(false);
    const [rePwSelected,setrePwSelected]=useState(false);
    const [cuPassword,setcuPassword]=useState();
    const [newPassword,setnewPassword]=useState();
    const [againNewPassword,setagainNewPassword]=useState();
    const [name,setName]=useState();
    const [address,setAddress]=useState();
    const [token,setToken]=useState();
    const [pic,setPic]=useState();
    const [email,setEmail]=useState();
    const [userId,setUserId]=useState(userData._id);
    const [password,setPassword]=useState();

    const history = useHistory();


    const handleClickShowPassword = () => {
    setpwSelected(!pwSelected);
  };
  const rehandleClickShowPassword = () => {
    setrePwSelected(!rePwSelected);
  };

  const updatePassword = asyncHandler(async()=>{

    console.log("Function work"+userData._id);
    console.log("Function work"+userData.password);
        setUserId(userData._id);
        setEmail(userData.email);
        setPic(userData.pic);
        setToken(userData.token);
        setAddress(userData.address);
        setName(userData.name);
        setPassword(userData.password);
        setToken(userData.token);


    if(newPassword!=againNewPassword){
        Swal.fire({
        icon: 'error',
        title: 'Wrong',
        text: 'New passwords does not match',
        footer: '<a href="">Why do I have this issue?</a>'
        })
    }else{
        try {
      const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const { data } = await axios.put(

        "/api/user/updateUserPassword",
        {
          userId,
          name,
          email,
          againNewPassword,
          cuPassword,
          password,
          address,
          pic,
          token,

        },

        config
      );
      console.log(data);
     
      localStorage.setItem("userInfo", JSON.stringify(data));
         Swal.fire({
            title: 'success',
            text: 'Password Changed',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        
     
      history.push("/profile");
    
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password not changed',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      console.log(`Error occured ${error.response.data.message}`);
      
    }
    }

  })

  const deleteUser = async()=>{

    setUserId(userData._id);

    if(!userId){
        Swal.fire({
        icon: 'error',
        title: 'Wrong',
        text: 'User id required',
        footer: '<a href="">Why do I have this issue?</a>'
        })
    }else{

      try {
         const config = {

        headers: {
          "Content-type": "application/json",
        },

      };

        const{data} = await axios.post(
          "/api/user/deleteUser",
          {
            userId,
          },
          config
        );
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User has been deleted',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem("userInfo"); 
      history.push('/');
      } catch (error) {
         Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fail to delete the user!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
        
      }

    }

  }


    return (
        <div>
            <h4><b style={{fontFamily:'sans-serif'}}>Sign in and security change password delete account</b></h4><br></br><hr></hr>

            <Box sx={{
                width: 600,
                height: 300,
                // backgroundColor: 'primary.dark',
            }}>
             <Grid container spacing={2}>
                <Grid item xs={3}>
                    <b>Password</b>
                </Grid>
                <Grid item xs={9}>
                    <Item>Create a password or modify your existing one.
                        <br></br><br></br>
                        <FormGroup sx={{width:'300px',marginLeft:'58px',p:1}} >
                        <TextField
                            id="standard-textarea"
                            label="Current password"
                            placeholder="Enter current password "
                            multiline
                            variant="standard"
                            sx={{marginBottom:'30px'}}
                            onChange={(e)=>setcuPassword(e.target.value)}
                            />
                        
                            <Input
                                id="standard-adornment-password"
                                label="New password"
                                placeholder="Enter new password "
                                type={pwSelected ? 'text' : 'password'}
                                sx={{marginBottom:'30px'}}
                                onChange={(e)=>setnewPassword(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    >
                                    {pwSelected ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            /><br></br><br></br>
                            <Input
                                id="standard-adornment-password"
                                label="Re-enter new password"
                                placeholder="Re-Enter new password "
                                type={rePwSelected ? 'text' : 'password'}
                                onChange={(e)=>setagainNewPassword(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={rehandleClickShowPassword}
                                    >
                                    {rePwSelected ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                           </FormGroup> 
                            <Grid>
                                <Button variant="contained" component="span" sx={{marginTop:'30px',marginRight:'130px'}}>
                                    Cancel
                                </Button ><span>
                                    <Button variant="contained" component="span" sx={{marginTop:'30px',marginRight:'15px'}}
                                    onClick={updatePassword}
                                    >
                                    Save
                                </Button>
                                    </span> 
                            </Grid>
                                 
                    </Item>
                </Grid>
                </Grid>

            </Box>
            <Button variant="contained" startIcon={<DeleteForeverIcon/>} style={{marginLeft:'400px',marginTop:'100px'}}
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
                                                         {deleteUser()};
                                                       
                                                      }else if (
                                                        /* Read more about handling dismissals below */
                                                        result.dismiss === Swal.DismissReason.cancel
                                                      ) {
                                                        swalWithBootstrapButtons.fire(
                                                          'Cancelled',
                                                          'Your Shop is safe :)',
                                                          'error'
                                                        )
                                                      }
                                                    })}}            
            >
                  Delete Account
                </Button>
        </div>
    )
}
export default SigninAndSecurity;