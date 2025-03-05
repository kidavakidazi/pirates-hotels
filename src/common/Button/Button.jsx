import React from "react";
import { StyledButton, LoadingSpinner } from "./Button.styles";

const Button = ({ children, onClick, disabled, loading }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled || loading}>
      {loading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
};

export default Button;