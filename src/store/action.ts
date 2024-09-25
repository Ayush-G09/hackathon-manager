import { Challange, NotificationCard } from "../types";

export const addChallenge = (challenge: Challange) => ({
  type: "ADD_CHALLENGE" as const,
  payload: challenge,
});

export const updateChallenge = (challenge: Challange) => ({
  type: "UPDATE_CHALLENGE" as const,
  payload: challenge,
});

export const deleteChallenge = (id: string) => ({
  type: "DELETE_CHALLENGE" as const,
  payload: id,
});

export const addNotification = (notification: NotificationCard) => ({
  type: "ADD_NOTIFICATION" as const,
  payload: notification,
});

export const removeNotification = (id: string) => ({
  type: "REMOVE_NOTIFICATION" as const,
  payload: id,
});

