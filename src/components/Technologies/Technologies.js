import React from "react";
import { DiHtml5, DiReact, DiGithubBadge } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      I've worked with a range a technologies in the web development world.
    </SectionText>
    <List>
      <ListItem>
        <DiHtml5 size="8rem" />
        <ListContainer>
          <ListTitle>HTML / CSS</ListTitle>
          <ListParagraph>
            Experience with <br />
            BOOTSTRAP / Materializecss / Tailwind / Responsive Design
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiReact size="8rem" />
        <ListContainer>
          <ListTitle>JavaScript</ListTitle>
          <ListParagraph>
            Experience with <br />
            React / Redux / React Storybook / Material UI / Ant Design / Axios
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiGithubBadge size="8rem" />
        <ListContainer>
          <ListTitle>GIT / GITHUB</ListTitle>
          <ListParagraph>
            Experience with <br />
            tools like Git / Github / Comment Line / Google Apps Script
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
