import React from 'react';
import { styledWrapper } from 'styled-tw';

const Container = styledWrapper.div`
                  .bg-red-600;
                  .p-50;
                  border: 20;
                  `;
const Banner = styledWrapper(Container)`
                       .text-yellow-200;
                      `;

const App = () => {
  return <Banner>hello</Banner>;
};

export default App;
