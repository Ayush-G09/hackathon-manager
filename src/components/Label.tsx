import React from "react";

type Props = {
  children: React.ReactNode;
  weight: 700 | 600 | 500 | 400;
  size: "48px" | "32px" | "28px" | "24px" | "18px" | "16px" | "14px";
  color?: string;
};

function Label({ children, weight, size, color = "black" }: Props) {
  return (
    <div style={{ fontWeight: weight, fontSize: size, color: color }}>
      {children}
    </div>
  );
}

export default Label;
