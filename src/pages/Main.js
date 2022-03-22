
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "tabler-react";
import { Container, Nav } from "../styles/mainStyled";

import signOutThunk from "../thunks/sign-out-thunk";
import { useRef, useState } from "react";

const Main = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(signOutThunk());
    navigate("/login");
  };
  const [showSidebar, setShowSidebar] = useState(true);
  const handleSidebarShow = () => setShowSidebar(!showSidebar);
  const nav = useRef();
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".nav").addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        setShowSidebar(false);
      }
    });
  });
  return (
    <Container className={!showSidebar ? "active  nav" : "nav"}>
      <Nav ref={nav} className={showSidebar ? "active  nav" : "nav"}>
        <NavLink to={"/shops"}>Магазины</NavLink>

        <Button onClick={handleClick}>Выйти</Button>
      </Nav>
      <button
        onClick={handleSidebarShow}
        className={showSidebar ? "active" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Menu</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </svg>
      </button>
      <div></div>
      <Outlet />
    </Container>
  );
};

export default Main;
