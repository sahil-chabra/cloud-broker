import Wrapper from "./BigSideBarStyles";
import { useAppContext } from "../../../context/appContext";
import NavLinks from "../NavLinks/NavLinks";
const BigSideBar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          !showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;
