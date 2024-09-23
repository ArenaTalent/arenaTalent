import React from 'react';
import styled from 'styled-components';
import { Inbox, Search, Building, FileCheck, FileText, MessageSquare, Settings, LogOut, User } from 'lucide-react';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 16rem;
  background-color: #f3f4f6;
  border-right: 1px solid #e5e7eb;
`;

const LogoContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 100px;
  object-fit: contain;
`;

const Nav = styled.nav`
  flex: 1;
  // overflow-y: auto;
`;

const NavButton = styled.a`
  display: flex;
  width: 80%;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 1rem;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.75rem;
`;

const ButtonText = styled.span``;

const BottomSection = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LogoutButton = styled(NavButton)`
  color: #dc2626;

  &:hover {
    color: #b91c1c;
    background-color: #fee2e2;
  }
`;

const EmployerNav = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <Logo src="/images/black-logo.png" alt="Company Logo" />
      </LogoContainer>
      <Nav>
        <NavButton href="/employer-dashboard">
          <IconWrapper><Inbox size={20} /></IconWrapper>
          <ButtonText>Dashboard</ButtonText>
        </NavButton>
        <NavButton href="/employer-profile">
          <IconWrapper><User size={20} /></IconWrapper>
          <ButtonText>Profile</ButtonText>
        </NavButton>
        <NavButton href="/sourcing">
          <IconWrapper><Search size={20} /></IconWrapper>
          <ButtonText>Search Candidates</ButtonText>
        </NavButton>
        <NavButton href="/ats">
          <IconWrapper><Building size={20} /></IconWrapper>
          <ButtonText>ATS</ButtonText>
        </NavButton>
        <NavButton href="/pipelines">
          <IconWrapper><FileCheck size={20} /></IconWrapper>
          <ButtonText>Pipelines</ButtonText>
        </NavButton>
        <NavButton href="/messaging">
          <IconWrapper><MessageSquare size={20} /></IconWrapper>
          <ButtonText>Messaging</ButtonText>
        </NavButton>

      </Nav>
      <BottomSection>
        <NavButton href="/employer-account">
          <IconWrapper><Settings size={20} /></IconWrapper>
          <ButtonText>Account</ButtonText>
        </NavButton>
        <LogoutButton href="/logout">
          <IconWrapper><LogOut size={20} /></IconWrapper>
          <ButtonText>Logout</ButtonText>
        </LogoutButton>
      </BottomSection>
    </NavContainer>
  );
};

export default EmployerNav;
