import { useEffect, useState } from "react";
import Label from "./Label";
import Button from "./Button";
import tick from "../assets/tick.png";
import styled from "styled-components";
import Badge from "./Badge";
import { Challange, ChallangeStatus } from "../types";
import { convertDateFormat, getStatus } from "../utils";
import share from "../assets/share.png";
import { useNavigate } from "react-router-dom";

type State = {
  time: { days: number; hours: number; minutes: number };
  status: ChallangeStatus;
};

type Props = {
  data: Challange;
};

function ChallangeCard({ data }: Props) {
  const [state, setState] = useState<State>({
    time: {
      days: 0,
      hours: 0,
      minutes: 0,
    },
    status: getStatus(data.startDate, data.endDate) as ChallangeStatus,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimeLeft();
    }, 60000);

    updateTimeLeft();

    return () => clearInterval(intervalId);
  }, []);

  const updateTimeLeft = () => {
    const difference =
      +new Date(state.status === "Upcoming" ? data.startDate : data.endDate) -
      +new Date();

    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
      };
      setState((prev) => ({ ...prev, time: timeLeft }));
    } else {
      setState((prev) => ({
        ...prev,
        time: { days: 0, hours: 0, minutes: 0 },
      }));
    }
  };

  return (
    <StyledCard>
      <Image>
        <img
          src={data.image}
          alt={"challangeid"}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </Image>
      <Content>
        <div
          style={{
            width: "80%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <Badge type={state.status} />
          <Label weight={600} size="16px">
            {data.name}
          </Label>
          <Countdown>
            <Label weight={500} size="14px">
              {state.status === "Upcoming"
                ? "Starts in"
                : state.status === "Active"
                ? "Ends in"
                : "Ended on"}
            </Label>
            {state.status === "Past" ? (
              <div style={{ margin: "0.6rem 0rem" }}>
                <Label color="#454545" weight={600} size="18px">
                  {convertDateFormat(data.endDate)}
                </Label>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Section>
                  <Label color="#454545" weight={600} size="18px">
                    {state.time.days}
                  </Label>
                  <Label color="#4F4F4F" weight={500} size="14px">
                    Days
                  </Label>
                </Section>
                <Section style={{ height: "100%" }}>
                  <Label color="#454545" weight={600} size="18px">
                    :
                  </Label>
                </Section>
                <Section>
                  <Label color="#454545" weight={600} size="18px">
                    {state.time.hours}
                  </Label>
                  <Label color="#4F4F4F" weight={500} size="14px">
                    Hours
                  </Label>
                </Section>
                <Section style={{ height: "100%" }}>
                  <Label color="#454545" weight={600} size="18px">
                    :
                  </Label>
                </Section>
                <Section>
                  <Label color="#454545" weight={600} size="18px">
                    {state.time.minutes}
                  </Label>
                  <Label color="#4F4F4F" weight={500} size="14px">
                    Minutes
                  </Label>
                </Section>
              </div>
            )}
          </Countdown>
          <Button
            disabled={state.status === "Past"}
            sx={{
              backgroundColor: state.status === "Past" ? "gray" : "#44924C",
              color: "white",
              marginBottom: '1rem'
            }}
          >
            <img src={tick} alt="tick" width={18} height={18} />
            {state.status === "Upcoming" ? "Register Now" : `Partichpate Now`}
          </Button>
        </div>
      </Content>
      <OpenIcon onClick={() => navigate(`/view/${data.id}`)}>
        <img src={share} alt="open" width={15} height={15} />
      </OpenIcon>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 354px;
  height: 473px;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  height: 299px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Countdown = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
`;

const Image = styled.div`
  width: 100%;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid black;
`;

const OpenIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border-radius: 50%;
  position: absolute;
  top: 90%;
  left: 85%;
`;

export default ChallangeCard;
