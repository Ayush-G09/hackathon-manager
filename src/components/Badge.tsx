import Label from "./Label";
import styled from "styled-components";

type Props = {
  type: "Upcoming" | "Active" | "Past";
};

function Badge({ type }: Props) {
  return (
    <StyleBadge type={type}>
      <Label
        weight={500}
        size="14px"
        color={type === "Active" ? "#44924C" : "#666666"}
      >
        {type}
      </Label>
    </StyleBadge>
  );
}

const StyleBadge = styled.div<{ type: "Upcoming" | "Active" | "Past" }>`
  background-color: ${(p) =>
    p.type === "Upcoming"
      ? "#F2C94C40"
      : p.type === "Active"
      ? "#44924C3D"
      : "#FF3C002B"};
  width: 100px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export default Badge;
