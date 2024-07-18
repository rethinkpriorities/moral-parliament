import styled from "styled-components";

export const ChartContainer = styled.div`
  border: 2px solid var(--grey);
  background: var(--lightgrey);
  box-shadow: 2px 2px var(--grey);
  width: var(--content-width);
`;

export const Table = styled.table`
  width: 30em;
  border-spacing: 0 0.5em;
  border-collapse: separate;
  height: min-content;

  margin: 0;
  margin-bottom: 3em;
  th {
    text-align: left;
  }
`;

export const GridContainer = styled.div``;
export const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: var(--content-width);
  justify-content: start;
  gap: 10px;
  margin-top: 10px;
`;
