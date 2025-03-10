import React from "react";

import { StyledButton, LoadingSpinner } from "./Button.styles";

const Button = ({ children, onClick, disabled, loading, customcss }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled || loading} customcss={customcss}>
      {loading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
};

export default Button;