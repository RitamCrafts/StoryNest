import React, { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import authService from "./appwrite/auth.js";
import {PlainBG,LeafyBG,LeafyBGLite} from "./components/Backgrounds";
import { Outlet, useLocation } from "react-router-dom";
import FullScreenLoading from "./pages/FullScreenLoading.jsx";
import { Header,Footer } from "./components/index.js";
import {ScrollManager,ReactToaster} from "./utils";

function App() {
  const [loading , setLoading] = useState(true);
  const authContext = useAuthContext();
  const location = useLocation();
  const liteBackgroundRoutes = [
    "/",
    "/discover",
    "/write",
    "/story",
    "/profile",
    "/home",
  ];

  const useLiteBackground = liteBackgroundRoutes.some((route) =>
    route === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(route)
  );


  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if (userData) {
          authContext.login(userData);
        } else {
          authContext.logout();
        }
      })
      .catch(()=>{
        authContext.logout();
      })
      .finally(()=>{setLoading(false)});

  },[]);
  
  if(loading)
    return(
      <>
        <FullScreenLoading/>
        <LeafyBG/>
      </>
    )

  else

    return(
      <>
        <div className="relative min-h-screen">


          {useLiteBackground ? <LeafyBGLite /> : <LeafyBG />}
          <ScrollManager />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <ReactToaster/>
              <Outlet/>
            </main>
            <Footer />
          </div>
        

        </div> 
      </>
    )
    
}

export default App