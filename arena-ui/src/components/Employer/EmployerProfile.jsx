import React, {useState} from 'react'
import styled from 'styled-components'
import { Mail, Linkedin, Twitter, Facebook, Instagram, Heart, Monitor, Coffee, Train, Users, Briefcase, ArrowLeft } from 'lucide-react'
import JobSeekerNav from '../JobSeeker/JobSeekerNav'
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`

const CompanyName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`

const CompanyWebsite = styled.p`
  color: #9333ea;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.primary ? `
    background-color: #9333ea;
    color: white;
    border: none;
  ` : `
    background-color: white;
    color: #9333ea;
    border: 1px solid #9333ea;
  `}
`

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Section = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const ContactList = styled.div`
  display: flex;
  gap: 1rem;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;

  &:hover {
    color: #9333ea;
  }
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const WorkImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`

const TeamMember = styled.div`
  text-align: center;
`

const TeamMemberImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`

const TeamMemberName = styled.h3`
  font-weight: 600;
  margin-top: 0.5rem;
`

const TeamMemberRole = styled.p`
  color: #6b7280;
`

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f3f4f6;
  font-weight: 600;
`

const TableCell = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
`

const CompanyLogoCell = styled(TableCell)`
  padding-right: 1.5rem;
`

const StatusBadge = styled.span`
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
`

const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`

const BenefitCard = styled.div`
  text-align: center;
`

const BenefitIcon = styled.div`
  background-color: #f3e8ff;
  color: #9333ea;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`

const BenefitTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const BenefitDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`
const MatchCell = styled(TableCell)`
  position: relative;

  &:hover::after {
    content: "96% Match: Strengths - History as a software engineer in the sports tech industry. Weaknesses - No experience in a CTO role. Try demonstrating leadership skills on your resume and add Quantifiable metrics.";
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    white-space: normal;
    text-align: center;
    z-index: 1;
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;

  &:hover {
    background-color: #e5e7eb;
  }`
  const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#9333ea' : '#f3f4f6'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`


export default function EmployerProfile() {
  const [showApplied, setShowApplied] = useState(false);
  const navigate = useNavigate();

  const allOpenPositions = [
    { company: 'Arena', logo: '/images/black-logo.png', title: 'CTO', details: 'Remote • Full-time', match: 96 },

  ];

  const appliedPositions = [
    { company: 'Arena', logo: '/images/black-logo.png', title: 'CTO', details: 'Remote • Full-time', match: 96, dateApplied: 'Sept 1st', status: 'In-Review' },
  ];
  return (
    <PageWrapper>
      <NavWrapper>
        <JobSeekerNav />
      </NavWrapper>
      <Container>
      <BackButton to="/search-companies">
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '0.5rem' }}>Back to Search</span>
        </BackButton>
        <Header>
          <CompanyInfo>
            <CompanyLogo src="/images/black-logo.png" alt="Arena Logo" />
            <div>
              <CompanyName>Arena</CompanyName>
              <CompanyWebsite>https://www.arenatalent.com</CompanyWebsite>
            </div>
          </CompanyInfo>
          <ButtonGroup>
            <Button primary>
              <Heart size={18} />
              Favorite
            </Button>
          </ButtonGroup>
        </Header>

        <InfoCards>
          <Card>
            <CardTitle>Founded</CardTitle>
            <p>October 31, 2023</p>
          </Card>
          <Card>
            <CardTitle>Employees</CardTitle>
            <p>0-10</p>
          </Card>
          <Card>
            <CardTitle>Industry</CardTitle>
            <p>Technology</p>
          </Card>
        </InfoCards>

        <Section>
          <SectionTitle>Company Profile</SectionTitle>
          <p>
            At Arena, you will only see career opportunities from companies that are committed to
            transparency, equity, and inclusion. Our mission is to create equitable career
            opportunities for professionals pursuing careers in sports, media, and entertainment.
          </p>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <ContactList>
            <ContactItem href="https://twitter.com/Arena">
              <Twitter size={20} />
              twitter.com/Arena
            </ContactItem>
            <ContactItem href="https://facebook.com/Arena">
              <Facebook size={20} />
              facebook.com/Arena
            </ContactItem>
            <ContactItem href="https://linkedin.com/company/arena">
              <Linkedin size={20} />
              linkedin.com/company/arena
            </ContactItem>
            <ContactItem href="mailto:hello@arenatalent.com">
              <Mail size={20} />
              hello@arenatalent.com
            </ContactItem>
          </ContactList>
        </Section>

        <Section>
          <SectionTitle>Team</SectionTitle>
          <TeamGrid>
            <TeamMember>
              <TeamMemberImage src="/images/parul.png" alt="Parul Khosla" />
              <TeamMemberName>Parul Khosla</TeamMemberName>
              <TeamMemberRole>CEO | Co-Founder</TeamMemberRole>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/images/adriene.jpg" alt="Adriene Bueno" />
              <TeamMemberName>Adriene Bueno</TeamMemberName>
              <TeamMemberRole>CMO | Co-Founder</TeamMemberRole>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/images/olivia.png" alt="Olivia Schwartz" />
              <TeamMemberName>Olivia Schwartz</TeamMemberName>
              <TeamMemberRole>CTO | Co-Founder</TeamMemberRole>
            </TeamMember>
          </TeamGrid>
        </Section>

        <Section>
          <SectionTitle>Benefits</SectionTitle>
          <BenefitsGrid>
            <BenefitCard>
              <BenefitIcon>
                <Briefcase size={24} />
              </BenefitIcon>
              <BenefitTitle>Full Healthcare</BenefitTitle>
              <BenefitDescription>
                We believe in thriving communities and that starts with our team being happy and healthy.
              </BenefitDescription>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>
                <Users size={24} />
              </BenefitIcon>
              <BenefitTitle>Unlimited Vacation</BenefitTitle>
              <BenefitDescription>
                We believe you should have a flexible schedule that makes space for family, wellness, and fun.
              </BenefitDescription>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>
                <Monitor size={24} />
              </BenefitIcon>
              <BenefitTitle>Skill Development</BenefitTitle>
              <BenefitDescription>
                We believe in always learning and leveling up our skills. Whether it's a conference or online course.
              </BenefitDescription>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>
                <Users size={24} />
              </BenefitIcon>
              <BenefitTitle>Team Summits</BenefitTitle>
              <BenefitDescription>
                Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.
              </BenefitDescription>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>
                <Coffee size={24} />
              </BenefitIcon>
              <BenefitTitle>Remote Working</BenefitTitle>
              <BenefitDescription>
                You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.
              </BenefitDescription>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>
                <Train size={24} />
              </BenefitIcon>
              <BenefitTitle>Commuter Benefits</BenefitTitle>
              <BenefitDescription>
                We're grateful for all the time and energy each team member puts into getting to work every day.
              </BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <Section>
          <SectionTitle>Open Positions</SectionTitle>
          <ToggleWrapper>
            <ToggleButton active={!showApplied} onClick={() => setShowApplied(false)}>All Open Positions</ToggleButton>
            <ToggleButton active={showApplied} onClick={() => setShowApplied(true)}>Applied Positions</ToggleButton>
          </ToggleWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Company</TableHeader>
                <TableHeader>Job Details</TableHeader>
                {showApplied && (
                  <>
                  <TableHeader>Match Rating</TableHeader>
                    <TableHeader>Date Applied</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {showApplied
                ? appliedPositions.map((position, index) => (


                    <tr key={index}  onClick={() => navigate('/job-posting1')}>
                      <CompanyLogoCell>
                        <img src={position.logo} alt={`${position.company} Logo`} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }} />
                      </CompanyLogoCell>
                      <TableCell>
                        <div style={{ fontWeight: '500' }}>{position.title}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{position.company} • {position.details}</div>
                      </TableCell>
                      <MatchCell>{position.match}%</MatchCell>
                      <TableCell>{position.dateApplied}</TableCell>
                      <TableCell>
                        <StatusBadge>{position.status}</StatusBadge>
                      </TableCell>
                    </tr>

                  ))
                : allOpenPositions.map((position, index) => (


                    <tr key={index}  onClick={() => navigate('/job-posting1')}>
                      <CompanyLogoCell>
                        <img src={position.logo} alt={`${position.company} Logo`} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }} />
                      </CompanyLogoCell>
                      <TableCell>
                        <div style={{ fontWeight: '500' }}>{position.title}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{position.company} • {position.details}</div>
                      </TableCell>
                    </tr>

                  ))
              }
            </tbody>
          </Table>
        </Section>
      </Container>
    </PageWrapper>
  )
}
