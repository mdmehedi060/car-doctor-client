
import { createBrowserRouter } from 'react-router-dom';
import Main from './../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Signup from './../Pages/Signup/Signup';
import CheckOut from '../Pages/CheckOut/CheckOut';
import Bookings from './../Pages/Bookings/Bookings';
import PrivateRouts from './PrivateRouts';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path: '/',
          element:<Home></Home>,
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Signup></Signup>
        },
      
        {
          path:'checkout/:id',
          element:<PrivateRouts><CheckOut></CheckOut></PrivateRouts>,
          loader: ({params})=> fetch(`http://localhost:5000/services/id/${params?.id}`)
        },
        {
          path:'bookings',
          element:<PrivateRouts><Bookings></Bookings></PrivateRouts>,
          // loader: ({params})=> fetch(`http://localhost:5000/services/id/${params?.id}`)
        },
      ]
    },
  ]);

  export default router;