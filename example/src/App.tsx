import React from 'react';
import styled from 'styled-wind';

interface ContainerProps {
  margin: string;
}

const Container = styled.div<ContainerProps>`
                  .bg-red-600;
                  .p-10;
                  swind-hover: bg-green-900;
                  swind: rounded-lg;
                  .md:bg-purple-900;
                  .bg-cyan;
                  .mt-96;
                  `;

const Banner = styled(Container)`
  .text-red-600;
  margin-top: ${(props: any) => props.margin};
`;
const Input = styled.input.attrs(() => ({
  type: 'email',
  placeholder: 'hey man!'
}))`.placeholder-red-900;`;

const App = () => {
  return (
    <>
      <Banner margin='400px'>hello</Banner>
      <Input />
    </>
  );
};

export default App;
