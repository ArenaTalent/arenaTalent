import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Mail, MapPin, Box, Linkedin, Presentation, Github, Flag, Globe, Clock, MapPinIcon, Video, VideotapeIcon, Instagram, TrophyIcon, ChevronLeft, ChevronRight, FileText} from 'lucide-react'
import EmployerNav from './EmployerNav'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const NavbarWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

const PageContainer = styled.div`
  flex-grow: 1;
  background-color: #f3f4f6;
  overflow-y: auto;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 2rem;
  position: relative;
`

const CoverPhoto = styled.div`
  height: 250px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
  position: relative;
`

const ProfileContent = styled.div`
  display: flex;
  margin-top: -5rem;
  position: relative;
  z-index: 20;
`

const MainContent = styled.div`
  width: 65%;
  padding-right: 2rem;
  margin-left: 20px;
`

const Sidebar = styled.div`
  width: 35%;
  margin-right: 30px;
`

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 4px solid white;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`

const ProfileInfo = styled.div``

const ProfileName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`

const ProfileTitle = styled.p`
  font-size: 1.1rem;
  color: #4b5563;
  margin-top: -3px;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.variant === 'success' ? '#10B981' : '#E5E7EB'};
  color: ${props => props.variant === 'success' ? 'white' : '#4B5563'};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Link = styled.a`
  display: flex;
  align-items: center;
  color: #4B5563;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: #1F2937;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
`

const DetailParagraph = styled.p`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`

const FlagContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const FlagText = styled.span`
  margin-left: 0.5rem;
`

const SkillTag = styled(Badge)`
  background-color: #CAAAE1;
  color: white;
`

const PortfolioContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 30px;
`

const PortfolioScroller = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const PortfolioItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
  text-align: center;
`

const PortfolioImage = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`

const PortfolioTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: #CAAAE1;
`

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(202, 170, 225, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(202, 170, 225, 1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const LeftScrollButton = styled(ScrollButton)`
  left: 0;
`

const RightScrollButton = styled(ScrollButton)`
  right: 0;
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const ToggleLabel = styled.label`
  margin-right: 0.5rem;
  font-size: 0.875rem;
  color: #4B5563;
`

const ToggleSwitch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${props => props.checked ? '#10B981' : '#E5E7EB'};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.checked ? '22px' : '2px'};
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s ease;
`

const ResumeContainer = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`

const ResumeFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

