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
import ErrorPage from './pages/ErrorPage.jsx';

import {PublicRoute,ProtectedRoute, BannedRoute} from './utils';
import SignUpPage from './pages/SignUpPage.jsx';
import TestPage from './pages/TestPage.jsx';
import WritePage from './pages/WritePage.jsx';
import EditPage from './pages/EditPage.jsx';
import StoryPage from './pages/StoryPage.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>} errorElement={<ErrorPage />}>

    <Route element={<ProtectedRoute/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/discover' element={<DiscoverPage/>}/>
        <Route path='/write' element={<WritePage/>}/>
        <Route path='/edit/:postId' element={<EditPage/>}/>
        <Route path='/story/:postId' element={<StoryPage/>}/>
    </Route>

    <Route element={<PublicRoute/>}>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/test-page' element={<TestPage/>}/>
    </Route>

    <Route element={<BannedRoute/>}>
      <Route path='/edit' element={<EditPage/>}/>
      <Route path='/story' element={<WritePage/>}/>
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
