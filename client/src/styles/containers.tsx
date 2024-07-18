import styled from "styled-components";

interface RowProps {
  $center?: boolean;
  $wrap?: boolean;
  $middle?: boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => props.$wrap && "wrap"};
  justify-content: ${(props) => (props.$center ? "center" : "space-between")};
  align-items: ${(props) => (props.$middle ? "center" : "")};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
