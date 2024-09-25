import ai from "../../assets/ai.png";
import data from "../../assets/data.png";
import challange from "../../assets/challange.png";
import styled from "styled-components";
import Label from "../Label";
import Divider from "../Divider";

type BannerProps = {
  logo: string;
  name: string;
  size: number;
  heading: string;
  subHeading: string;
};

const Banner = ({ logo, name, size, heading, subHeading }: BannerProps) => {
  return (
    <StyledInfoBanner>
      <StyledInfoBannerLogo>
        <img src={logo} alt={name} width={size} height={size} />
      </StyledInfoBannerLogo>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Label color="white" weight={700} size="24px">
          {heading}
        </Label>
        <Label color="white" weight={500} size="16px">
          {subHeading}
        </Label>
      </div>
    </StyledInfoBanner>
  );
};

function StatsSection() {
  return (
    <StyledSection>
      <Banner
        logo={ai}
        name="ai"
        size={26}
        heading="100K+"
        subHeading="AI model submissions"
      />
      <Divider type="vertical" length="36px" />
      <Banner
        logo={data}
        name="data"
        size={22}
        heading="50K+"
        subHeading="Data Scientists"
      />
      <Divider type="vertical" length="36px" />
      <Banner
        logo={challange}
        name="challange"
        size={22}
        heading="100+"
        subHeading="AI Challenges hosted"
      />
    </StyledSection>
  );
}

const StyledSection = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #002a3b;
`;

const StyledInfoBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 350px;
`;

const StyledInfoBannerLogo = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f4ff;
  border-radius: 15px;
`;

export default StatsSection;
