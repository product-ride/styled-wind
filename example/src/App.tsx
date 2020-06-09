import React from 'react';
import { styledWrapper } from 'styled-tw';

const Container = styledWrapper.div`
                  .bg-red-600;
                  .p-10;
                  border-radius: 10px;
                  `;
const Banner = styledWrapper(Container)`
                       .text-green-900;
                      `;

const App = () => {
  return <Banner>hello</Banner>;
};

export default App;
