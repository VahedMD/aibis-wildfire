import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

const PrivateRoutes = ({ Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/sign" />;
};
export default PrivateRoutes;
