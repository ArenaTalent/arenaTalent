import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronLeft, MoreVertical, MessageSquare } from 'lucide-react'

// Basic Button component
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;

  ${props => props.variant === 'outline'
    ? `
      background-color: transparent;
      border: 1px solid #d1d5db;
      color: #374151;
      &:hover {
        background-color: #f3f4f6;
      }
    `
    : `
      background-color: #9333ea;
      border: none;
      color: white;
      &:hover {
        background-color: #7e22ce;
      }
    `
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background-color: white;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
`

const ActionButton = styled(Button)`
  background-color: #f3e8ff;
  color: #9333ea;
`

const Layout = styled.div`
  display: flex;
`

const Sidebar = styled.div`
  width: 33.333%;
  padding-right: 24px;
`

const SidebarContent = styled.div`
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 8px;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
`

const ProfileInfo = styled.div``

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 600;
`

const ProfileTitle = styled.p`
  color: #6b7280;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

const InfoSection = styled.div`
  margin-bottom: 16px;
`

const InfoLabel = styled.p`
  font-size: 14px;
  color: #6b7280;
`

const InfoValue = styled.p`
  font-weight: 500;
`

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 10px;
  margin-top: 8px;
`

const Progress = styled.div`
  background-color: #2563eb;
  height: 10px;
  border-radius: 9999px;
  width: 75%;
`

const ContactInfo = styled.div`
  margin-top: 24px;
`

const ContactItem = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`

const ContactLink = styled.a`
  color: #9333ea;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const MainContent = styled.div`
  width: 66.666%;
`

const TabNav = styled.nav`
  border-bottom: 1px solid #e5e7eb;
`

const TabButton = styled.button`
  margin-right: 32px;
  padding: 16px 4px;
  border-bottom: 2px solid ${props => props.active ? '#9333ea' : 'transparent'};
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.active ? '#9333ea' : '#6b7280'};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.active ? '#9333ea' : '#374151'};
    border-color: ${props => props.active ? '#9333ea' : '#d1d5db'};
  }
`

const TabContent = styled.div`
  margin-top: 24px;
`

const PersonalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`

const InfoItem = styled.div``

export default function ATSCandidate() {
  const [activeTab, setActiveTab] = useState('applicant-profile')

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={24} style={{ marginRight: '16px', color: '#6b7280' }} />
          <Title>Applicant Details</Title>
        </div>
        <ActionButton>
          More Action
          <ChevronLeft size={16} style={{ marginLeft: '8px', transform: 'rotate(-90deg)' }} />
        </ActionButton>
      </Header>

      <Layout>
        <Sidebar>
          <SidebarContent>
            <ProfileHeader>
              <ProfileImage src="/placeholder.svg?height=80&width=80" alt="Jerome Bell" />
              <ProfileInfo>
                <ProfileName>Jerome Bell</ProfileName>
                <ProfileTitle>Product Designer</ProfileTitle>
                <Rating>
                  <span style={{ color: '#fbbf24' }}>★</span>
                  <span style={{ marginLeft: '4px' }}>4.0</span>
                </Rating>
              </ProfileInfo>
            </ProfileHeader>
            <InfoSection>
              <InfoLabel>Applied Jobs</InfoLabel>
              <InfoValue>2 days ago</InfoValue>
            </InfoSection>
            <InfoSection>
              <InfoValue>Product Development</InfoValue>
              <InfoLabel>Marketing • Full-Time</InfoLabel>
            </InfoSection>
            <InfoSection>
              <InfoLabel>Stage</InfoLabel>
              <ProgressBar>
                <Progress />
              </ProgressBar>
            </InfoSection>
            <Button style={{ width: '100%', marginBottom: '8px' }}>Schedule Interview</Button>
            <Button variant="outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={16} style={{ marginRight: '8px' }} />
              Message
            </Button>
            <ContactInfo>
              <h3 style={{ fontWeight: 500, marginBottom: '8px' }}>Contact</h3>
              <ContactItem>
                <span style={{ color: '#6b7280' }}>Email:</span> jeromeBell45@email.com
              </ContactItem>
              <ContactItem>
                <span style={{ color: '#6b7280' }}>Phone:</span> +44 1245 572 135
              </ContactItem>
              <ContactItem>
                <span style={{ color: '#6b7280' }}>Instagram:</span>{' '}
                <ContactLink href="#">instagram.com/jeromebell</ContactLink>
              </ContactItem>
              <ContactItem>
                <span style={{ color: '#6b7280' }}>Twitter:</span>{' '}
                <ContactLink href="#">twitter.com/jeromebell</ContactLink>
              </ContactItem>
              <ContactItem>
                <span style={{ color: '#6b7280' }}>Website:</span>{' '}
                <ContactLink href="#">www.jeromebell.com</ContactLink>
              </ContactItem>
            </ContactInfo>
          </SidebarContent>
        </Sidebar>

        <MainContent>
          <TabNav>
            {['Applicant Profile', 'Resume', 'Hiring Progress', 'Interview Schedule'].map((tab) => (
              <TabButton
                key={tab}
                active={activeTab === tab.toLowerCase().replace(' ', '-')}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              >
                {tab}
              </TabButton>
            ))}
          </TabNav>

          <TabContent>
            {activeTab === 'applicant-profile' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Personal Info</h2>
                <PersonalInfo>
                  <InfoItem>
                    <InfoLabel>Full Name</InfoLabel>
                    <InfoValue>Jerome Bell</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Gender</InfoLabel>
                    <InfoValue>Male</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Date of Birth</InfoLabel>
                    <InfoValue>March 23, 1995 (26 y.o.)</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Language</InfoLabel>
                    <InfoValue>English, French, Bahasa</InfoValue>
                  </InfoItem>
                  <InfoItem style={{ gridColumn: '1 / -1' }}>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>4517 Washington Ave. Manchester, Kentucky 39495</InfoValue>
                  </InfoItem>
                </PersonalInfo>
              </div>
            )}
            {activeTab === 'resume' && <div>Resume content goes here</div>}
            {activeTab === 'hiring-progress' && <div>Hiring progress content goes here</div>}
            {activeTab === 'interview-schedule' && <div>Interview schedule content goes here</div>}
          </TabContent>
        </MainContent>
      </Layout>
    </Container>
  )
}
