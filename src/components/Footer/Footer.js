import React from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";

import { SocialIcons } from "../Header/HeaderStyles";
import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer } from "./FooterStyles";

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Call</LinkTitle>
          <LinkItem href="tel:+48733704967">+48733704967</LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href="mailto:aziz.khadjayev070@gmail.com">aziz.khadjayev070@gmail.com</LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>Innovating one project at a time</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons target="_blank" href="https://github.com/Azizkhuja">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons target="_blank" href="https://bit.ly/3Bx0mo3">
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
          <SocialIcons target="_blank" href="https://twitter.com/aziz_ipro">
            <AiOutlineTwitter size="3rem" />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
