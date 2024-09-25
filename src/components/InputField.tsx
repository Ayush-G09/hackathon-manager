import { ChangeEvent, useRef } from "react";
import styled, { CSSProperties } from "styled-components";
import Label from "./Label";
import Button from "./Button";
import upload from "../assets/upload.png";

type Props = {
  width: string;
  placeholder: string;
  type: "text" | "datetime-local" | "textarea" | "file" | "select";
  value: string;
  onChange: (e: string) => void;
  height?: string;
  bg?: string;
  color?: string;
  sx?: CSSProperties;
  icon?: string;
};

function InputField({
  width,
  placeholder,
  height = "50px",
  bg = "white",
  color = "black",
  sx,
  icon,
  type,
  value,
  onChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (e.target && (typeof e.target.result as string)) {
          const dataURI = e.target.result;
          onChange(dataURI as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledInputField width={width} height={height} bg={bg} icon={icon}>
      {icon && (
        <LogoContainer height={height}>
          <img src={icon} alt="input" width={16} height={16} />
        </LogoContainer>
      )}
      {type === "textarea" ? (
        <StyledTextArea
          value={value}
          onChange={(e) => onChange!(e.target.value)}
          rows={10}
        />
      ) : type === "file" ? (
        <Button
          onClick={handleClick}
          sx={{
            height: "40%",
            width: "205px",
            backgroundColor: "#F4F4F4",
            boxShadow: "none",
            border: "1px solid #D9D9D9",
          }}
        >
          <Label weight={500} size="18px" color="#666666">
            Upload
          </Label>
          <img src={upload} alt="upload" width={22} height={22} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImage}
            accept=".jpg, .png, .jpeg"
            style={{ display: "none" }}
          />
        </Button>
      ) : type === "select" ? (
        <StyledSelect
          value={value}
          onChange={(e) => onChange!(e.target.value)}
          name="level"
          id="level"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </StyledSelect>
      ) : (
        <StyledInput
          value={value}
          onChange={(e) => onChange!(e.target.value)}
          type={type}
          icon={icon}
          style={sx}
          width={width}
          height={height}
          color={color}
          placeholder={placeholder}
        />
      )}
    </StyledInputField>
  );
}

const StyledInputField = styled.div<{
  width: string;
  height: string;
  bg: string;
  icon?: string;
}>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  background-color: ${(p) => p.bg};
  border-radius: ${(p) => (p.icon ? "20px" : "0px")};
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div<{ height: string }>`
  width: ${(p) => p.height};
  height: ${(p) => p.height};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input<{
  width: string;
  height: string;
  color: string;
  icon?: string;
}>`
  width: ${(p) => (p.icon ? `calc(${p.width} - ${p.height})` : "100%")};
  height: 90%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.2rem;
`;

const StyledTextArea = styled.textarea`
  outline: none;
  border: 1px solid #b7b7b7;
  width: 100%;
  height: 90%;
  resize: none;
`;

const StyledSelect = styled.select`
  width: 236px;
  height: 39px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #B7B7B7;
  outline: none
  font-weight: 500;
  font-size: 14px;
  color: #333333;
`;

export default InputField;
