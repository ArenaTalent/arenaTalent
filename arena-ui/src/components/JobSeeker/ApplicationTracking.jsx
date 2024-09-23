import React from 'react'
import styled from 'styled-components'
import { ArrowLeft } from 'lucide-react'
import JobSeekerNav from './JobSeekerNav'
import { Link, useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`

const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
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
  }
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

export default function ApplicationTracking() {
  const navigate = useNavigate();

  const appliedPositions = [
    { company: 'Arena', logo: '/images/black-logo.png', title: 'CTO', details: 'Remote • Full-time', match: 96, dateApplied: 'Sept 1st', status: 'In-Review' },
    // Add more applied positions here as needed
  ];

  return (
    <PageWrapper>
      <NavWrapper>
        <JobSeekerNav />
      </NavWrapper>
      <ContentWrapper>
        <BackButton to="/jobseeker-dashboard">
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '0.5rem' }}>Back to Dashboard</span>
        </BackButton>

        <Section>
          <SectionTitle>Applied Positions</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Company</TableHeader>
                <TableHeader>Job Details</TableHeader>
                <TableHeader>Match Rating</TableHeader>
                <TableHeader>Date Applied</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {appliedPositions.map((position, index) => (
                <tr key={index} onClick={() => navigate('/job-posting1')}>
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
              ))}
            </tbody>
          </Table>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  )
}
