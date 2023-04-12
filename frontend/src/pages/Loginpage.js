import './Loginpage.css'
import Login from '../components/Authentication/login'
import Signup from '../components/Authentication/signup'
import React, { useState } from 'react'
import {Container, Tab, Tabs} from 'react-bootstrap'
import { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import FooterPage from '../components/Navigation/Footer'



const Loginpage = () => {

  const [user,setUser]= useState();
  const history = useHistory();

   useEffect(() => {

       const user =  JSON.parse(localStorage.getItem("userInfo"));
       setUser(user);

       if(user){
           history.push('/');
       }
    }, [history]);


  return (
    <div className='form' >
      <Container className='topBar' >
        <h2 style={{marginLeft:"520px", marginTop:"50px"}}><b>User Login</b></h2><br></br>
        
      </Container>

      <Tabs
  defaultActiveKey="home"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
  >
   
  <Tab eventKey="home" title="Log In" style={{marginLeft:"100px"}}>
    
   <Login/>
      {/* <Sonnet /> */}
  </Tab>

  <Tab eventKey="signin" title="Sign In">
    
    <Signup/>
    {/* <Sonnet /> */}
  </Tab>

</Tabs>
{/* <FooterPage/> */}
 </div>
  )
}

export default Loginpage