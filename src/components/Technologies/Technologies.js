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
          <ListTitle>HTML / CSS / SCSS</ListTitle>
          <ListParagraph>
            Experience with <br />
            Material UI / Styled Components / Ant Design / Responsive Design
            etc.,
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiReact size="8rem" />
        <ListContainer>
          <ListTitle>JavaScript/TypeScript</ListTitle>
          <ListParagraph>
            Experience with <br />
            React / React Native / Redux / React Query / Familiar Vue and
            ecosystem
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiGithubBadge size="8rem" />
        <ListContainer>
          <ListTitle>GIT / GITHUB</ListTitle>
          <ListParagraph>
            Experience with <br />
            tools like Git / Github / Comment Line / Google Apps Script etc.,
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
