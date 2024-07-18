import styled from "styled-components";
export { Title, Subtitle, Label } from "../../styles/fonts";

export const Container = styled.div`
  background: var(--white);
  padding: 3em;
`;

export const Description = styled.p`
  max-width: 1000px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
  gap: 5em;
  width: 100%;
`;

export const ChartContainer = styled.div`
  border: 2px solid var(--grey);
  background: var(--lightgrey);
  box-shadow: 2px 2px var(--grey);
  width: 1000px;
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

export const AllocationStrategy = styled.div`
  width: auto;
  display: inline-block;
  padding: 1em 3em;
  font-size: 1.5em;
  font-weight: bold;
  color: var(--white);
  background: var(--rp-blue);
`;
