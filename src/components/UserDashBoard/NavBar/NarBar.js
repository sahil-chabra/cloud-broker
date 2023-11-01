import { FaUserCircle, FaCaretDown, FaAlignLeft } from "react-icons/fa";
import Wrapper from "./NarBarStyles";
import { useAppContext } from "../../../context/appContext";
import { useState } from "react";

const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { toggleSideBar, user, logoutUser } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowDropDown((prev) => !prev);
            }}
          >
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showDropDown ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default NavBar;
