import { Zoom } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import profile from "../media/icons/profile.svg";
import {
  FaBell,
  FaBookmark,
  FaGrip,
  FaHeart,
  FaMessage,
} from "react-icons/fa6";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { auth } from "../config/firebase";

const SideMenu = ({ children, username }) => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <Wrapper>
      <Zoom delay={500} duration={2000} triggerOnce>
        <Header>
          <img src={profile} alt="" />
          <h2>Hello {username}</h2>
        </Header>

        <Navbar>
          <nav className="nav">
            <div className="list">
              <NavLink to="/user/dashboard">
                <FaGrip className="icon" />
                <span className="text">Dashboard</span>
              </NavLink>

              <NavLink to="/user/profile">
                <FaUserCircle className="icon" />
                <span className="text">User</span>
              </NavLink>

              <NavLink to="/user/notifications">
                <FaBell className="icon" />
                <span className="text">Notification</span>
              </NavLink>

              <NavLink to="/user/favorites">
                <FaHeart className="icon" />
                <span className="text">Favorites</span>
              </NavLink>

              <NavLink to="/user/saved">
                <FaBookmark className="icon" />
                <span className="text">Saved</span>
              </NavLink>

              <NavLink to="/user/massages">
                <FaMessage className="icon" />
                <span className="text">Messages</span>
              </NavLink>
            </div>
            <NavLink to="/" onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              <span className="text">Close</span>
            </NavLink>
          </nav>
        </Navbar>

        <dir className="child">{children}</dir>
      </Zoom>
    </Wrapper>
  );
};

export default SideMenu;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  margin: 0;
  transition: 0.5s;
  min-height: 100vh;

  background-image: linear-gradient(
    to top,
    #4fb576 0%,
    #44c489 30%,
    #28a9ae 46%,
    #28a2b7 59%,
    #4c7788 71%,
    #6c4f63 86%,
    #432c39 100%
  );

  .child {
    width: 85%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 4rem;
    left: 14%;
    border-radius: 1rem;
  }
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  img {
    width: 3rem;
  }

  h2 {
    font-family: "Courgette", sans-serif;
    color: #eee;
  }
`;

const Navbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12%;
  height: calc(100vh - 4rem);
  background-color: #12192c;
  padding: 1.25rem 0.5rem 2rem;
  transition: 0.5s;
  z-index: 100;
  margin: 5px;
  border-radius: 1rem;

  .nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding-top: 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 1.3rem;
  }

  .logo-icon {
    margin-right: 1.2rem;
  }

  .logo-text {
    color: #ededed;
    font-weight: 700;
  }

  .toggle {
    position: absolute;
    top: 1.1rem;
    right: -0.6rem;
    width: 18px;
    height: 18px;
    background-color: #f5a623;
    border-radius: 50%;
    font-size: 1.25rem;
    color: #12192c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.5s;
  }

  a {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    color: #ededed;
    transition: 0.3s;
    margin-left: 1rem;

    text-decoration: none;

    &.active {
      background-color: #f5a623;
      color: #12192c;
    }

    &:hover {
      background-color: #f5a623;
      color: #12192c;
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .text {
      font-weight: 500;
    }
  }
`;
