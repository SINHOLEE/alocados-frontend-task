import React from 'react';
import styled from 'styled-components';

const DivWrapper = styled.div`
  background-color: red;
`;

const Acomp = ({ a }: { a: number }) => {
  return <DivWrapper>{a}</DivWrapper>;
};

function App() {
  return <Acomp a={123} />;
}

export default App;
