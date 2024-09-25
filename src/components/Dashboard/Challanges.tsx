import styled from "styled-components";
import ChallangeCard from "../ChallangeCard";
import { Challange } from "../../types";

type Props = {
  challenges: Challange[];
}

function Challanges({challenges}: Props) {
  return (
    <StyledChallanges>
      <StyledChallangeGrid>
        {challenges.map((data) => (
          <ChallangeCard data={data} key={data.id} />
        ))}
      </StyledChallangeGrid>
    </StyledChallanges>
  );
}

const StyledChallanges = styled.div`
  width: 100%;
  background-color: #003145;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 0rem;
`;

const StyledChallangeGrid = styled.div`
  display: grid;
  width: 1172px;
  grid-template-columns: repeat(3, 1fr);
  gap: 55px;
`;

export default Challanges;
