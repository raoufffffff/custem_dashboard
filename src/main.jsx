import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Order from './pages/Order.jsx';
import DashBoard from './pages/DashBoard.jsx';
import AddItems from './pages/AddItems.jsx';
import Items from './pages/Items.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<DashBoard />} />
      <Route path='Orders' element={<Order />} />
      <Route path='AddItems' element={<AddItems />} />
      <Route path='Items' element={<Items />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
