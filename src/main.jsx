import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Order from './pages/Order.jsx';
import DashBoard from './pages/DashBoard.jsx';
import AddItems from './pages/AddItems.jsx';
import Items from './pages/Items.jsx';
import ProtectedRoute from './layout/ProtectedRoute .jsx';
import Login from './pages/Login.jsx';
import Sinin from './pages/Sinin.jsx';
import { Toaster } from 'react-hot-toast';
import Notifications from './pages/Notifications.jsx';
import CreateWebsite from './pages/CreateWebsite.jsx';
import ModifyWebsite from './pages/ModifyWebsite.jsx';
import TruckOrder from './pages/TruckOrder.jsx';
import LivCompany from './pages/LivCompany.jsx';
import LivrisionPrice from './pages/LivrisionPrice.jsx';
import Update from './pages/Update.jsx';
import UpdateLogo from './pages/UpdateLogo.jsx';





const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/" element={<App />}>
        <Route index
          element={
            <ProtectedRoute><DashBoard /></ProtectedRoute>
          } />
        <Route path="Orders" element={
          <ProtectedRoute><Order /></ProtectedRoute>
        } />
        <Route path="TruckOrder" element={
          <ProtectedRoute><TruckOrder /></ProtectedRoute>
        } />
        <Route path="AddItems" element={
          <ProtectedRoute><AddItems /></ProtectedRoute>
        } />
        <Route path="Items" element={
          <ProtectedRoute><Items /></ProtectedRoute>
        } />
        <Route path="Notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        } />
        <Route path="create-website" element={
          <ProtectedRoute><CreateWebsite /></ProtectedRoute>
        } />
        <Route path="update" element={<ProtectedRoute
        ><Update /></ProtectedRoute>
        } >
          <Route path=":id" element={<ProtectedRoute><UpdateLogo /></ProtectedRoute>} />
        </Route>
        <Route path="LivCompany" element={
          <ProtectedRoute><LivCompany /></ProtectedRoute>
        } />
        <Route path="LivrisionPrice" element={
          <ProtectedRoute><LivrisionPrice /></ProtectedRoute>
        } />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="sinin" element={<Sinin />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />

  </StrictMode>
);
