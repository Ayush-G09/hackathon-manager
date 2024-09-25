import styled from "styled-components";
import Label from "../Label";
import book from "../../assets/book.svg";
import community from "../../assets/community.svg";
import robot from "../../assets/Robot.svg";
import recognition from "../../assets/recognition.svg";

type InfoCardProps = {
  logo: string;
  name: string;
  heading: string;
  subHeading: string;
};

const InfoCard = ({ logo, name, heading, subHeading }: InfoCardProps) => {
  return (
    <StyledInfoCard>
      <img src={logo} alt={name} width={43} height={43} />
      <Label weight={600} size="24px">
        {heading}
      </Label>
      <Label weight={500} size="16px" color="#64607D">
        {subHeading}
      </Label>
    </StyledInfoCard>
  );
};

function InfoSection() {
  return (
    <StyledSection>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.7rem",
        }}
      >
        <Label weight={600} size="32px">
          Why Participate in
        </Label>
        <Label weight={600} size="32px" color="#0FA958">
          AI Challenges?
        </Label>
      </div>
      <StyledInfoGrid>
        <InfoCard
          logo={book}
          name="skill"
          heading="Prove your skills"
          subHeading="Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
        />
        <InfoCard
          logo={community}
          name="community"
          heading="Learn from community"
          subHeading="One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
        />
        <InfoCard
          logo={robot}
          name="challange"
          heading="Challenge yourself"
          subHeading="There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
        />
        <InfoCard
          logo={recognition}
          name="recognition"
          heading="Earn recognition"
          subHeading="You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
        />
      </StyledInfoGrid>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  width: 100%;
  height: 902px;
  display: flex;
  flex-direction: column;
  color: black;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const StyledInfoGrid = styled.div`
  display: grid;
  width: 1119px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 35px;
`;

const StyledInfoCard = styled.div`
  width: 542px;
  height: 276px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f8f9fd;
  border-radius: 20px;
  gap: 1.2rem;
  padding: 0rem 2rem;
`;

export default InfoSection;
