import React from 'react';
import styled from 'styled-components';
import { Inbox, Search, Building, FileCheck, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import JobSeekerNav from './JobSeekerNav';
import JobSeekerBarGraph from './JobSeekerBarGraph';
import InterviewCard from './InterviewCard';

// Styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
`;

const Sidebar = styled.div`
  width: 16rem;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
`;

const Logo = styled.img`
  height: 2.5rem;
  margin: 1rem auto;
  display: block;
`;

const Nav = styled.nav`
  margin-top: 2rem;
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

export default function JobSeekerDash() {
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
        <WelcomeHeader>Welcome, Olivia!</WelcomeHeader>

        <Grid columns={3}>
          <Card>
            <CardHeader>
              <CardTitle>Jobs Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>42</p>
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
              <a href="#" style={{ color: 'grey', textDecoration: 'none' }}>MSBC Career Fair - Register Now</a>
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
