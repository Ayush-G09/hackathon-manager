import styled from "styled-components";
import logo from "../assets/logo.png";

function Header() {
  return (
    <StyledHeader>
      <img
        src={logo}
        alt="logo"
        width={87}
        height={38}
        style={{ paddingLeft: "2rem" }}
      />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  height: 7vh;
  background-color: white;
  display: flex;
  align-items: center;
`;

export default Header;
