import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './Components/AddCoffee.jsx';
import UpdateCoffe from './Components/UpdateCoffe.jsx';
import HomeLayout from './Components/HomeLayout/HomeLayout.jsx';
import SingIn from './Components/SingIn.jsx';
import SingUp from './Components/SingUp.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Users from './Components/Users.jsx';
import UpdateUser from './Components/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    loader: ()=>fetch('https://cofee-store-server-ten.vercel.app/coffee')
  },
  {
    path:"/addCoffee",
    element:<AddCoffee></AddCoffee>
  },
  {
    path:"/updateCoffee/:id",
    element:<UpdateCoffe></UpdateCoffe>,
    loader: ({params})=>fetch(`https://cofee-store-server-ten.vercel.app/coffee/${params.id}`)
  },
  {
    path:"/singUp",
    element:<SingUp></SingUp>
  },
  {
    path:"/singIn",
    element:<SingIn></SingIn>
  },
  {
    path:"/users",
    element:<Users></Users>,
    loader: ()=>fetch('https://cofee-store-server-ten.vercel.app/users')
  },
  {
    path:"/editUser/:email",
    element:<UpdateUser></UpdateUser>,
    loader:({params})=>fetch(`https://cofee-store-server-ten.vercel.app/users/${params.email}`)
  }
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
