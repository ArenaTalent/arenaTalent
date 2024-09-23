import React, { useState } from 'react'
import styled from 'styled-components'

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-bottom: ${props => props.active ? '2px solid #3b82f6' : 'none'};
  cursor: pointer;

  &:hover {
    color: #3b82f6;
  }
`

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
`

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`

const CardContent = styled.div`
  padding: 1rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #374151;
`

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #e5e7eb;
  color: #374151;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`

const PipelineView = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`

const PipelineColumn = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
`

const PipelineCard = styled.div`
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`

export default function JobTracking() {
  const [activeTab, setActiveTab] = useState('applicants')
  const [view, setView] = useState('table')

  const applicants = [
    { name: 'Jake Gyll', score: 0.0, stage: 'In Review', date: '13 July, 2021' },
    { name: 'Guy Hawkins', score: 0.0, stage: 'In Review', date: '13 July, 2021' },
    { name: 'Cyndy Lillibridge', score: 4.5, stage: 'Shortlisted', date: '12 July, 2021' },
    { name: 'Rodolfo Goode', score: 3.75, stage: 'Declined', date: '11 July, 2021' },
    { name: 'Leif Floyd', score: 4.8, stage: 'Hired', date: '11 July, 2021' },
  ]

  return (
    <Container>
      <Header>
        <div>
          <Title>Social Media Assistant</Title>
          <Subtitle>Design • Full-Time • 4 / 11 Hired</Subtitle>
        </div>
        <Button>More Action</Button>
      </Header>

      <TabList>
        <Tab active={activeTab === 'applicants'} onClick={() => setActiveTab('applicants')}>Applicants</Tab>
        <Tab active={activeTab === 'job-details'} onClick={() => setActiveTab('job-details')}>Job Details</Tab>
        <Tab active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>Analytics</Tab>
      </TabList>

      {activeTab === 'applicants' && (
        <Card>
          <CardHeader>
            <CardTitle>Total Applicants: 19</CardTitle>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Input placeholder="Search Applicants" />
              <Button>Filter</Button>
              <Button onClick={() => setView(view === 'table' ? 'pipeline' : 'table')}>
                {view === 'table' ? 'Pipeline View' : 'Table View'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'table' ? (
              <Table>
                <thead>
                  <tr>
                    <Th>Full Name</Th>
                    <Th>Score</Th>
                    <Th>Hiring Stage</Th>
                    <Th>Applied Date</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant, index) => (
                    <tr key={index}>
                      <Td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Avatar>{applicant.name[0]}</Avatar>
                          <span>{applicant.name}</span>
                        </div>
                      </Td>
                      <Td>{applicant.score}</Td>
                      <Td><Badge>{applicant.stage}</Badge></Td>
                      <Td>{applicant.date}</Td>
                      <Td><Button>See Application</Button></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <PipelineView>
                {['In Review', 'Shortlisted', 'Interview', 'Hired'].map((stage) => (
                  <PipelineColumn key={stage}>
                    <h3>{stage}</h3>
                    {[1, 2, 3].map((i) => (
                      <PipelineCard key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Avatar>JD</Avatar>
                          <div>
                            <p style={{ fontWeight: 'bold' }}>John Doe</p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Applied on 13 July, 2021</p>
                          </div>
                        </div>
                      </PipelineCard>
                    ))}
                  </PipelineColumn>
                ))}
              </PipelineView>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'job-details' && (
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Job details content goes here...</p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>23,564</div>
              <div style={{ fontSize: '0.875rem', color: 'green' }}>6.4% vs last day</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>132</div>
              <div style={{ fontSize: '0.875rem', color: 'red' }}>0.4% vs last day</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Traffic Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Pie chart placeholder</p>
            </CardContent>
          </Card>
          <Card style={{ gridColumn: 'span 2' }}>
            <CardHeader>
              <CardTitle>Job Listing View Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Line chart placeholder</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Visitors by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Bar chart placeholder</p>
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  )
}
