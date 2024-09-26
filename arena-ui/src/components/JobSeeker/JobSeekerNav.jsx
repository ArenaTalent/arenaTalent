import React, { useState, useEffect } from 'react'
import {QRCodeSVG} from 'qrcode.react';
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
`
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`
const PopupContent = styled.div`
  background-color: white;
  padding: 2rem 1rem;
  padding-top: 0rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

`

const QRCloseButton = styled.button`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 8px;
  border: none;
  color: #718096;

  &:hover {
    background-color: #f3f4f6;
  }
`
const CloseQRNavSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 0.5rem;

`;

function JobSeekerNav(){
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);

  const handleQR = () => {
    setIsQRPopupOpen(prev => !prev);
  };
  return (
    <NavContainer>
      <LogoContainer>
        <Logo src="/images/black-logo.png" alt="Company Logo" />
      </LogoContainer>
      <Nav>
        <NavButton href="/jobseeker-dashboard">
          <IconWrapper><Inbox size={20} /></IconWrapper>
          <ButtonText>Dashboard</ButtonText>
        </NavButton>
        <NavButton href="/jobseeker-profile">
          <IconWrapper><User size={20} /></IconWrapper>
          <ButtonText>Profile</ButtonText>
        </NavButton>
        <NavButton href="/search-jobs">
          <IconWrapper><Search size={20} /></IconWrapper>
          <ButtonText>Search Jobs</ButtonText>
        </NavButton>
        <NavButton href="/search-companies">
          <IconWrapper><Building size={20} /></IconWrapper>
          <ButtonText>Search Companies</ButtonText>
        </NavButton>
        <NavButton href="/application-tracking">
          <IconWrapper><FileCheck size={20} /></IconWrapper>
          <ButtonText>Application Tracking</ButtonText>
        </NavButton>
        <NavButton href="/messaging">
          <IconWrapper><MessageSquare size={20} /></IconWrapper>
          <ButtonText>Messaging</ButtonText>
        </NavButton>

      </Nav>
      <BottomSection>
        <NavButton href="/jobseeker-account">
          <IconWrapper><Settings size={20} /></IconWrapper>
          <ButtonText>Account</ButtonText>
        </NavButton>
        <LogoutButton href="/logout">
          <IconWrapper><LogOut size={20} /></IconWrapper>
          <ButtonText>Logout</ButtonText>
        </LogoutButton>
        <NavButton onClick={handleQR}>
        <ButtonText>Get QR Code</ButtonText>
        </NavButton>
          {isQRPopupOpen && ( 
            <PopupOverlay>
              <PopupContent>
                <CloseQRNavSection><QRCloseButton onClick={handleQR}>x</QRCloseButton></CloseQRNavSection>
                <QRCodeSVG value="https://reactjs.org/" size={254} />
              </PopupContent>
            </PopupOverlay>
          )}
      </BottomSection>
    </NavContainer>
  );
};

export default JobSeekerNav;
