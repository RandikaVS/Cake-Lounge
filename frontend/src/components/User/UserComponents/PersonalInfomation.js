import React from 'react'
import { FormGroup, TextField,Button } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from "axios"
import {useHistory} from 'react-router-dom'
import { ChatState } from '../../../Context/ChatProvider';

const userData=(JSON.parse(localStorage.getItem("userInfo")));


 const PersonalInfomation = () => {

  const [userId, setUserId] = React.useState();
  const [name, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [email,setEmail] = React.useState();                       
  const [password,setPassword] = React.useState();
  const [pic,setPic] = React.useState();
  const [token,setToken] = React.useState();
  //const {user,setUser} = ChatState();



  const history = useHistory();

   if(!name && address){
    setName(userData.name);
  }
  if(name && !address){
    setAddress(userData.address);
  }
  
const updateUser = async()=>{

  setUserId(userData._id);
  setEmail(userData.email);
  setPassword(userData.password);
  setPic(userData.pic);
  setToken(userData.token);

  
    if(!name && !address){
      Swal.fire({
        title: 'Error!',
        text: 'Please do any update !!!',
        icon: 'question',
        confirmButtonText: 'Close'
      })
    }else{

      try {
      const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const { data } = await axios.put(

        "/api/user/updateUser",
        {
          userId,
          name,
          email,
          password,
          address,
          pic,
          token,

        },

        config
      );
      console.log(data);
     
      localStorage.setItem("userInfo", JSON.stringify(data));
      //userData=(JSON.parse(localStorage.getItem("userInfo")));
         Swal.fire({
            title: 'success',
            text: 'Update Success',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        
     
      history.push("/profile");
    
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Update failed',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      console.log(`Error occured ${error.response.data.message}`);
      
    }
    }

  }

    const resetFrom = async()=>{
      setName(userData.name);
      setAddress(userData.address);
    }


    // useEffect(() => {
    //   userData=(JSON.parse(localStorage.getItem("userInfo")));
    // }, []);

    
  return (
    <div>

        <FormGroup style={{marginLeft:'100px'}}>
  <TextField id="standard-basic" label="Name" variant="standard" defaultValue={userData.name}  onChange={(e)=>setName(e.target.value)}/>

<TextField
          id="standard-read-only-input"
          label="Email"
          value={userData.email}
          defaultValue="User Email"
          style={{marginTop:'20px'}}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

<TextField
          id="standard-multiline-static"
          label="Address"
          multiline
          rows={4}
          defaultValue={userData.address}
          variant="standard"
          style={{marginTop:'20px'}}
          onChange={(e)=>setAddress(e.target.value)}
        />
        
        <Button variant="contained" color="success" onClick={updateUser}>Update</Button>
        <Button variant="text" onClick={resetFrom}>Reset</Button>
</FormGroup>
    </div>
  )
}

 export default PersonalInfomation;
