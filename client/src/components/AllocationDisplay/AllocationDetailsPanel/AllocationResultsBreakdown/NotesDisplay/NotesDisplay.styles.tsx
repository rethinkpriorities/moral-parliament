import styled from "styled-components";

export const Table = styled.table`
  margin-bottom: 1em;
  border: none;
  border-collapse: collapse;
  min-width: 50%;
  width: 100%;
  max-width: 800px;
`;
export const TD = styled.td`
  &:nth-of-type(n + 2) {
    text-align: right;
  }
`;
export const TR = styled.tr``;
export const TH = styled.th`
  padding: 0 0.3em;
  text-align: left;
  &:nth-of-type(n + 2) {
    text-align: right;
  }
`;

export const DD = styled.dd``;
export const DL = styled.dl`
  display: flex;
`;
export const DT = styled.dt`
  font-weight: bold;
`;

export const THead = styled.thead`
  color: var(--white);
  tr {
    background: var(--dark-grey);
  }
`;
