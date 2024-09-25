export type Challange = {
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  image: string;
  level: "Easy" | "Medium" | "Hard";
  id: string;
};

export type ChallangeStatus = "Upcoming" | "Active" | "Past";

export type NotificationCard = {
  msg: string;
  type: "error" | "success";
  id: string;
};

export type filter = {
  active: boolean;
  upcoming: boolean;
  past: boolean;
  easy: boolean;
  medium: boolean;
  hard: boolean;
};
