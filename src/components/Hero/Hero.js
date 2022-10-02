import React from "react";
import Tippy from "@tippy.js/react";
import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection, Tooltip } from "./HeroStyles";
import "tippy.js/dist/tippy.css";

const Hero = () => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle>
        Welcome to <br />
        Aziz's Portfolio
      </SectionTitle>
      <SectionText>
        I am an experienced software(front-end) engineer and able to work in a
        team with problem solving skills in creating and designing a software
        and based in Krakow. Currently working at Bidroom
      </SectionText>
      <Button
        onClick={() =>
          window.open("https://www.linkedin.com/in/azizkhujakhujaev/", "_blank")
        }
      >
        Contact me
      </Button>
    </LeftSection>
  </Section>
);

export default Hero;
