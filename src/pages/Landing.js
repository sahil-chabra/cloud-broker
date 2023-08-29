import { useNavigate } from "react-router-dom";

import Wrapper from "../assests/wrappers/LandingPage";

const Landing = () => {
  const navigate = useNavigate();
  const LandingPage = (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            Cloud<span>Broker</span>App
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            culpa qui id excepturi cupiditate dolore possimus! Soluta recusandae
            vitae, debitis ullam impedit deserunt hic aliquam, corporis ipsam
            maxime eaque magnam!
          </p>
          <button className="btn" onClick={() => navigate("/register")}>
            Login/Register
          </button>
        </div>
      </div>
    </Wrapper>
  );
  return LandingPage;
};
export default Landing;
