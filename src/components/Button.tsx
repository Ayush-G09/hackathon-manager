import React from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  children: React.ReactNode;
  sx?: CSSProperties;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ children, sx, icon, disabled = false, onClick }: Props) {
  return (
    <StyledButton onClick={onClick} style={sx} disabled={disabled}>
      {icon}
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.div<{ disabled: boolean }>`
  background-color: white;
  color: black;
  width: fit-content;
  cursor: pointer;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
    scale: 0.99;
  }
`;

export default Button;
