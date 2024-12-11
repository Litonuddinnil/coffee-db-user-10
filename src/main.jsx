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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    loader: ()=>fetch('http://localhost:5000/coffee')
  },
  {
    path:"/addCoffee",
    element:<AddCoffee></AddCoffee>
  },
  {
    path:"/updateCoffee/:id",
    element:<UpdateCoffe></UpdateCoffe>,
    loader: ({params})=>fetch(`http://localhost:5000/coffee/${params.id}`)
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
