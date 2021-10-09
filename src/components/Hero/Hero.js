import React from "react";
import Tippy from "@tippy.js/react";
import { Section, SectionText, SectionTitle } from "../../styles/GlobalComponents";
// import Button from "../../styles/GlobalComponents/Button";
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
        Hello, I’m Aziz, a self-taught frontend developer based in Krakow, Poland. I am passionate about web development and well-organised person,
        <Tippy content={<span style={{ fontFamily: "Space Grotesk", fontSize: "20px" }}>and I like challenges</span>}>
          <Tooltip> problem solver, </Tooltip>
        </Tippy>
        independent employee with high attention to details.
      </SectionText>
      {/* <Button onClick={() => (window.location = "https://google.com")}>Learn More</Button> */}
    </LeftSection>
  </Section>
);

export default Hero;
