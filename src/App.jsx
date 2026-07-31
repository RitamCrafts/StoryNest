import React, { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import authService from "./appwrite/auth.js";
import {EmergencyBG,LeafyBG} from "./components/Backgrounds";
import { Outlet } from "react-router-dom";
import Loading from "./pages/LoadingPage.jsx";
import { Header,Footer } from "./components/index.js";

function App() {
  const [loading , setLoading] = useState(true);
  const authContext = useAuthContext();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        authContext.login(userData);
      }
      else {
        authContext.logout();
      }
    })
    .finally(()=>{setLoading(false)})

  },[]);
  
  if(loading)
    return(
      <>
        <Loading/>
        <LeafyBG/>
      </>
    )

  else

    return(
      <>
        <div className="relative min-h-screen">

          <LeafyBG />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Outlet/>
            </main>
            <Footer />
          </div>
        

        </div> 
      </>
    )
    
}

export default App
