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
import TruckOrder from './pages/TruckOrder.jsx';
import LivCompany from './pages/LivCompany.jsx';
import LivrisionPrice from './pages/LivrisionPrice.jsx';
import Update from './pages/Update.jsx';
import UpdateLogo from './pages/update/UpdateLogo.jsx';
import UpdateTheme from './pages/update/UpdateTheme.jsx';
import ProductsCrad from './pages/update/UpdateTheme/ProductsCrad.jsx';
import CategoriesCard from './pages/update/UpdateTheme/CategoriesCard.jsx';
import StoreHeader from './pages/update/UpdateTheme/StoreHeader.jsx';
import ThanksPage from './pages/update/UpdateTheme/ThanksPage.jsx';
import Color from './pages/update/UpdateTheme/Color.jsx';
import UpdateContactInfos from './pages/update/UpdateContactInfos.jsx';
import UpdateSettings from './pages/update/UpdateSettings.jsx';
import UpdateFaqs from './pages/update/UpdateFaqs.jsx';
import Categories from './pages/Categories.jsx';
import AddCategories from './pages/AddCategories.jsx';
import Settings from './pages/Settings.jsx';
import ContactUs from './pages/ContactUs.jsx';
import FAQ from './pages/FAQ.jsx';
import AddFacebookPixel from './pages/AddFacebookPixel.jsx';
import AddTiktokPixel from './pages/AddTiktokPixel.jsx';
import UpdateName from './pages/Account/UpdateName.jsx';
import UpdateEmail from './pages/Account/UpdateEmail.jsx';
import UpdatePassword from './pages/Account/UpdatePassword.jsx';
import UpdatePhone from './pages/Account/UpdatePhone.jsx';
import EdeteItem from './pages/EdeteItem.jsx';
import "./i18n"; // 👈 important

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
        <Route path="EdeteItem/:id" element={
          <ProtectedRoute><EdeteItem /></ProtectedRoute>
        } />
        <Route path="Items" element={
          <ProtectedRoute><Items /></ProtectedRoute>
        } />
        <Route path="Notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        } />
        <Route path="update" element={<ProtectedRoute
        ><Update /></ProtectedRoute>
        } >
          <Route path="logo" element={<ProtectedRoute><UpdateLogo /></ProtectedRoute>} />
          <Route path="theme" element={<ProtectedRoute><UpdateTheme /></ProtectedRoute>} >
            <Route index element={<ProtectedRoute
            ><Color /></ProtectedRoute>
            } />
            <Route path='products' element={<ProtectedRoute
            ><ProductsCrad /></ProtectedRoute>
            } />
            <Route path='categories' element={<ProtectedRoute
            ><CategoriesCard /></ProtectedRoute>
            } />
            <Route path='header' element={<ProtectedRoute
            ><StoreHeader /></ProtectedRoute>
            } />
            <Route path='thanks-page' element={<ProtectedRoute
            ><ThanksPage /></ProtectedRoute>
            } />
          </Route>
          <Route path="Contact-information" element={<ProtectedRoute><UpdateContactInfos /></ProtectedRoute>} />
          <Route path="faqs" element={<ProtectedRoute><UpdateFaqs /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><UpdateSettings /></ProtectedRoute>} />
        </Route>
        <Route path="LivCompany" element={
          <ProtectedRoute><LivCompany /></ProtectedRoute>
        } />
        <Route path="LivrisionPrice" element={
          <ProtectedRoute><LivrisionPrice /></ProtectedRoute>
        } />
        <Route path="Categories" element={
          <ProtectedRoute><Categories /></ProtectedRoute>
        } />
        <Route path="AddCategories" element={
          <ProtectedRoute><AddCategories /></ProtectedRoute>
        } />
        <Route path="Settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="ContactUs" element={
          <ProtectedRoute><ContactUs /></ProtectedRoute>
        } />
        <Route path="FAQ" element={
          <ProtectedRoute><FAQ /></ProtectedRoute>
        } />


        <Route path="AddFacebookPixel" element={
          <ProtectedRoute><AddFacebookPixel /></ProtectedRoute>
        } />
        <Route path="AddTiktokPixel" element={
          <ProtectedRoute><AddTiktokPixel /></ProtectedRoute>
        } />

        <Route path="Settings" element={<ProtectedRoute
        ><Settings /></ProtectedRoute>
        } />
        <Route path='Settings/Update-name' element={<ProtectedRoute
        ><UpdateName /></ProtectedRoute>
        } />
        <Route path='Settings/Update-Phone' element={<ProtectedRoute
        ><UpdatePhone /></ProtectedRoute>
        } />
        <Route path='Settings/Update-email' element={<ProtectedRoute
        ><UpdateEmail /></ProtectedRoute>
        } />
        <Route path='Settings/Update-password' element={<ProtectedRoute
        ><UpdatePassword /></ProtectedRoute>
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
