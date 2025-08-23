import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { NavLink } from "react-router";

export function AppFooter() {
  return (
    <Footer container >
      <FooterCopyright
        href="https://github.com/Gehad799"
        by="Gehad Alaa"
        year={2025}
      />
      <FooterLinkGroup>
        <FooterLink as={NavLink} to="/">
          Home
        </FooterLink>
        <FooterLink as={NavLink} to="/">
          Posts
        </FooterLink>
        <FooterLink as={NavLink} to="/profile">
          Profile
        </FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
