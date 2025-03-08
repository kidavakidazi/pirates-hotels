import React from "react";

import { StyledButton, LoadingSpinner } from "./Button.styles";

const Button = ({ children, onClick, disabled, loading, customCss }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled || loading} customCss={customCss}>
      {loading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
};

export default Button;