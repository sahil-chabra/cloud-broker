import { Outlet } from "react-router-dom";

import Wrapper from "./SharedLayoutStyles";
import { BigSideBar, NavBar } from "../../components/UserDashBoard/index";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* <BigSideBar /> */}
        <div>
          {/* <NavBar /> */}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
