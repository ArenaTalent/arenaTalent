import React, {useState} from 'react';
import styled from 'styled-components';
import { Inbox, Search, Building, FileCheck, FileText, MessageSquare, Settings, LogOut, ChevronDown } from 'lucide-react';
import JobSeekerNav from './JobSeekerNav';
import JobSeekerBarGraph from './JobSeekerBarGraph';
import InterviewCard from './InterviewCard';

// Styled components

const softColors = {
  background: '#f0f4f8',
  card: '#ffffff',
  primary: '#4a90e2',
  secondary: '#f6e05e',
  text: '#2d3748',
  textLight: '#718096',
  border: '#e2e8f0',
  success: '#68d391',
  warning: '#f6ad55',
  danger: '#fc8181',
  info: '#63b3ed',
  icons: '#12C2E8',
icontext: '#C859FF',
yellow: '#f6e05e',};

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
`;


const Link = styled.a`
  color: white;
   background-color: ${softColors.icontext};
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  border: 1px solid ${softColors.icontext};

  width: auto;
  padding: 10px;

  border-radius: 5px;



  &:hover {
    background-color: white;
    color: ${softColors.icontext};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  }
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${softColors.border};
  border-radius: 9999px;
  height: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  border-radius: 9999px;
  width: ${props => props.width};
  background-color: ${props => props.color || softColors.primary};
`;


const NavButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    margin-right: 0.75rem;
  }
`;

const LogoutButton = styled(NavButton)`
  color: #dc2626;

  &:hover {
    background-color: #fee2e2;
    color: #b91c1c;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
`;

const WelcomeHeader = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: ${props => `repeat(${props.columns}, minmax(0, 1fr))`};
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1rem 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: #f9fafb;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
`;

const StatusBadge = styled.span`
  background-color: #ffedd5;
  color: #9a3412;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

// Placeholder components
const PieChart = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
`;

const Calendar = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
`;

const PostJobButton = styled(Link)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

const ReviewButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  margin-left: -10px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;
`;




const SectionIcon = styled.span`
  margin-right: 0.5rem;
`;

const SectionProgressBar = styled(ProgressBarContainer)`
  margin: 0.5rem 0;
  position: relative;
`;

const SectionProgress = styled(ProgressBar)`
  background-color: ${props => props.started ? softColors.success : softColors.danger};
`;

const SectionContent = styled.div`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: ${props => props.isOpen ? 'show' : 'hidden'};
  transition: max-height 0.1s ease-in-out;

`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: ${softColors.textLight};
  // margin-bottom: 1rem;
  line-height: 1.5;
`;

const OnboardingSection = styled(Card)`
  margin-bottom: 1.5rem;
  height: auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: -0.5rem;
  color: ${softColors.text};
`;

export default function JobSeekerDash() {

  const [openSections, setOpenSections] = useState({
    profile: false,
    postJob: false,
    survey: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  return (
    <Container>
      {/* <Sidebar>
        <Logo src="images/black-logo.png" style={{height:'100px'}}alt="Arena Logo" />
        <Nav>
          <NavButton>
            <Inbox size={20} />
            Dashboard
          </NavButton>
          <NavButton>
            <Search size={20} />
            Search Jobs
          </NavButton>
          <NavButton>
            <Building size={20} />
            Search Companies
          </NavButton>
          <NavButton>
            <FileCheck size={20} />
            Application Tracking
          </NavButton>
          <NavButton>
            <FileText size={20} />
            Templates
          </NavButton>
          <NavButton>
            <MessageSquare size={20} />
            Messaging
          </NavButton>
        </Nav>
        <Nav style={{ position: 'absolute', bottom: 0, width: '16rem' }}>
          <NavButton>
            <Settings size={20} />
            Account
          </NavButton>
          <LogoutButton>
            <LogOut size={20} />
            Logout
          </LogoutButton>
        </Nav>
      </Sidebar> */}
     <JobSeekerNav/>

      <MainContent>
        <WelcomeHeader>🏟 Welcome to Arena for MSBC, Olivia!</WelcomeHeader>
        <OnboardingSection onClick={() => toggleSection('profile')}>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>🔥</SectionIcon>
              Complete your profile to get matched to relevant jobs and opportunities for you.
              </SectionTitle>
            <ChevronDown size={20} style={{ transform: openSections.profile ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', cursor: 'pointer' }} />
          </SectionHeader>
          <SectionProgressBar>
            <SectionProgress width="30%" started={true} />
          </SectionProgressBar>
          <SectionContent isOpen={openSections.profile}>
            <SectionDescription>
              This information helps our AI personalize its talent matches to meet your top hiring goals.
              Note: You will not see your talent matches until you complete your profile.
            </SectionDescription>
            <Link href="/edit-profile">Edit Profile</Link>
          </SectionContent>
        </OnboardingSection>



        <OnboardingSection onClick={() => toggleSection('survey')}>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>🔑</SectionIcon>
              Get noticed by more employers.
            </SectionTitle>
            <ChevronDown size={20} style={{ transform: openSections.survey ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', cursor: 'pointer' }} />
          </SectionHeader>
          <SectionProgressBar>
            <SectionProgress width="20%" started={false} />
          </SectionProgressBar>
          <SectionContent isOpen={openSections.survey}>
            <SectionDescription>
              Complete this quick survey to increase your standing in our algorithm and get access to even more talent.
              These responses are anonymous and are used to help us gather industry data on hiring trends and best practices.
              It will be shared in reports, in responses to questions asked in our AI chatbot, and to benchmark your hiring goals and success metrics.
              Your personal information will NEVER be shared publicly and will only be shared anonymously and in aggregate form.
            </SectionDescription>
            <Link href="/complete-survey">Complete Survey</Link>
          </SectionContent>
        </OnboardingSection>
        <Grid columns={3}>
          <Card>
            <CardHeader>
              <CardTitle>Jobs Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>10</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <JobSeekerBarGraph />
            </CardContent>
          </Card>
          <Card>

            <CardContent>
              <InterviewCard />
            </CardContent>
          </Card>
        </Grid>

        <Grid columns={2}>
          <Card>
            <CardHeader>
              <CardTitle>News from Arena</CardTitle>
            </CardHeader>
            <CardContent>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem' }}>
                <li><a href="#" style={{ color: 'grey', textDecoration: 'none' }}>New feature: AI-powered resume builder</a></li>
                <li><a href="#" style={{ color: 'grey', textDecoration: 'none' }}>Arena partners with top tech companies</a></li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/search-companies" style={{ color: 'grey', textDecoration: 'none' }}>MSBC Career Fair - View Companies</a>
            </CardContent>
          </Card>
        </Grid>

        <Card>
          <CardHeader>
            <CardTitle>Recent Application History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Company</TableHeader>
                  <TableHeader>Job Details</TableHeader>
                  <TableHeader>Date Applied</TableHeader>
                  <TableHeader>Match Rating</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>
                    <img src="images/black-logo.png" alt="Arena Logo" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }} />
                  </TableCell>
                  <TableCell>
                    <div style={{ fontWeight: '500' }}>CTO</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Arena • Remote • Full-time</div>
                  </TableCell>
                  <TableCell>Sept 1st</TableCell>
                  <TableCell>96%</TableCell>
                  <TableCell>
                    <StatusBadge>In-Review</StatusBadge>
                  </TableCell>
                </tr>
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </MainContent>
    </Container>
  );
}
