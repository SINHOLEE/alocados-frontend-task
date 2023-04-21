import styled, { CSSProperties } from 'styled-components';
import React from 'react';

type ButtonProps = {
  disabled?: boolean;
  text: string;
  style?: CSSProperties;
};

const ButtonStyled = styled.button`
  width: 100%;

  background: #5d28f2;
  border-radius: 12px;

  font-size: 15px;
  line-height: 36px;
  /* identical to box height, or 240% */

  letter-spacing: 0.05em;

  /* White */

  color: #ffffff;

  :hover {
    background: #8257e5;
  }
  :disabled {
    background: #e0e2e8;
    cursor: not-allowed;
  }
`;

const Button = (props: ButtonProps) => {
  return (
    <ButtonStyled style={props.style} disabled={props.disabled}>
      {props.text}
    </ButtonStyled>
  );
};

export default Button;
