import links from "./links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, id, path } = link;

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
          >
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
