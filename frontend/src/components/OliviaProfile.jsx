import React, { useState } from 'react'
import styled from 'styled-components'
import { Mail, MapPin, Linkedin, FileText, Edit, Save, Briefcase, Inbox, Search, Building, FileCheck, MessageSquare, Settings, LogOut, Image, Video, Github, Flag } from 'lucide-react'
import JobSeekerNav from './JobSeekerNav'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const NavbarWrapper = styled.div`
  width: 250px;
  background-color: #f3f4f6;
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

const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const ProfileContent = styled.div`
  display: flex;
  margin-top: -5rem;
  position: relative;
  z-index: 20;
`

const MainContent = styled.div`
  width: 75%;
  padding-right: 2rem;
  margin-left: 20px;
`

const Sidebar = styled.div`
  width: 25%;
  margin-right: 30px;
`

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 4px solid white;
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
  display: inline-block;
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  min-height: 100px;
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

export default function OliviaProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Olivia Schwartz',
    pronouns: 'She/Her',
    title: 'Software Engineer',
    email: 'ocmooney@gmail.com',
    location: 'Leesburg VA, US',
    linkedin: 'https://www.linkedin.com/in/olivia-c-schwartz/',
    github: 'https://github.com/oliviaschwartz',
    education: "Bachelor's in Human Biology, NC State, 2014",
    educationDetails: "My degree in Human Biology has given me a unique perspective in the tech industry, allowing me to approach problems with a holistic, human-centered view. This background has been particularly valuable in developing health tech solutions and in understanding the broader implications of technology on human behavior and society.",
    strengths: ['Teamwork', 'Collaboration', 'Planning'],
    currentEmployer: 'Arena Talent',
    workExperience: '5 years',
    workPreference: 'Remote',
    workHistory: "As CTO at Arena Talent, I've led the development of innovative recruitment solutions, leveraging AI and machine learning to match candidates with optimal job opportunities. I've managed a team of 20+ developers, implemented agile methodologies, and increased our platform's efficiency by 40%.",
    skills: ['AI/ML', 'Agile Management', 'Full-Stack Development', 'Cloud Architecture'],
    portfolio: 'https://example.com/portfolio',
    video: 'https://example.com/video',
    videoTitle: 'My Introduction Video',
    about: 'Passionate CTO with a background in Human Biology. Leveraging my unique perspective to drive innovation in the tech industry. Committed to fostering collaborative environments and delivering cutting-edge solutions.',
    coverPhoto: '/images/cover-photo.png.jpg',
    languages: ['English', 'Spanish'],
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the changes to a backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <PageWrapper>
      <NavbarWrapper>
        <JobSeekerNav />
      </NavbarWrapper>
      <PageContainer>
        <ContentContainer>
          <CoverPhoto src={profile.coverPhoto}>
            <EditButton onClick={handleEdit}>
              {isEditing ? <Save size={20} onClick={handleSave} /> : <Edit size={20} />}
            </EditButton>
          </CoverPhoto>
          <ProfileContent>
            <MainContent>
              <ProfileCard>
                <ProfileHeader>
                  <ProfilePicture src="/images/olivia.png" alt="Olivia Schwartz" />
                  <ProfileInfo>
                    {isEditing ? (
                      <>
                        <Input
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                        />
                        <Input
                          name="pronouns"
                          value={profile.pronouns}
                          onChange={handleChange}
                        />
                        <Input
                          name="title"
                          value={profile.title}
                          onChange={handleChange}
                        />
                      </>
                    ) : (
                      <>
                        <ProfileName>{profile.name} ({profile.pronouns})</ProfileName>
                        <ProfileTitle>{profile.title} | Arena Talent</ProfileTitle>
                      </>
                    )}
                  </ProfileInfo>
                </ProfileHeader>
                <Badge variant="success"><Flag size={12} color="white" />Open for Opportunities</Badge>
                <SectionTitle>About</SectionTitle>
                {isEditing ? (
                  <TextArea
                    name="about"
                    value={profile.about}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.about}</p>
                )}
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Work History</SectionTitle>
                {isEditing ? (
                  <>
                    <Input
                      name="currentEmployer"
                      value={profile.currentEmployer}
                      onChange={handleChange}
                      placeholder="Current Employer"
                    />
                    <TextArea
                      name="workHistory"
                      value={profile.workHistory}
                      onChange={handleChange}
                      placeholder="Work History"
                    />
                    <Input
                      name="skills"
                      value={profile.skills.join(', ')}
                      onChange={(e) => setProfile(prev => ({ ...prev, skills: e.target.value.split(', ') }))}
                      placeholder="Skills (comma-separated)"
                    />
                  </>
                ) : (
                  <>
                    <p><Briefcase size={18} /> {profile.title} at {profile.currentEmployer} | March 2024-Present</p>
                    <p>{profile.workHistory}</p>
                    <SectionTitle>Skills</SectionTitle>
                    <SkillsContainer>
                      {profile.skills.map((skill, index) => (
                        <Badge key={index}>{skill}</Badge>
                      ))}
                    </SkillsContainer>
                  </>
                )}
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Education</SectionTitle>
                {isEditing ? (
                  <>
                    <Input
                      name="education"
                      value={profile.education}
                      onChange={handleChange}
                    />
                    <TextArea
                      name="educationDetails"
                      value={profile.educationDetails}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
                    <p>{profile.education}</p>
                    <p>{profile.educationDetails}</p>
                  </>
                )}
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Portfolio</SectionTitle>
                {isEditing ? (
                  <Input
                    name="portfolio"
                    value={profile.portfolio}
                    onChange={handleChange}
                    placeholder="Portfolio URL"
                  />
                ) : (
                  <Link href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                    <Image size={24} />
                    View Portfolio
                  </Link>
                )}
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Video</SectionTitle>
                {isEditing ? (
                  <>
                    <Input
                      name="video"
                      value={profile.video}
                      onChange={handleChange}
                      placeholder="Video URL"
                    />
                    <Input
                      name="videoTitle"
                      value={profile.videoTitle}
                      onChange={handleChange}
                      placeholder="Video Title"
                    />
                  </>
                ) : (
                  <Link href={profile.video} target="_blank" rel="noopener noreferrer">
                    <Video size={24} />
                    {profile.videoTitle}
                  </Link>
                )}
              </ProfileCard>
            </MainContent>
            <Sidebar>
            <ProfileCard>
                <SectionTitle>Additional Details</SectionTitle>
                <p><Mail size={18} /> {profile.email}</p>
                <p><MapPin size={18} /> {profile.location}</p>
                <p>Languages: {profile.languages.join(', ')}</p>
                <p>{profile.workExperience} experience</p>
                <p> Prefers {profile.workPreference}</p>
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Olivia's Links</SectionTitle>
                <Link href={profile.linkedin}>
                  <Linkedin size={18} />
                  LinkedIn
                </Link>
                <Link href={profile.github}>
                  <Github size={18} />
                  GitHub
                </Link>
              </ProfileCard>
              <ProfileCard>
                <SectionTitle>Belongs to</SectionTitle>
                <Badge>WiST</Badge>
              </ProfileCard>
            </Sidebar>
          </ProfileContent>
        </ContentContainer>
      </PageContainer>
    </PageWrapper>
  )
}
