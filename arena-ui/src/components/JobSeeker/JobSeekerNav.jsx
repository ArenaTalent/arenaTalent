import React, { useState, useEffect } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import styled from 'styled-components';
import { Inbox, Search, Building, FileCheck, FileText, MessageSquare, Settings, LogOut, User, QrCodeIcon } from 'lucide-react';

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
    cursor: pointer;
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

`
const HelpDropDown = styled.div`
  position: relative;
`
const HelpDropDownContent = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  width: 80%;
  padding: 0.5rem 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
  z-index: 1;
`
const DropDownLink = styled.a`
  padding: 10px 0px;
  display: block;

  color: #4a90e2;
  font-weight: 600;
  font-size: 0.870em;
  text-decoration: none;
  transition: color 0.2s;
`
const LinkText = styled.span`
  &:hover {
    color: #63b3ed;
    text-decoration: underline; /* Underline only applies to the text */
  }
`;

function JobSeekerNav(){
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);
  const [isHelpDropDownOpen, setIsHelpDropDownOpen] = useState(false);
  const [isTrialComplete, setIsTrialComplete] = useState(true);

  const handleQR = () => {
    setIsQRPopupOpen(prev => !prev);
  };

  const handleHelpDropDown = () => {
    setIsHelpDropDownOpen(prev => !prev);
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
        {isTrialComplete && (
          <NavButton href="/jobseeker-account?tab=billing">
            <ButtonText>Upgrade to Pro</ButtonText>
          </NavButton>
        )}
        
      <HelpDropDown>
          <NavButton onClick={handleHelpDropDown}>
            <ButtonText>Need Help?</ButtonText>
          </NavButton>
          {isHelpDropDownOpen && (
            <HelpDropDownContent>
              <DropDownLink href="">📘 <LinkText>Help & quick start guide</LinkText></DropDownLink>
              <DropDownLink href="mailto:support@arenatalent.com"><LinkText>Email us</LinkText></DropDownLink>
            </HelpDropDownContent>
          )}
        </HelpDropDown>
      <NavButton onClick={handleQR}>
      <IconWrapper><QrCodeIcon  size={20} /></IconWrapper>
        <ButtonText> QR Code</ButtonText>
        </NavButton>
        <NavButton href="/jobseeker-account">
          <IconWrapper><Settings size={20} /></IconWrapper>
          <ButtonText>Account</ButtonText>
        </NavButton>
        <LogoutButton href="/logout">
          <IconWrapper><LogOut size={20} /></IconWrapper>
          <ButtonText>Logout</ButtonText>
        </LogoutButton>

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
