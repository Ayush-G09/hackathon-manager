import React from "react";

type Props = {
  type: "vertical" | "horizontal";
  length: string;
  color?: string;
};

function Divider({ type, length, color = "#C4C4C4" }: Props) {
  return (
    <div
      style={{
        width: type === "vertical" ? "1px" : length,
        height: type === "horizontal" ? "1px" : length,
        backgroundColor: color,
      }}
    />
  );
}

export default Divider;
