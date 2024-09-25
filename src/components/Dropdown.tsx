import { useEffect, useRef, useState } from "react";
import Label from "./Label";
import caret from "../assets/Caret.png";
import Divider from "./Divider";
import styled, { CSSProperties } from "styled-components";
import { filter } from "../types";

type State = {
  open: boolean;
};

type Props = {
  filter: filter;
  onFilterChange: (filter: filter) => void;
};

type ItemProps = {
  value: string;
  checked: boolean;
  onFilterChange: (filter: filter) => void;
  filter: filter;
  sx?: CSSProperties;
};

function Item({ value, sx, checked, onFilterChange, filter }: ItemProps) {
  return (
    <StyledItem style={sx}>
      <input
        onChange={(e) =>
          onFilterChange({
            active: value === "Active" ? e.target.checked : filter.active,
            upcoming: value === "Upcoming" ? e.target.checked : filter.upcoming,
            past: value === "Past" ? e.target.checked : filter.past,
            easy: value === "Easy" ? e.target.checked : filter.easy,
            medium: value === "Medium" ? e.target.checked : filter.medium,
            hard: value === "Hard" ? e.target.checked : filter.hard,
          })
        }
        type="checkbox"
        id={value}
        checked={checked}
      />
      <Label weight={400} size="16px">
        {value}
      </Label>
    </StyledItem>
  );
}

function Dropdown({ filter, onFilterChange }: Props) {
  const [state, setState] = useState<State>({
    open: false,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setState({ open: false });
      }
    };

    if (state.open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.open]);

  return (
    <StyledDropdown ref={dropdownRef} open={state.open}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
        onClick={() => setState((prev) => ({ ...prev, open: !state.open }))}
      >
        <Label weight={400} size="18px">
          Filter
        </Label>
        <img
          src={caret}
          alt="down"
          width={13}
          height={6}
          style={{
            marginLeft: "auto",
            transform: state.open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Dropdown Content */}
      <StyledContent open={state.open}>
        {state.open && (
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Divider type="horizontal" length="100%" />
            <Label weight={400} size="18px" color="#666666">
              Status
            </Label>
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.active}
              value="Active"
              sx={{ marginTop: "0.5rem" }}
            />
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.upcoming}
              value="Upcoming"
            />
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.past}
              value="Past"
              sx={{ marginBottom: "0.5rem" }}
            />
            <Divider type="horizontal" length="100%" />
            <Label weight={400} size="18px" color="#666666">
              Level
            </Label>
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.easy}
              value="Easy"
              sx={{ marginTop: "0.5rem" }}
            />
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.medium}
              value="Medium"
            />
            <Item
              filter={filter}
              onFilterChange={onFilterChange}
              checked={filter.hard}
              value="Hard"
            />
          </div>
        )}
      </StyledContent>
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div<{ open: boolean }>`
  background-color: white;
  padding: 0rem 1rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  border-bottom-right-radius: ${(p) => (p.open ? "0px" : "12px")};
  border-bottom-left-radius: ${(p) => (p.open ? "0px" : "12px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  position: relative;
  width: ${(p) => (p.open ? "200px" : "auto")};
  height: 50px;
  z-index: 10;
`;

const StyledContent = styled.div<{ open: boolean }>`
  position: absolute;
  top: 90%;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  max-height: ${(p) => (p.open ? "500px" : "0")};
  transition: max-height 0.5s ease-in-out;
  border-top-right-radius: ${(p) => (p.open ? "0px" : "12px")};
  bordertopleftradius: ${(p) => (p.open ? "0px" : "12px")};
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default Dropdown;
