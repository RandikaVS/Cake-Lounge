import React from 'react'
import './Header.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


 const Header = () => {

  const history = useHistory();


  let logout= () => {

      Swal.fire({
  title: 'Are you want to logout?',
  text: "Please save data before log out",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Logout!'
}).then((result) => {
  if (result.isConfirmed) {
        localStorage.removeItem('userInfo');
        history.push('/');
  }
})
  }

    
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light Navigation" >
  <div class="container-fluid" style={{justifyContent:'center'}}>
    <a class="navbar-brand" href="#">Cake-Lounge</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home" style={{marginLeft:'1000px'}}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onClick={logout}>Logout</a>
        </li>
        <li>
          

          <IconButton style={{marginLeft:'10px',marginTop:'2px'}}>
            <Badge badgeContent={20} color="error"max={9}>
        <NotificationsIcon ></NotificationsIcon>
        </Badge>
        </IconButton>
        </li>
        <li>
          <IconButton style={{marginLeft:'5px',marginTop:'2px'}}>
            <Badge badgeContent={5} color="error" max={9}>
        <FavoriteIcon ></FavoriteIcon>
        </Badge>
        </IconButton>
        </li>
        <li>
        <IconButton style={{marginLeft:'5px',marginTop:'2px'}}>
            <Badge badgeContent={15} color="error" max={9}>
        <ShoppingCartIcon ></ShoppingCartIcon>
        </Badge>
        </IconButton>
        </li>
      </ul>
      {/* <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
  )
}

export default Header;
