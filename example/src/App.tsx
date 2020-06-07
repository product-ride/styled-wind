import React from 'react';
import styled from 'styled-tw';

const Container = styled.div`
                  .bg-red;
                  .p-50;
                  .anamalada;
                  border-radius: 20px;
                  `;
const Banner = styled(Container)`
                       .text-color-green;
                      `;

const App = () => {
  return <Banner>hello</Banner>;
};

export default App;
