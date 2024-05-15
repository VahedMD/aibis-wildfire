import React from "react";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LandingPage,
  NotFoundPage,
  AboutusPage,
  ApplicationPage,
  LoginPage,
  RegisterPage,
  PricingPage,
  MapsPage,
  SignPage,
  DashboardPage,
} from "./pages";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-[#292524] min-h-screen">
        <Header />

        <main className="m-0 p-0 w-full bg-[#292524]">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutusPage />} />
            <Route path="/applications" element={<ApplicationPage />} />
            <Route path="/sign" element={<SignPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/maps" element={<MapsPage />} />

            <Route
              path="/user/dashboard"
              element={<PrivateRoutes Component={DashboardPage} />}
            />
          </Routes>

          <ToastContainer />
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
