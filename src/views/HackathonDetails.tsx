import { useEffect, useState } from "react";
import Label from "../components/Label";
import watch from "../assets/watch.png";
import level from "../assets/level.png";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Challange, ChallangeStatus } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  convertDateTimeToReadableFormat,
  generateId,
  getStatus,
  truncateString,
} from "../utils";
import Modal from "../components/Modal/Modal";
import { addNotification, deleteChallenge } from "../store/action";
import styled from "styled-components";

type State = {
  challange: Challange;
  modal: boolean;
  status: ChallangeStatus;
};

function HackathonDetails() {
  const [state, setState] = useState<State>({
    challange: {
      startDate: "",
      endDate: "",
      name: "",
      description: "",
      image: "",
      level: "Easy",
      id: "",
    },
    modal: false,
    status: "Upcoming",
  });

  const { hackathonId } = useParams();

  const challenges = useSelector(
    (state: any) => state.challenges
  ) as Challange[];

  useEffect(() => {
    const challange = challenges.find(
      (cha) => cha.id === hackathonId
    ) as Challange;
    setState((prev) => ({
      ...prev,
      challange: challange,
      status: getStatus(
        challange.startDate,
        challange.endDate
      ) as ChallangeStatus,
    }));
  }, [challenges]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    dispatch(deleteChallenge(state.challange.id));
    navigate("/");
    const id = await generateId();
    dispatch(
      addNotification({ msg: "Challenge deleted", type: "success", id: id })
    );
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ChallengeDetail>
          <DateBadge>
            <img src={watch} alt="watch" width={14} height={14} />
            <Label weight={600} size="14px">
              {state.status === "Upcoming"
                ? "Starts on"
                : state.status === "Active"
                ? "Ends on"
                : "Ended on"}{" "}
              {convertDateTimeToReadableFormat(
                state.status === "Upcoming"
                  ? state.challange.startDate
                  : state.challange.endDate
              )}{" "}
              (India Standard Time)
            </Label>
          </DateBadge>
          <Label weight={600} size="48px" color="white">
            {state.challange.name}
          </Label>
          <Label weight={500} size="18px" color="#F8F9FD">
            {truncateString(state.challange.description)}
          </Label>
          <LevelBadge>
            <img src={level} alt="level" width={18} height={18} />
            <Label color="#003145" weight={600} size="14px">
              {state.challange.level}
            </Label>
          </LevelBadge>
        </ChallengeDetail>
        <ChallengeOverview>
          <OverviewHeader>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                flexDirection: "column",
                width: "8%",
                marginLeft: "5rem",
              }}
            >
              <Label weight={700} size="18px">
                Overview
              </Label>
              <div
                style={{
                  height: "10%",
                  width: "100%",
                  backgroundColor: "#44924C",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  marginTop: "0.4rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginLeft: "auto",
                marginRight: "6rem",
              }}
            >
              <Button
                onClick={() => navigate(`/edit/${state.challange.id}`)}
                sx={{
                  backgroundColor: "#44924C",
                  color: "white",
                  padding: "0.4rem 1rem",
                  boxShadow: "none",
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => setState((prev) => ({ ...prev, modal: true }))}
                sx={{
                  border: "2px solid #DC1414",
                  color: "#DC1414",
                  padding: "0.3rem 1rem",
                  boxShadow: "none",
                }}
              >
                Delete
              </Button>
            </div>
          </OverviewHeader>
          <Overview>
            <div style={{ width: "90%" }}>
              <Label weight={500} size="18px" color="#64607D">
                {state.challange.description}
              </Label>
            </div>
          </Overview>
        </ChallengeOverview>
      </div>
      {state.modal && (
        <Modal onClose={() => setState((prev) => ({ ...prev, modal: false }))}>
          <Label weight={700} size="28px">
            Are you sure, you wnt to delete this challenge ?
          </Label>
          <ButtonContainer>
            <Button
              onClick={() => setState((prev) => ({ ...prev, modal: false }))}
              sx={{ color: "#DC1414", border: "1px solid #DC1414" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              sx={{ color: "#0FA958", border: "1px solid #0FA958" }}
            >
              Delete
            </Button>
          </ButtonContainer>
        </Modal>
      )}
    </>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 2rem;
  margin-bottom: 1rem;
  gap: 1.5rem;
`;

const ChallengeDetail = styled.div`
  width: 100%;
  height: 45%;
  background-color: #003145;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 5rem;
  gap: 1rem;
`;

const DateBadge = styled.div`
  width: fit-content;
  background-color: #ffce5c;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1rem;
  gap: 1rem;
`;

const LevelBadge = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fd;
  border-radius: 5px;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
`;

const ChallengeOverview = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
`;

const OverviewHeader = styled.div`
  width: 100%;
  min-height: 15%;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Overview = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 5rem 0rem;
`;

export default HackathonDetails;
