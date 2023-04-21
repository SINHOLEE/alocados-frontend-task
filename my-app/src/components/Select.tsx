import React from 'react';
import styled from 'styled-components';

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  isDisabled?: (option: string) => boolean;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const SelectWrapper = styled.div`
  position: relative;
  background: #fafbfc;

  border-radius: 12px;
  height: 100%;

  > select {
    height: 100%;
    border: none;
    background: #fafbfc;
    border-radius: 12px;
  }
`;

/**
 * ui 미비한 부분은 시간관계상 스킵
 * */
const Select = (props: SelectProps) => {
  return (
    <SelectWrapper style={props.style}>
      <select style={props.style} value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option
            key={option}
            value={option}
            disabled={props.isDisabled && props.isDisabled(option)}
          >
            {option}
          </option>
        ))}
      </select>
    </SelectWrapper>
  );
};

export default Select;
