import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { AuthNoteContext } from "../Context/AuthNoteContext/AuthNoteContext";

export const MasterLayout = () => {
  const { userData, logout } = useContext(AuthNoteContext);
  return (
    <>
    
      <Navbar logout={logout} userData={userData} />
      <div className="container my-5 p-5">
        <Outlet />
      </div>
    </>
  );
};
