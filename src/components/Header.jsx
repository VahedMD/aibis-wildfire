import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaCogs,
  FaSignInAlt,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";
import {
  FaMapLocationDot,
  FaMoneyCheckDollar,
  FaBuildingUser,
} from "react-icons/fa6";
import { RiMenuFold2Fill } from "react-icons/ri";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <header className="fixed z-50 w-screen">
      {/* Desktop and tablet*/}
      <div className="hidden md:flex items-center justify-between font-medium tracking-wide text-xs bg-headingColor p-8 m-0 shadow-2xl shadow-blue-600 h-8 transition-all duration-300 ease-in-out">
        <div className="font-logo text-xl drop-shadow-logo text-white">
          <Link to="/">
            <motion.p whileTap={{ scale: 0.6 }}>AiBiSWildfire</motion.p>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-6 "
          >
            <motion.li
              whileTap={{ scale: 0.4 }}
              className="text-sm text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
            >
              <NavLink to="/" className="flex items-center gap-1">
                <FaHome />
                Home
              </NavLink>
            </motion.li>
            <motion.li
              whileTap={{ scale: 0.4 }}
              className="text-sm text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
            >
              <NavLink to="/applications" className="flex items-center gap-1">
                <FaCogs />
                apps
              </NavLink>
            </motion.li>
            <motion.li
              whileTap={{ scale: 0.4 }}
              className="text-sm text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
            >
              <NavLink to="/maps" className="flex items-center gap-1">
                <FaMapLocationDot />
                maps
              </NavLink>
            </motion.li>
            <motion.li
              whileTap={{ scale: 0.4 }}
              className="text-sm text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
            >
              <NavLink to="/pricing" className="flex items-center gap-1">
                <FaMoneyCheckDollar />
                pricing
              </NavLink>
            </motion.li>
            <motion.li
              whileTap={{ scale: 0.4 }}
              className="text-sm text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
            >
              <NavLink to="/about-us" className="flex items-center gap-1">
                <FaBuildingUser />
                company
              </NavLink>
            </motion.li>
          </motion.ul>
        </div>
        <motion.div whileTap={{ scale: 0.4 }} className="relative">
          <NavLink
            to="/sign"
            className="text-sm flex items-center gap-1 text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
          >
            <FaSignInAlt className="text-base" />
            signin/up
          </NavLink>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full h-full bg-headingColor items-center justify-between p-4 relative transition-all duration-100 ease-in-out">
        <motion.div
          whileTap={{ scale: 0.4 }}
          className="text-2xl text-primary cursor-pointer "
          onClick={() => {
            setIsMenu(!isMenu);
          }}
        >
          <RiMenuFold2Fill />
        </motion.div>
        <div className="font-logo text-xl drop-shadow-logo text-white">
          <Link to="/">
            <motion.p whileTap={{ scale: 0.6 }}>AiBiSWildfire</motion.p>
          </Link>
        </div>
        <motion.div
          whileTap={{ scale: 0.4 }}
          className="text-2xl text-primary cursor-pointer "
          onClick={() => {
            setIsMenu(false);
          }}
        >
          <FaSignInAlt />
        </motion.div>
      </div>
      {isMenu && (
        <div className="z-40 absolute top-19 left-6 w-[80dvw] h-[50dvh] flex items-center justify-center bg-headingColor rounded-3xl">
          <div>
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex flex-col items-center gap-8 "
            >
              <motion.li
                whileTap={{ scale: 0.4 }}
                className="text-lg text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <NavLink to="/" className="flex items-center gap-4">
                  <FaHome />
                  Home
                </NavLink>
              </motion.li>
              <motion.li
                whileTap={{ scale: 0.4 }}
                className="text-lg text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <NavLink to="/applications" className="flex items-center gap-4">
                  <FaCogs />
                  apps
                </NavLink>
              </motion.li>
              <motion.li
                whileTap={{ scale: 0.4 }}
                className="text-lg text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <NavLink to="/maps" className="flex items-center gap-4">
                  <FaMapLocationDot />
                  maps
                </NavLink>
              </motion.li>
              <motion.li
                whileTap={{ scale: 0.4 }}
                className="text-lg text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <NavLink to="/pricing" className="flex items-center gap-4">
                  <FaMoneyCheckDollar />
                  pricing
                </NavLink>
              </motion.li>
              <motion.li
                whileTap={{ scale: 0.4 }}
                className="text-lg text-primary hover:text-cyan-400 duration-100 transition-all ease-in-out cursor-pointer uppercase"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <NavLink to="/about-us" className="flex items-center gap-4">
                  <FaBuildingUser />
                  company
                </NavLink>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
