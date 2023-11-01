import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 100vw;

    padding: 2rem 0;
    display: flex;
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
