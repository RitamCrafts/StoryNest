import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import "./index.css";
import AboutPage from './pages/AboutPage.jsx';

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DiscoverPage from './pages/DiscoverPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>

    <Route element={<ProtectedRoute/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/discover' element={<DiscoverPage/>}/>
    </Route>

    <Route element={<PublicRoute/>}>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Route>

  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
  </StrictMode>
)
