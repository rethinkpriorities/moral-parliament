import styled from "styled-components";

export const SectionTitle = styled.h4``;
export const Container = styled.div`
  margin-bottom: 3em;
  padding-left: 1em;
`;

export const Label = styled.label`
  display: block;
  margin: 0.5em;
`;

export const SettingsButton = styled.button`
  font-size: 0.5rem;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: var(--rp-light-blue);
  color: var(--darker-grey);
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  vertical-align: middle;

  &:hover {
    background-color: var(--rp-blue);
    color: var(--white);
  }
`;
