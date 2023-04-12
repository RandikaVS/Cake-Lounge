import './App.css';
import { Route } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Loginpage from './pages/Loginpage';
import  Chatpage  from './pages/Chatpage';
import Homepage from './pages/Homepage';
import Profilepage from './pages/Profilepage'
import AdminLogin from './pages/AdminLogin'
import Header from './components/Navigation/Header'
import FooterPage from './components/Navigation/Footer';
import ShopDashboard from './pages/ShopDashboard';
import ShopRegisterPage from './pages/ShopRegisterPage';
import UpdateProduct from './components/Shop/updateProduct';
import CakeLoungeHomePage from './components/Navigation/CakeLoungeHomePage';
import ProductPage from './pages/ProductPage';
import ProductChatPage from './pages/ProductChatPage';



function App() {
  return (
    <div className="App">

      <CakeLoungeHomePage/>
      <Route path='/' component={Loginpage} exact/>
      <Route path = '/home' component={Homepage} exact/>
      <Route path = '/profile' component={Profilepage} exact/>
      <Route path='/chats' component={Chatpage} exact/>
      <Route path='/admin/login' component={AdminLogin} exact/>
      <Route path='/shop' component={ShopDashboard} exact/>
      <Route path='/shopRegister' component={ShopRegisterPage} exact />
      <Route path = '/updateProduct' component={UpdateProduct} exact />
      <Route path='/product' component={ProductPage} exact />
      <Route path='/productChatPage' component={ProductChatPage}exact />



      <FooterPage/>
    </div>
  );
}

export default App;