export default function Profile() {
  const [showResume, setShowResume] = useState(false)
  const portfolioRef = useRef(null)

  const profile = {
    name: 'Olivia Schwartz',
    pronouns: 'She/Her',
    title: 'Software Engineer',
    email: 'ocmooney@gmail.com',
    location: 'Leesburg VA, US',
    linkedin: 'https://www.linkedin.com/in/olivia-c-schwartz/',
    github: 'https://github.com/oliviaschwartz',
    website: '',
    tiktok: '',
    instagram: '',
    education: [
      {
        degree: "Bachelor's",
        major: "Human Biology",
        school: "North Carolina State University",
        graduationYear: "2014"
      }
    ],
    educationDetails: "My degree in Human Biology has given me a unique perspective in the tech industry, allowing me to approach problems with a holistic, human-centered view. This background has been particularly valuable in developing health tech solutions and in understanding the broader implications of technology on human behavior and society.",
    strengths: ['Teamwork', 'Collaboration', 'Planning'],
    currentEmployer: 'Arena Talent',
    workExperience: '5 years',
    workPreference: ['Remote'],
    workHistory: [
      {
        title: "CTO",
        company: "Arena Talent",
        startDate: "2024-03-01",
        endDate: "",
        details: "Led the development of innovative recruitment solutions, leveraging AI and machine learning to match candidates with optimal job opportunities. Managed a team of 20+ developers, implemented agile methodologies, and increased our platform's efficiency by 40%.",
        skills: "AI/ML, Agile Management, Full-Stack Development, Cloud Architecture"
      }
    ],
    skills: ['AI/ML', 'Agile Management', 'Full-Stack Development', 'Cloud Architecture'],
    portfolio: 'https://arenavikings-120c9.web.app/',
    video: {
      url: 'https://example.com/video',
      title: 'My Introduction Video',
      dimensions: '1920x1080',
      prompt: 'Make the video 1-2 minutes. Share a little bit about yourself, your top skills, and what your career goals are',
    },
    about: 'Passionate CTO with a background in Human Biology. Leveraging my unique perspective to drive innovation in the tech industry. Committed to fostering collaborative environments and delivering cutting-edge solutions.',
    coverPhoto: '/images/cover-photo.png.jpg',
    profilePicture: '/images/olivia.png',
    languages: ['English', 'Spanish'],
    athleteStatus: [
      {
        status: 'Current Professional Athlete',
        sport: 'Football',
        league: 'NFL',
        team: 'Philadelphia Eagles',
        position: 'Quarterback',
        duration: { start: '2020-01-01', end: '' },
        achievements: ['Superbowl Champion']
      },
      {
        status: 'Former Collegiate Athlete',
        sport: 'Football',
        league: 'NCAA',
        team: 'NC State',
        position: 'Quarterback',
        duration: { start: '2010-09-01', end: '2014-05-31' },
        achievements: ['All-American']
      }
    ],
    startupExperience: true,
    jobLevel: 'Executive (C-level)',
    belongsTo: ['WiST'],
    resumeUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snippet-5ERrkeBdcuORrxzuPDX7m3kmGsmmga.txt'
  }

  const portfolioItems = [
    { imageUrl: '/images/demo-video.png', title: 'Project 1', link: 'https://example.com/project1' },
    { imageUrl: '/images/cover-photo.png.jpg', title: 'Project 2', link: 'https://example.com/project2' },
  ]

  const handlePortfolioScroll = (direction) => {
    if (portfolioRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220
      portfolioRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleToggle = () => {
    setShowResume(!showResume)
  }

  return (
    <PageWrapper>
      <NavbarWrapper>
        <EmployerNav />
      </NavbarWrapper>
      <PageContainer>
        <ContentContainer>
          <ToggleContainer>
            <ToggleLabel htmlFor="resume-toggle">Resume view</ToggleLabel>
            <ToggleSwitch checked={showResume} onClick={handleToggle}>
              <ToggleSlider checked={showResume} />
            </ToggleSwitch>
          </ToggleContainer>
          {showResume ? (
        <ResumeContainer>
          <ResumeFrame
            src={`/images/resume.pdf#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume"
          />
        </ResumeContainer>
      ) : (
            <>
              <CoverPhoto src={profile.coverPhoto} />
              <ProfileContent>
                <MainContent>
                  <ProfileCard>
                    <ProfileHeader>
                      <ProfilePicture src={profile.profilePicture} />
                      <ProfileInfo>
                        <ProfileName>{profile.name}</ProfileName>
                        <ProfileTitle>{profile.pronouns} | {profile.title} | {profile.currentEmployer}</ProfileTitle>
                      </ProfileInfo>
                    </ProfileHeader>
                    <FlagContainer>
                      <Badge variant="success">

                        <FlagText>95% Match</FlagText>
                      </Badge>
                    </FlagContainer>
                    <SectionTitle>About Me</SectionTitle>
                    <p>{profile.about}</p>
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>Experience</SectionTitle>
                    {profile.workHistory.map((job, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <DetailParagraph>
                          <IconContainer>
                            <Mail size={18} />
                          </IconContainer>
                          {job.title} at {job.company} | {job.startDate} - {job.endDate || 'Present'}
                        </DetailParagraph>
                        <p>{job.details}</p>
                        <SectionTitle>Skills</SectionTitle>
                        <SkillsContainer>
                          {job.skills.split(',').map((skill, skillIndex) => (
                            <SkillTag key={skill}>{skill.trim()}</SkillTag>
                          ))}
                        </SkillsContainer>
                      </div>
                    ))}
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>Education</SectionTitle>
                    {profile.education.map((edu, index) => (
                      <p key={index}>{edu.degree} in {edu.major} from {edu.school}</p>
                    ))}
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>My Portfolio</SectionTitle>
                    <PortfolioContainer>
                      <PortfolioScroller ref={portfolioRef}>
                        {portfolioItems.map((item, index) => (
                          <PortfolioItem key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <PortfolioImage src={item.imageUrl} />
                              <PortfolioTitle>{item.title}</PortfolioTitle>
                            </a>
                          </PortfolioItem>
                        ))}
                      </PortfolioScroller>
                      <LeftScrollButton onClick={() => handlePortfolioScroll('left')} disabled={portfolioRef.current?.scrollLeft === 0}>
                        <ChevronLeft size={20} />
                      </LeftScrollButton>
                      <RightScrollButton onClick={() => handlePortfolioScroll('right')} disabled={portfolioRef.current?.scrollLeft === portfolioRef.current?.scrollWidth - portfolioRef.current?.clientWidth}>
                        <ChevronRight size={20} />
                      </RightScrollButton>
                    </PortfolioContainer>
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>Introduction Video</SectionTitle>
                    {profile.video.url && (
                      <Link href={profile.video.url} target="_blank" rel="noopener noreferrer">
                        <Video size={24} />
                        {profile.video.title}
                      </Link>
                    )}
                    <div style={{ marginTop: '10px' }}>
                      <img src="/images/demo-video.png" alt="Video thumbnail" style={{ borderRadius: '8px', height: '100px' }} />
                    </div>
                  </ProfileCard>
                </MainContent>
                <Sidebar>
                  <ProfileCard>
                    <SectionTitle>Contact Info</SectionTitle>
                    <DetailParagraph>
                      <IconContainer>
                        <Mail size={18} />
                      </IconContainer>
                      {profile.email}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <MapPinIcon size={18} />
                      </IconContainer>
                      {profile.location}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <Globe size={18} />
                      </IconContainer>
                      {`Languages: ${profile.languages.join(', ')}`}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <Clock size={18} />
                      </IconContainer>
                      {`${profile.workExperience} experience`}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <MapPin size={18} />
                      </IconContainer>
                      {`Prefers ${profile.workPreference.join(', ')}`}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <Box size={18} />
                      </IconContainer>
                      {`Willing To Relocate: ${profile.willingToRelocate ? 'Yes' : 'No'}`}
                    </DetailParagraph>
                    <DetailParagraph>
                      <IconContainer>
                        <Presentation size={18} />
                      </IconContainer>
                      {`Job Level: ${profile.jobLevel}`}
                    </DetailParagraph>
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>My Links</SectionTitle>
                    {profile.linkedin && (
                      <DetailParagraph>
                        <IconContainer>
                          <Linkedin size={18} />
                        </IconContainer>
                        <Link href={profile.linkedin}>LinkedIn</Link>
                      </DetailParagraph>
                    )}
                    {profile.github && (
                      <DetailParagraph>
                        <IconContainer>
                          <Github size={18} />
                        </IconContainer>
                        <Link href={profile.github}>GitHub</Link>
                      </DetailParagraph>
                    )}
                    {profile.website && (
                      <DetailParagraph>
                        <IconContainer>
                          <Globe size={18} />
                        </IconContainer>
                        <Link href={profile.website}>Personal Website</Link>
                      </DetailParagraph>
                    )}
                    {profile.tiktok && (
                      <DetailParagraph>
                        <IconContainer>
                          <VideotapeIcon size={18} />
                        </IconContainer>
                        <Link href={profile.tiktok}>TikTok</Link>
                      </DetailParagraph>
                    )}
                    {profile.instagram && (
                      <DetailParagraph>
                        <IconContainer>
                          <Instagram size={18} />
                        </IconContainer>
                        <Link href={profile.instagram}>Instagram</Link>
                      </DetailParagraph>
                    )}
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>Member Of</SectionTitle>
                    {profile.belongsTo.map((org, index) => (
                      <Badge key={index}>{org}</Badge>
                    ))}
                  </ProfileCard>
                  <ProfileCard>
                    <SectionTitle>Honors & Achievements</SectionTitle>

                  </ProfileCard>
                </Sidebar>
              </ProfileContent>
            </>
          )}
        </ContentContainer>
      </PageContainer>
    </PageWrapper>
  )
}
