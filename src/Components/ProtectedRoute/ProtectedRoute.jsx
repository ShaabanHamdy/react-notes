import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthNoteContext } from "../Context/AuthNoteContext/AuthNoteContext";

export const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(AuthNoteContext);
  if ((userData == null) & (localStorage.getItem("token") == null)) {
    return <Navigate to="/" />;
  }
  return children;
};
