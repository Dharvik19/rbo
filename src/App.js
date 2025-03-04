import logo from './logo.svg';
import './App.css';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dash from './Pages/Dash';
import Header from './Layout/Header';
import "bootstrap-icons/font/bootstrap-icons.css";
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Success from './Pages/Success';
import Header2 from './Layout/Header2';
import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import Loader from './Pages/Loader';
import Profile from './Pages/Profile';
import OrderPage from './Pages/OrderPage';
import ChangePassword from './Pages/ChangePassword';
import OrderViewPage from './Pages/OrderViewPage';

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <MobApp />,
    children: [
      {
        path: "/",
        element: <Dash />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/cart',
        element: <Cart />
      }
      ,
      {
        path: '/checkout',
        element: <Checkout />
      }
      ,
      {
        path: '/success',
        element: <Success />
      }, 
      {
        path : '/profile',
        element : <Profile/>
      },
      {
        path : '/order',
        element : <OrderPage/>
      },
      {
        path : '/changepassword',
        element : <ChangePassword/>
      },
      {
        path : '/order/:orderid',
        element : <OrderViewPage/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },


])

// function checkLocalStorageAndRedirect(navigate) {
//   const userid = localStorage.getItem('userid');
//   if (userid !== null) {
//     navigate('/shop');
//   }
// }


function MobApp() {

  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // checkLocalStorageAndRedirect(navigate);


    App.addListener('backButton', data => {
      console.log('Restored state:', data);

      if (window.location.pathname === '/shop') {
        console.log('dont go back')
      }
      else if (window.location.pathname === '/') {
        console.log('dont go back')
      }
      else {
        navigate(-1)
      }


    });



  }, [navigate]);



  setTimeout(() => {
    setLoader(false)
  }, 2000);


  // <link href="https://pay.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.css" rel="stylesheet">

  return (
    <>

      {loader && <Loader />}

      <div className='main_wrapper'>
        {window.location.pathname !== '/success' && <Header />}
        <Outlet />
      </div>


    </>

  );
}

export default Routing;
