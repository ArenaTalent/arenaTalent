import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';
import EmployerNav from './EmployerNav';

// Styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
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

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StatNumber = styled.p`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${props => props.color || 'inherit'};
`;

const InterviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InterviewDate = styled.p`
  font-weight: 600;
`;

const InterviewStatus = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.625rem;
  margin-right: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 0.625rem;
  border-radius: 9999px;
  width: ${props => props.width};
`;

const StageLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  width: 6rem;
`;

const StageCount = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`;

const TotalCount = styled.p`
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const EventLink = styled.a`
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

const ApplicantName = styled.div`
  font-weight: 500;
  color: #111827;
`;

const JobRole = styled.div`
  font-size: 0.875rem;
  color: #111827;
`;

const JobDetails = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const MatchRating = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const StatusBadge = styled.span`
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

// New styled components for the onboarding sections
const OnboardingSection = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SectionProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
`;

const SectionProgress = styled.div`
  width: ${props => props.width};
  height: 100%;
  background-color: #10B981;
  border-radius: 9999px;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const EmployerDash = () => {
  const applicants = [
    { id: 19, name: 'Brady Hertl', role: 'Premium Experience Coordinator', applyDate: '2024-07-01', match: 95, status: 'In-Review' },
    { id: 18, name: 'Luciano Tommasini', role: 'Premium Experience Coordinator', applyDate: '2024-09-10', match: 91, status: 'In-Review' },
    { id: 8, name: 'Ed Urena', role: 'Premium Experience Coordinator', applyDate: '2024-09-10', match: 92, status: 'In-Review' },
    { id: 14, name: 'Jonathan Wittig', role: 'Premium Experience Coordinator', applyDate: '2024-09-10', match: 87, status: 'In-Review' },
    { id: 1, name: 'Atinuke Akindebe', role: 'Premium Experience Coordinator', applyDate: '2024-09-10', match: 83, status: 'In-Review' },
  ];

  const applicantStages = [
    { stage: 'Shortlisted', count: 15, color: '#10B981' },
    { stage: 'Interview', count: 10, color: '#3B82F6' },
    { stage: 'Rejected', count: 7, color: '#EF4444' },
    { stage: 'Unreviewed', count: 10, color: '#F59E0B' },
  ];

  return (
    <Container>
      <EmployerNav />

      <MainContent>
        <WelcomeHeader>Welcome, Minnesota Vikings!</WelcomeHeader>

        {/* New onboarding sections */}
        <OnboardingSection>
          <SectionTitle>🔥 Complete your profile to unlock access to your candidate matches</SectionTitle>
          <SectionProgressBar><SectionProgress width="30%" /></SectionProgressBar>
          <SectionDescription>
            This information helps our AI personalize its talent matches to meet your top hiring goals.
            Note: You will not see your talent matches until you complete your profile.
          </SectionDescription>
          <Button>Edit Profile</Button>
        </OnboardingSection>

        <OnboardingSection>
          <SectionTitle>📝 Post a job</SectionTitle>
          <SectionProgressBar><SectionProgress width="0%" /></SectionProgressBar>
          <SectionDescription>
            Post your first job to our curated talent community and receive top candidate matches instantly!
          </SectionDescription>
          <Button>Post a Job</Button>
        </OnboardingSection>

        <OnboardingSection>
          <SectionTitle>🔑 Get access to more talent</SectionTitle>
          <SectionProgressBar><SectionProgress width="0%" /></SectionProgressBar>
          <SectionDescription>
            Complete this quick survey to increase your standing in our algorithm and get access to even more talent.
            These responses are anonymous and are used to help us gather industry data on hiring trends and best practices.
            It will be shared in reports, in responses to questions asked in our AI chatbot, and to benchmark your hiring goals and success metrics.
            Your personal information will NEVER be shared publicly and will only be shared anonymously and in aggregate form.
          </SectionDescription>
          <Button>Complete Survey</Button>
        </OnboardingSection>

        <Grid columns={3}>
          <Card>
            <CardTitle>Open Positions</CardTitle>
            <StatNumber color="#2563EB">1</StatNumber>
          </Card>
          <Card>
            <CardTitle>Total Applicants</CardTitle>
            <StatNumber color="#10B981">22</StatNumber>
          </Card>
          <Card>
            <CardTitle>Upcoming Interviews</CardTitle>
            <InterviewInfo>
              <Calendar size={24} color="#9CA3AF" />
              <div>
                <InterviewDate>Tuesday, September 10, 2024</InterviewDate>
                <InterviewStatus>No interviews scheduled for today</InterviewStatus>
              </div>
            </InterviewInfo>
          </Card>
        </Grid>

        <Grid columns={2}>
          <Card>
            <CardTitle>Applicant Stages</CardTitle>
            <div>
              {applicantStages.map((stage) => (
                <div key={stage.stage} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <ProgressBarContainer>
                    <ProgressBar width={`${(stage.count / 42) * 100}%`} style={{ backgroundColor: stage.color }} />
                  </ProgressBarContainer>
                  <StageLabel>{stage.stage}</StageLabel>
                  <StageCount>{stage.count}</StageCount>
                </div>
              ))}
              <TotalCount>Total: 22</TotalCount>
            </div>
          </Card>
          <Card>
            <CardTitle>Upcoming Events</CardTitle>
            <EventLink href="#">MSBC Career Fair - Register Now</EventLink>
          </Card>
        </Grid>

        <Card>
          <CardTitle>Top Applicants</CardTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Job Details</TableHeader>
                <TableHeader>Match Rating</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <TableCell>
                    <ApplicantName>{applicant.name}</ApplicantName>
                  </TableCell>
                  <TableCell>
                    <JobRole>{applicant.role}</JobRole>
                    <JobDetails>Minnesota Vikings • Eagan, MN • Coordinator, Premium Experience & Operations • Full-time</JobDetails>
                  </TableCell>
                  <TableCell>
                    <MatchRating>{applicant.match}%</MatchRating>
                    <ProgressBarContainer style={{ height: '0.5rem' }}>
                      <ProgressBar width={`${applicant.match}%`} style={{ backgroundColor: '#10B981' }} />
                    </ProgressBarContainer>
                  </TableCell>
                  <TableCell>
                    <StatusBadge>{applicant.status}</StatusBadge>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </MainContent>
    </Container>
  );
};

export default EmployerDash;
