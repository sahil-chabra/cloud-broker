import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
  }
  .dashboard-page {
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 100%;
    }
  }
`;
export default Wrapper;
