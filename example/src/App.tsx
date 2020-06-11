import React from 'react';
import { styledWrapper } from 'styled-tw';

const Container = styledWrapper.div`
                  .bg-red-600;
                  .p-10;
                  .hover:bg-green-900;
                  .rounded-lg;
                  .md:bg-purple-900;
                  `;
const Banner = styledWrapper(Container)`
                       margin-top: ${(props: any) => props.margin};
                       .text-yellow-900;
                      `;

const App = () => {
  return <Banner margin='200px'>hello</Banner>;
};

export default App;
