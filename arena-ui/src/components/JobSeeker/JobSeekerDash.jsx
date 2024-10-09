import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import JobSeekerNav from './JobSeekerNav';
import JobSeekerBarGraph from './JobSeekerBarGraph';
import InterviewCard from './InterviewCard';
import axios from 'axios';

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
  yellow: '#f6e05e',
};

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

const OnboardingSection = styled(Card)`
  margin-bottom: 1.5rem;
  height: auto;
`;

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
  overflow: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: max-height 0.3s ease-in-out;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: ${softColors.textLight};
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: -0.5rem;
  color: ${softColors.text};
`;

export default function JobSeekerDash() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openSections, setOpenSections] = useState({
    profile: false,
    postJob: false,
    survey: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://arena-talent-809eb598a3c0.herokuapp.com/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        console.log('Full API response:', response);
        if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
          throw new Error('Received HTML instead of JSON. API endpoint might be incorrect.');
        }
        console.log('User data received:', response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data available</div>;

  console.log('Current userData state:', userData);

  // Attempt to safely extract user information
  const first_name = userData?.first_name || userData?.firstName || userData?.User?.first_name || 'User';
  const JobseekerProfile = userData?.JobseekerProfile || userData;

  console.log('Extracted first_name:', first_name);
  console.log('Extracted JobseekerProfile:', JobseekerProfile);

  // Safely access JobseekerProfile properties
  const intake_completed = JobseekerProfile?.intake_completed || false;
  const jobs_applied = JobseekerProfile?.jobs_applied || [];
  const current_employer = JobseekerProfile?.current_employer || 'Not specified';
  const current_title = JobseekerProfile?.current_title || 'Not specified';
  const job_search_motivation = JobseekerProfile?.job_search_motivation || 'Not specified';
  const top_strengths = JobseekerProfile?.top_strengths || [];
  const company_culture_preferences = JobseekerProfile?.company_culture_preferences || [];

  return (
    <Container>
      <JobSeekerNav />

      <MainContent>
        <WelcomeHeader>🏟 Welcome to Arena, {first_name}!</WelcomeHeader>

        {!intake_completed && (
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
        )}

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
              <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>{jobs_applied.length}</p>
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
              <CardTitle>Your Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Current Employer:</strong> {current_employer}</p>
              <p><strong>Current Title:</strong> {current_title}</p>
              <p><strong>Job Search Motivation:</strong> {job_search_motivation}</p>
              <p><strong>Top Strengths:</strong> {top_strengths.join(', ') || 'Not specified'}</p>
              <p><strong>Preferred Company Culture:</strong> {company_culture_preferences.join(', ') || 'Not specified'}</p>
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
                {/* This is a placeholder. You should map over actual job application data here */}
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
