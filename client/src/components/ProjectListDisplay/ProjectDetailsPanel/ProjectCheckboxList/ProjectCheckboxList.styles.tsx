import styled from "styled-components";

export const ProjectList = styled.ul`
  padding: 0;
`;

export const ProjectItem = styled.li`
  margin-top: 1em;
  list-style: none;
  font-size: 1.2rem;
  position: relative;
  padding-right: 3em;
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;

export const Description = styled.div``;

export const CheckboxContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  z-index: 5;
`;
export const GroupTitle = styled.div`
  font-size: 1.6rem;
  color: var(--rp-blue);
  font-weight: bold;
  margin-top: 3rem;
`;
