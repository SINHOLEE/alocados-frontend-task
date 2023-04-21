import styled from 'styled-components';
import React, { useId } from 'react';

const TextFieldWrapper = styled.div`
  border-radius: 12px;
  background: #fafbfc;

  padding: 10px 14px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  &:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }
  &.error {
    border: 1.2px solid #f7254b;
  }
  &.view {
    caret-color: transparent;
  }

  input {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 178%;
    /* or 32px */

    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on, 'cv03' on, 'cv04' on, 'cv09' on;

    /* Light/Shade/800 */

    color: #313c57;
  }
  input: focus-visible {
    outline: unset;
  }
`;

type CustomInputPropsForView = {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isForView?: false;
};
type CustomInputPropsForChange = {
  value: string;
  label: string;
  isForView?: true;
};

type TextFieldProps = (CustomInputPropsForView | CustomInputPropsForChange) & {
  isError?: boolean;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
const TextField = ({
  isError,
  label,
  value,
  onChange,
  isForView,
  ...restInputProps
}: TextFieldProps) => {
  const id = useId();

  const inputProps = () => {
    if (onChange) {
      return { value, onChange };
    }
    return { defaultValue: value };
  };

  const className = () =>
    (isError ? 'error' : '') + ' ' + (isForView ? 'view' : '');

  return (
    <TextFieldWrapper className={className()}>
      <label htmlFor={id}>{label}</label>

      <input {...restInputProps} id={id} {...inputProps()} />
    </TextFieldWrapper>
  );
};

export default TextField;
