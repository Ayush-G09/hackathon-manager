import search from "../../assets/Search.png";
import styled from "styled-components";
import Label from "../Label";
import InputField from "../InputField";
import Dropdown from "../Dropdown";
import { filter } from "../../types";

type Props = {
  value: string;
  onChange: (e: string) => void;
  filter: filter;
  onFilterChange: (filter: filter) => void;
}

function SearchSection({value, onChange, filter, onFilterChange}: Props) {
  return (
    <StyledSection>
      <Label weight={600} size="28px" color="white">
        Explore Challenges
      </Label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <InputField
          type="text"
          icon={search}
          width="829px"
          placeholder="Search"
          value={value}
          onChange={onChange}
        />
        <Dropdown filter={filter} onFilterChange={onFilterChange} />
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  width: 100%;
  height: 324px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #002a3b;
  gap: 5rem;
`;

export default SearchSection;
