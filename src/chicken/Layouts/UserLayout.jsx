import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import AuthPage from "../Pages/AuthPage";
import Home from "../Pages/Home";
import { MusicContext } from "../Context/MusicContext";

const UserLayout = () => {


  const { audioRef } =  useContext(MusicContext);

  useEffect(() => {
    const handlePlay = () => {
      audioRef.current?.play().catch((e) => {
        console.warn("Autoplay failed:", e);
      });
    };

    document.addEventListener("click", handlePlay, { once: true });

    return () => {
      document.removeEventListener("click", handlePlay);
    };
  }, [audioRef]);

  return (
    <div className="">
      <audio src="/images/audio.mp3" ref={audioRef} loop preload="auto"></audio>
      {/* <Navbar /> */}
      <main className="">
        <Routes>
          <Route path="/" element={<Navigate to={"/auth"} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/play" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserLayout;
