import React from 'react';
import styled from 'styled-tw';

interface ContainerProps {
  margin: string;
}

const Container = styled.div<ContainerProps>`
                  .bg-red-600;
                  .p-10;
                  .hover:bg-green-900;
                  .rounded-lg;
                  .md:bg-purple-900;
                  .bg-cyan;
                  .mt-96;
                  `;

const Banner = styled(Container)`
  margin-top: ${(props: any) => props.margin};
  //  .text-yellow-900;
`;
const Input = styled.input.attrs(() => ({
  type: 'email',
  placeholder: 'hey man!'
}))`.placeholder-red-900;`;

const App = () => {
  return (
    <>
      <Banner margin='200px'>hello</Banner>
      <Input />
    </>
  );
};

export default App;
