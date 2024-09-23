import React, {useState} from 'react'
import styled from 'styled-components'
import {X, Share2, Linkedin, Briefcase, Users, Monitor, Coffee, Train, CheckCircle, Info, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import JobSeekerNav from './JobSeekerNav'

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
  max-width: 900px;
  margin: 0 auto;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  margin-bottom: 1rem;

  &:hover {
    color: #2d3748;
  }
`

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const JobTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
  color: #1a202c;
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CompanyLogo = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
`

const CompanyName = styled.span`
  font-weight: 600;
  color: #4a5568;
`

const JobLocation = styled.span`
  color: #718096;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;

  ${props => props.primary ? `
    background-color: #9333ea;
    color: white;
    border: none;
    &:hover {
      background-color: #7e22ce;
    }
  ` : `
    background-color: white;
    color: #9333ea;
    border: 1px solid #9333ea;
    &:hover {
      background-color: #f3e8ff;
    }
  `}
`

const Section = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1a202c;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #4a5568;

  &::before {
    content: "";
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #9333ea;
    border-radius: 50%;
  }
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`

const BenefitCard = styled.div`
  background-color: #f7fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const BenefitIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #f3e8ff;
  color: #9333ea;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`

const BenefitTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a202c;
`

const BenefitDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
`

const RecruiterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`

const RecruiterImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`

const RecruiterInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const RecruiterName = styled.span`
  font-weight: 600;
  color: #1a202c;
`

const RecruiterTitle = styled.span`
  color: #718096;
  font-size: 0.875rem;
`

const AboutRole = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`

const AboutRoleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const AboutRoleLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
`

const AboutRoleValue = styled.span`
  font-weight: 600;
  color: #1a202c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const MatchPercentage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #059669;
  font-size: 1.25rem;
`

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  ${TooltipContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`

const ShareModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  &:hover {
    color: #4a5568;
  }
`

const TinyUrl = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
`
const CompanyLogoLink = styled(Link)`
  display: block;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`

const Tooltip = ({ children, content }) => (
  <TooltipContainer>
    {children}
    <TooltipContent>{content}</TooltipContent>
  </TooltipContainer>
)

export default function JobPosting() {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [tinyUrl, setTinyUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    setTinyUrl(window.location.href);
    setShowShareModal(true);
  };

  const handleCopyTinyUrl = () => {
    navigator.clipboard.writeText(tinyUrl);
    // Optionally, show a "Copied!" message to the user
  };

  return (
    <PageWrapper>
      <NavWrapper>
        <JobSeekerNav />
      </NavWrapper>
      <ContentWrapper>
        <BackButton onClick={handleGoBack}>
          <ArrowLeft size={18} />
          Back to Jobs
        </BackButton>
        <JobHeader>
          <CompanyInfo>
            <CompanyLogoLink to="/company-profile">
              <CompanyLogo src="/images/black-logo.png" alt="ARENA Talent Logo" />
            </CompanyLogoLink>
            <div>
              <JobTitle>Chief Technology Officer (CTO)</JobTitle>
              <CompanyName>ARENA Talent</CompanyName> • <JobLocation>Remote</JobLocation>
            </div>
          </CompanyInfo>
          <ButtonGroup>
            <Button onClick={handleShare}>
              <Share2 size={18} />
              Share
            </Button>
            <Button primary>Applied</Button>
          </ButtonGroup>
        </JobHeader>

        <Section>
          <SectionTitle>About this role</SectionTitle>
          <AboutRole>
            <AboutRoleItem>
              <AboutRoleLabel>Apply Before</AboutRoleLabel>
              <AboutRoleValue>August 31, 2024</AboutRoleValue>
            </AboutRoleItem>
            <AboutRoleItem>
              <AboutRoleLabel>Job Level</AboutRoleLabel>
              <AboutRoleValue>Executive</AboutRoleValue>
            </AboutRoleItem>
            <AboutRoleItem>
              <AboutRoleLabel>Job Type</AboutRoleLabel>
              <AboutRoleValue>Full-Time</AboutRoleValue>
            </AboutRoleItem>
            <AboutRoleItem>
              <AboutRoleLabel>WFH Policy</AboutRoleLabel>
              <AboutRoleValue>Remote</AboutRoleValue>
            </AboutRoleItem>
            <AboutRoleItem>
              <AboutRoleLabel>Salary Range</AboutRoleLabel>
              <AboutRoleValue>
                $180k-$250k USD
                <Tooltip content="This salary is within the normal range for this industry and position and was selected by the Employer.">
                  <CheckCircle size={18} color="#10B981" />
                </Tooltip>
              </AboutRoleValue>
            </AboutRoleItem>
            <AboutRoleItem>
              <AboutRoleLabel>Match</AboutRoleLabel>
              <AboutRoleValue>
                <MatchPercentage>
                  96% Match
                  <Tooltip content="96% Match: Strengths - History as a software engineer in the sports tech industry. Weaknesses - No experience in a CTO role. Try demonstrating leadership skills on your resume and add Quantifiable metrics.">
                    <Info size={18} color="#3B82F6" />
                  </Tooltip>
                </MatchPercentage>
              </AboutRoleValue>
            </AboutRoleItem>
          </AboutRole>
        </Section>

        <Section>
          <SectionTitle>Overview</SectionTitle>
          <p>
            ARENA Talent is seeking a visionary Chief Technology Officer (CTO) to lead our technical strategy and drive innovation. As CTO, you will play a crucial role in shaping the future of our platform, which creates equitable career opportunities for professionals in sports, media, and entertainment. You will be responsible for overseeing all technical aspects of the company, making executive decisions on behalf of the company's technological requirements, and leading our talented engineering team.
          </p>
        </Section>

        <Section>
          <SectionTitle>Responsibilities</SectionTitle>
          <List>
            <ListItem>Develop and execute the company's technical strategy to support our business goals</ListItem>
            <ListItem>Lead the engineering team, fostering a culture of innovation, collaboration, and excellence</ListItem>
            <ListItem>Oversee the development and maintenance of our platform, ensuring scalability, security, and performance</ListItem>
            <ListItem>Stay abreast of emerging technologies and industry trends, identifying opportunities for innovation</ListItem>
            <ListItem>Collaborate with other C-level executives to align technology initiatives with business objectives</ListItem>
            <ListItem>Manage the technology budget and allocate resources effectively</ListItem>
            <ListItem>Ensure the company's technology practices adhere to industry standards and regulations</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Qualifications</SectionTitle>
          <List>
            <ListItem>10+ years of experience in technology leadership roles, preferably in fast-growing startups</ListItem>
            <ListItem>Strong background in software development, with expertise in modern web technologies</ListItem>
            <ListItem>Proven track record of successfully leading and scaling engineering teams</ListItem>
            <ListItem>Experience with cloud infrastructure, microservices architecture, and API design</ListItem>
            <ListItem>Excellent communication skills, with the ability to explain complex technical concepts to non-technical stakeholders</ListItem>
            <ListItem>Strategic thinker with a passion for using technology to solve business problems</ListItem>
            <ListItem>Bachelor's or Master's degree in Computer Science, Engineering, or related field</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Nice-To-Haves</SectionTitle>
          <List>
            <ListItem>Experience in the sports, media, or entertainment industries</ListItem>
            <ListItem>Knowledge of AI and machine learning technologies</ListItem>
            <ListItem>Experience with data analytics and business intelligence tools</ListItem>
            <ListItem>Background in building marketplaces or talent platforms</ListItem>
          </List>
        </Section>

        {/* <Section>
          <SectionTitle>Required Skills</SectionTitle>
          <List>
            <ListItem>Technical Leadership</ListItem>
            <ListItem>Software Architecture</ListItem>
            <ListItem>Cloud Computing (AWS, Azure, or GCP)</ListItem>
            <ListItem>Agile Methodologies</ListItem>
            <ListItem>Data Security and Compliance</ListItem>
            <ListItem>Strategic Planning</ListItem>
            <ListItem>Team Management</ListItem>
          </List>
        </Section> */}

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
          <SectionTitle>Hiring Manager </SectionTitle>
          <RecruiterSection>
            <RecruiterImage src="/images/parul.png" alt="Parul Khosla" />
            <RecruiterInfo>
              <RecruiterName>Parul Khosla</RecruiterName>
              <RecruiterTitle>CEO | Co-Founder</RecruiterTitle>
            </RecruiterInfo>
            <Link to="https://www.linkedin.com/in/parulkhosla" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} color="#0077B5" />
            </Link>
          </RecruiterSection>
        </Section>

        {showShareModal && (
          <>
            <Backdrop onClick={() => setShowShareModal(false)} />
            <ShareModal>
              <ModalHeader>
                <ModalTitle>Share this job</ModalTitle>
                <CloseButton onClick={() => setShowShareModal(false)}>
                  <X size={18} />
                </CloseButton>
              </ModalHeader>
              <TinyUrl value={tinyUrl} readOnly />
              <Button onClick={handleCopyTinyUrl}>
                {copied ? (
                  <>
                    <CheckCircle size={18} />
                    Copied
                  </>
                ) : (
                  'Copy Link'
                )}
              </Button>
            </ShareModal>
          </>
        )}
      </ContentWrapper>
    </PageWrapper>
  )
}
