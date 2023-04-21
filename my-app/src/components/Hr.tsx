import styled from 'styled-components';
import React from 'react';

const HrStyled = styled.div`
  border: 1px solid #c8ccd7;
`;

const Hr = () => {
  return (
    <div style={{ paddingTop: 10, paddingBottom: 10 }}>
      <HrStyled />
    </div>
  );
};

export default Hr;
