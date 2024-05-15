import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaEnvelope, FaUserLock, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/user/dashboard");
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;

      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        navigate("/");
      }
    });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <p className="info">Login to your management dashboard.</p>
        <h2 className="flex items-center justify-center gap-4">
          Sign In {"  "} <FaSignInAlt />
        </h2>
        <div className="InputField">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="InputField">
          <FaUserLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/reset-password" className="text-blue-600 underline">
          Forget Password?
        </Link>
        <button className="SubmitButton" type="submit">
          Submit
        </button>

        <p className="SocialText mt-8">
          <span className="uppercase font-bold flex items-center justify-center">
            Or
          </span>{" "}
          <br /> Continue whith Google
        </p>
        <div className="SocialMedia cursor-pointer" onClick={googleLogin}>
          <FaGoogle className="text-5xl w-28 border-black" />
        </div>
      </form>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to top, #e8198b 0%, #c7eafd 100%);
  overflow: hidden;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5rem;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5rem;
    margin: 7rem;

    .info {
      color: #000;
      letter-spacing: 0.5px;
      font-size: 1.2rem;
      text-align: center;
    }
  }

  h2 {
    font-family: "Pacifico", sans-serif;
    font-size: 2rem;
    color: black;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  img {
    width: 5rem;
  }

  .InputField {
    max-width: 30rem;
    width: 100%;
    height: 3rem;
    background: #f0f0f0;
    margin: 0.5rem 0;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;

    .icon {
      font-size: 1.4rem;
      display: block;
      margin: auto;
    }

    input {
      background: none;
      outline: none;
      border: none;
      line-height: 1;
      font-weight: 600;
      font-size: 0.9rem;
      color: black;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.6);
      font-weight: 400;
      font-size: 0.8rem;
    }
  }

  .SubmitButton {
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 50px;
    cursor: pointer;
    background: rgba(115, 0, 64, 1);
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    margin: 10px 0;
    transition: 0.5s;

    &:hover {
      background: rgba(115, 0, 64, 0.3);
      transform: scale(1.2) translateX(5px) translateY(5px);
    }
  }

  .SocialText {
    font-family: "Oleo Script", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: black;
  }

  .SocialMedia {
    display: flex;
    justify-content: center;

    a {
      padding: 6px;
      border: 1px solid #333;
      margin: 0 0.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      transition: 0.1s;

      .social {
        font-size: 2rem;
        display: block;
        margin: auto;
        color: #000;
      }

      &:hover {
        filter: blur(0px) drop-shadow(-1px -1px 3px rgba(115, 0, 64, 0.5))
          contrast(200%) brightness(150%);
        border: 2px solid rgba(115, 0, 64, 1);
      }
    }
  }
`;
