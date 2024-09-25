import { useEffect, useState } from "react";
import Label from "../components/Label";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addChallenge,
  addNotification,
  updateChallenge,
} from "../store/action";
import { Challange } from "../types";
import { generateId } from "../utils";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

type State = {
  challenge: Challange;
};

function Hackathon() {
  const [state, setState] = useState<State>({
    challenge: {
      startDate: "",
      endDate: "",
      name: "",
      description: "",
      image: "",
      level: "Easy",
      id: "",
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { hackathonId } = useParams();
  const challenges = useSelector(
    (state: any) => state.challenges
  ) as Challange[];

  const isEdit = location.pathname.includes("/edit");

  const handleEditChallenge = async () => {
    if (
      state.challenge.name &&
      state.challenge.description &&
      state.challenge.startDate &&
      state.challenge.endDate &&
      state.challenge.image &&
      state.challenge.level
    ) {
      const updatedChallenge = state.challenge;
      dispatch(updateChallenge(updatedChallenge));
      const id = await generateId();
      dispatch(
        addNotification({ msg: "Challenge updated", type: "success", id: id })
      );
    } else {
      const id = await generateId();
      dispatch(
        addNotification({
          msg: "All fields are required",
          type: "error",
          id: id,
        })
      );
    }
  };

  const handleAddChallenge = async () => {
    if (
      state.challenge.name &&
      state.challenge.description &&
      state.challenge.startDate &&
      state.challenge.endDate &&
      state.challenge.image &&
      state.challenge.level
    ) {
      const newChallenge = state.challenge;
      newChallenge.id = await generateId();
      dispatch(addChallenge(newChallenge));
      const id = await generateId();
      setState((prev) => ({
        ...prev,
        challenge: {
          ...prev.challenge,
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          image: "",
          level: "Easy",
        },
      }));
      dispatch(
        addNotification({ msg: "Challenge created", type: "success", id: id })
      );
    } else {
      const id = await generateId();
      dispatch(
        addNotification({
          msg: "All fields are required",
          type: "error",
          id: id,
        })
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      const challenge = challenges.find((cha) => cha.id === hackathonId);
      setState((prev) => ({ ...prev, challenge: challenge! }));
    }
  }, []);
  return (
    <StyledHackathon>
      <HackathonHeader>
        <Label weight={700} size="24px">
          Challenge Details
        </Label>
      </HackathonHeader>
      <HackathonForm>
        <FormItem>
          <Label weight={500} size="16px">
            Challenge Name
          </Label>
          <InputField
            value={state.challenge.name}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: { ...prev.challenge, name: e },
              }))
            }
            type="text"
            height="40px"
            sx={{ border: "1px solid #B7B7B7" }}
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <FormItem>
          <Label weight={500} size="16px">
            Start Date
          </Label>
          <InputField
            value={state.challenge.startDate}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: { ...prev.challenge, startDate: e },
              }))
            }
            type="datetime-local"
            height="40px"
            sx={{ border: "1px solid #B7B7B7" }}
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <FormItem>
          <Label weight={500} size="16px">
            End Date
          </Label>
          <InputField
            value={state.challenge.endDate}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: { ...prev.challenge, endDate: e },
              }))
            }
            type="datetime-local"
            height="40px"
            sx={{ border: "1px solid #B7B7B7" }}
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <FormItem>
          <Label weight={500} size="16px">
            Description
          </Label>
          <InputField
            value={state.challenge.description}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: { ...prev.challenge, description: e },
              }))
            }
            type="textarea"
            height="auto"
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <FormItem>
          <Label weight={500} size="16px">
            Image
          </Label>
          {state.challenge.image && (
            <Image>
              <img
                src={state.challenge.image}
                alt="image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Image>
          )}
          <InputField
            value={state.challenge.image}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: { ...prev.challenge, image: e },
              }))
            }
            type="file"
            height="40px"
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <FormItem>
          <Label weight={500} size="16px">
            Level
          </Label>
          <InputField
            value={state.challenge.level}
            onChange={(e: string) =>
              setState((prev) => ({
                ...prev,
                challenge: {
                  ...prev.challenge,
                  level: e as Challange["level"],
                },
              }))
            }
            type="select"
            height="40px"
            width={"500px"}
            placeholder={""}
          />
        </FormItem>
        <Button
          onClick={isEdit ? handleEditChallenge : handleAddChallenge}
          sx={{ backgroundColor: "#44924C", color: "white", marginTop: "2rem" }}
        >
          {isEdit ? "Edit" : "Create"} Challange
        </Button>
      </HackathonForm>
    </StyledHackathon>
  );
}

const StyledHackathon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HackathonHeader = styled.div`
  width: 100%;
  min-height: 107px;
  display: flex;
  align-items: center;
  background-color: #f8f9fd;
  padding-left: 2rem;
`;

const HackathonForm = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Image = styled.div`
width: 500px;
height: 300px;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid #B7B7B7;
overflow: hidden;
`;

export default Hackathon;
