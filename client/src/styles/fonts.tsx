import styled from "styled-components";

export const Title = styled.h1<{ $noMargin?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: var(--title-size);
  padding: 0;
  margin: ${(p) => (p.$noMargin ? "0.1em" : "2em")};
`;

export const FormTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
`;

export const LabelledTitle = styled.div`
  width: auto;
  display: inline-block;
  margin-bottom: 1em;
  margin-top: 2em;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--rp-blue);
`;

export const Subtitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  padding: 0;
  margin: 0;
  font-style: italic;
`;

export const SectionHeading = styled.h2`
  margin-top: 2em;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input,
  input {
    padding: 0.25em;
  }
  .short {
    max-width: 25%;
  }
  .hue-horizontal div {
    min-width: 25px;
    min-height: 25px;
  }
`;
