import styled from 'styled-components';

export const Circle = styled.div`
  overflow: hidden;
  position: relative;
  background-color: #e3e3e3;
`;

export const LeftWrap = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
`;

export const Loader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1000;
  transform-origin: 0 50%;
`;

export const SecondLoader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1000;
  transform-origin: 100% 50%;
`;

export const InnerCirle = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.h3`
  font-size: 11;
  color: #888;
`;