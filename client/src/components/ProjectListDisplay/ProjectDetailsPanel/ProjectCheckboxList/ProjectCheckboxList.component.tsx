import {
  ProjectItem,
  ProjectList,
  Name,
  Description,
  CheckboxContainer,
  GroupTitle,
} from "./ProjectCheckboxList.styles";
import { Checkbox } from "../../../../styles/inputs";

export const ProjectCheckboxList = ({
  projects,
  includedProjectIds,
  toggleIncludedProjectId,
}: {
  projects: Project[];
  includedProjectIds: number[];
  toggleIncludedProjectId: (arg0: number) => void;
}) => {
  const groups = [...new Set(projects.map((p) => p.group))];
  return (
    <ProjectList>
      {groups.map((group: string) => (
        <div key={group}>
          <GroupTitle key={group}>{group}</GroupTitle>
          {projects
            .filter((p) => p.group === group)
            .map((project) => (
              <ProjectItem key={project.name}>
                <Name>{project.name}</Name>
                <Description>{project.description}</Description>
                <CheckboxContainer>
                  <Checkbox
                    checked={includedProjectIds.includes(project.id)}
                    onClick={() => toggleIncludedProjectId(project.id)}
                  />
                </CheckboxContainer>
              </ProjectItem>
            ))}
        </div>
      ))}
    </ProjectList>
  );
};
