import rocket from "../../assets/rocket.svg";
import styled from "styled-components";
import Label from "../Label";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function IntroSection() {

  const navigate = useNavigate();

  return (
    <StyledSection>
      <div style={{ width: "705px", height: "348px", display: "flex" }}>
        <div style={{ width: "62px", height: "100%", display: "flex" }}>
          <div
            style={{
              width: "10px",
              height: "116px",
              backgroundColor: "#FFCE5C",
            }}
          />
        </div>
        <div
          style={{
            color: "white",
            width: "643px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Label color="white" weight={600} size="48px">
            Accelerate Innovation with Global AI Challenges
          </Label>
          <Label color="white" weight={500} size="18px">
            AI Challenges at DPhi simulate real-world problems. It is a great
            place to put your AI/Data Science skills to test on diverse datasets
            allowing you to foster learning through competitions.
          </Label>
          <Button onClick={() => navigate('/create')} >Create Challenge</Button>
        </div>
      </div>
      <img src={rocket} alt="rocket" width={242} height={294} />
    </StyledSection>
  );
}

const StyledSection = styled.div`
  width: 100%;
  height: 561px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #003145;
  gap: 2rem;
`;

export default IntroSection;
