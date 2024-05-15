import React from "react";
import { FaGoogle } from "react-icons/fa6";
import styled from "styled-components";
import bg from "../media/images/bg1.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../config/firebase";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignPage = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const Login = async () => {
    const provider = new GoogleAuthProvider();

    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }

    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
        lastName: "",
      });
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/user/dashboard");
    }
  };

  return (
    <Wrapper className="max-h-screen overflow-hidden">
      <img
        src={bg}
        alt=""
        className="h-screen overflow-hidden flex items-center justify-center"
      />
      <div className="absolute z-10 bg-[rgba(0,0,0,0.8)] w-screen h-screen text-white flex flex-col items-center justify-center gap-12">
        <p className="font-semibold text-center text-2xl tracking-wide leading-10 w-2/3">
          The threat of wildland fires has become an increasing concern
          worldwide. <br /> Joint us to access full management stage.
        </p>

        <p className="text-3xl w-2/3 text-center">
          Use your GOOGLE account to access the user dashboard
        </p>
        <div
          onClick={Login}
          className="w-44 border-cyan-500 border-8 shadow-2xl flex items-center justify-center py-4 rounded-full cursor-pointer hover:bg-slate-300 hover:text-gray-600 transition-all duration-200 ease-in-out"
        >
          <FaGoogle className="text-5xl w-28 " />
        </div>
      </div>
    </Wrapper>
  );
};

export default SignPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    to top,
    rgba(232, 25, 139, 0.5) 0%,
    rgba(199, 234, 253, 0.4) 100%
  );
  margin-top: 4rem;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6rem;
`;
