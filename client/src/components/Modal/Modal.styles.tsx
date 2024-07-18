import styled from "styled-components";

export const CloseButton = styled.span`
  top: 5px;
  right: 5px;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
`;

export const Screen = styled.div`
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

export const ModalBox = styled.div`
  width: 800px;
  max-width: 80vw;
  min-width: 40vw;
  min-height: 50px;
  padding: 3em;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  border: 3px solid grey;
  box-shadow: 2px 2px 8px grey;
  position: fixed;
  background: white;
  overflow-y: auto;
  max-height: 100vh;
`;
