import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ChatState } from '../../Context/ChatProvider';
import Swal from 'sweetalert2'


const Login = () => {
    
    const [show,setShow] =useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const {setUser} = ChatState();
    const history = useHistory();

    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

    const checkPW = () => setShow(!show);

    const submitHandler = async()=>{

      if(!email || !password){
        window.alert("please fill the fields out..");
      }

      try {
        const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
        const {data} = await axios.post(
          "/api/user/login",
          
          {email,password},

          config
        );

        Toast.fire({
          icon: 'success',
          title: 'Login in successfully'
        })

        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(JSON.parse(localStorage.getItem("userInfo")));
        // sessionStorage.setItem('userInfoI',data);

        history.push("/home");
      } catch (error) {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login failed!',
          footer: '<a href="">Why do I have this issue?</a>'
        })

        console.log("Error occuered logging");
      }
    };

  return (
    <div className='loginFrom' style={{display:"flex"}}> 
        
        <Form>
            <div className='loginHeader'>
            <h3>Log In</h3></div>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type={show?"text":"password"} placeholder="Password" value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Show password" onClick={checkPW} />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={submitHandler} style={{marginLeft:'100px'}}>
    Login
  </Button>

   <MDBBtn  outline color="info"
        onClick={()=>{
            setEmail("guestgmail.com");
            setPassword("sss");
        }}
        style={{marginLeft:'100px',marginTop:'5px'}}>
    Guest Login
  </MDBBtn>
  <br>
  </br><br></br>
  <p style={{marginLeft:'120px'}}>Do  not have an account? <a href='#'>Signin</a></p>
  <a style={{marginLeft:'160px'}} href='#'>Forgot password?</a>
</Form></div>
  )
}

export default Login;