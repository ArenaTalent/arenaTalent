import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Mail, MapPin, Linkedin, FileText, Edit, Landmark,Save, LineChart, Briefcase, Inbox, Search, Building, FileCheck, MessageSquare, Settings, LogOut, Image, Video, Github, Flag, Globe, Clock, MapPinIcon, Upload, X,  VideotapeIcon, Instagram, Users, TrophyIcon, ChevronLeft, ChevronRight} from 'lucide-react'
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  min-height: 100px;
  font-size: 1rem;
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

const EditIconButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CAAAE1;
`

const SkillTag = styled(Badge)`
  background-color: #CAAAE1;
  color: white;
`

const FileInput = styled.input`
  display: none;
`

// const FileInputLabel = styled.label`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0.5rem 1rem;
//   background-color: #CAAAE1;
//   color: white;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 0.875rem;
//   margin-top: 0.5rem;

//   &:hover {
//     background-color: #B799D4;
//   }

//   svg {
//     margin-right: 0.5rem;
//   }
// `

const ModernInput = styled.input`
  width: 95%;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-family: 'Open sans', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: #CAAAE1;
    box-shadow: 0 0 0 2px rgba(202, 170, 225, 0.2);
  }
`

const ModernTextArea = styled.textarea`
  width: 95%;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Open sans', sans-serif;
  transition: border-color 0.3s ease;
  outline: none;
  min-height: 100px;

  &:focus {
    border-color: #CAAAE1;
    box-shadow: 0 0 0 2px rgba(202, 170, 225, 0.2);
  }
`

const ModernSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
  margin-top: 10px;
  margin-bottom: 15px;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;

  &:focus {
    border-color: #CAAAE1;
    box-shadow: 0 0 0 2px rgba(202, 170, 225, 0.2);
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #EF4444;
  padding: 0.25rem;
  margin-left: 0.5rem;

  &:hover {
    color: #DC2626;
  }
`

const CancelButton = styled.button`
  background-color: #EF4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #DC2626;
  }
`

const AddButton = styled.button`
  background-color: #CAAAE1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #B799D4;
  }
`

const AthleteStatusEntry = styled.div`
  border-bottom: 1px solid #D1D5DB;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
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

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #CAAAE1;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: #B799D4;
  }

  svg {
    margin-right: 0.5rem;
  }
`
export default function JobSeekerProfile() {
  const [editingSections, setEditingSections] = useState({})
  const [profile, setProfile] = useState({
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
        school: "NC State",
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
    belongsTo: ['WiST']
  })

  const portfolioRef = useRef(null)

  const [portfolioItems, setPortfolioItems] = useState([
    { imageUrl: '/images/portfolio-1.jpg', title: 'Project 1', link: 'https://example.com/project1' },
    { imageUrl: '/images/portfolio-2.jpg', title: 'Project 2', link: 'https://example.com/project2' },
  ])
  const handlePortfolioScroll = (direction) => {
    if (portfolioRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220
      portfolioRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const addPortfolioItem = () => {
    if (portfolioItems.length < 10) {
      setPortfolioItems([...portfolioItems, { imageUrl: '', title: '', link: '' }])
    }
  }

  const updatePortfolioItem = (index, field, value) => {
    const newItems = [...portfolioItems]
    newItems[index][field] = value
    setPortfolioItems(newItems)
  }

  const removePortfolioItem = (index) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index))
  }

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePortfolioItem(index, 'imageUrl', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const coverPhotoInputRef = useRef(null)
  const profilePictureInputRef = useRef(null)

  const handleEditSection = (section) => {
    setEditingSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target
    setProfile(prev => {
      if (index !== null) {
        const newArray = [...prev[section]]
        newArray[index] = { ...newArray[index], [name]: value }
        return { ...prev, [section]: newArray }
      } else if (typeof prev[section] === 'object' && !Array.isArray(prev[section])) {
        return { ...prev, [section]: { ...prev[section], [name]: value } }
      } else {
        return { ...prev, [section]: value }
      }
    })
  }

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, [type]: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addWorkHistory = () => {
    setProfile(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { title: '', company: '', startDate: '', endDate: '', details: '', skills: '' }]
    }))
  }

  const removeWorkHistory = (index) => {
    setProfile(prev => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== index)
    }))
  }

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', major: '', school: '', graduationYear: '' }]
    }))
  }

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addAthleteStatus = () => {
    setProfile(prev => ({
      ...prev,
      athleteStatus: [...prev.athleteStatus, { status: '', sport: '', league: '', team: '', position: '', duration: { start: '', end: '' }, achievements: [] }]
    }))
  }

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    setProfile(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  return (
    <PageWrapper>
      <NavbarWrapper>
        <JobSeekerNav />
      </NavbarWrapper>
      <PageContainer>
        <ContentContainer>
          <CoverPhoto src={profile.coverPhoto}>
            <EditButton onClick={() => coverPhotoInputRef.current.click()}>
              <Upload size={20} />
            </EditButton>
            <FileInput
              type="file"
              accept="image/*"
              ref={coverPhotoInputRef}
              onChange={(e) => handleFileUpload(e, 'coverPhoto')}
            />
          </CoverPhoto>
          <ProfileContent>
            <MainContent>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('basicInfo')}>
                  <Edit size={20} />
                </EditIconButton>
                <ProfileHeader>
                  <ProfilePicture src={profile.profilePicture}>
                    {editingSections.basicInfo && (
                      <EditButton onClick={() => profilePictureInputRef.current.click()}>
                        <Upload size={20} />
                      </EditButton>
                    )}
                    <FileInput
                      type="file"
                      accept="image/*"
                      ref={profilePictureInputRef}
                      onChange={(e) => handleFileUpload(e, 'profilePicture')}
                    />
                  </ProfilePicture>
                  <ProfileInfo>
                    {editingSections.basicInfo ? (
                      <>
                        <ModernInput
                          name="name"
                          value={profile.name}
                          onChange={(e) => handleChange(e, 'name')}
                          placeholder="Name"
                        />
                        <ModernSelect
                          name="pronouns"
                          value={profile.pronouns}
                          onChange={(e) => handleChange(e, 'pronouns')}
                        >
                          <option value="">Select pronouns</option>
                          {['she/her', 'he/him', 'they/them', 'she/they', 'he/they', 'it/its'].map(pronoun => (
                            <option key={pronoun} value={pronoun}>{pronoun}</option>
                          ))}
                        </ModernSelect>
                        <ModernInput
                          name="title"
                          value={profile.title}
                          onChange={(e) => handleChange(e, 'title')}
                          placeholder="Title"
                        />
                      </>
                    ) : (
                      <>
                        <ProfileName>{profile.name}</ProfileName>
                        <ProfileTitle>{profile.pronouns} | {profile.title} | {profile.currentEmployer}</ProfileTitle>
                      </>
                    )}
                  </ProfileInfo>
                </ProfileHeader>
                <FlagContainer>
                  <Badge variant="success">
                    <Flag size={12} color="white" />
                    <FlagText>Open for Opportunities</FlagText>
                  </Badge>
                </FlagContainer>
                <SectionTitle>About Me</SectionTitle>
                {editingSections.basicInfo ? (
                  <ModernTextArea
                    name="about"
                    value={profile.about}
                    onChange={(e) => handleChange(e, 'about')}
                    placeholder="Tell us about yourself"
                  />
                ) : (
                  <p>{profile.about}</p>
                )}
              </ProfileCard>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('workHistory')}>
                  <Edit size={20} />
                </EditIconButton>
                <SectionTitle>Work History</SectionTitle>
                {editingSections.workHistory ? (
                  <>
                    {profile.workHistory.map((job, index) => (
                      <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4>Work History {index + 1}</h4>
                          <DeleteButton onClick={() => removeWorkHistory(index)}>
                            <X size={16} />
                          </DeleteButton>
                        </div>
                        <ModernInput
                          name="title"
                          value={job.title}
                          onChange={(e) => handleChange(e, 'workHistory', index)}
                          placeholder="Title"
                        />
                        <ModernInput
                          name="company"
                          value={job.company}
                          onChange={(e) => handleChange(e, 'workHistory', index)}
                          placeholder="Company"
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <ModernInput
                            type="date"
                            name="startDate"
                            value={job.startDate}
                            onChange={(e) => handleChange(e, 'workHistory', index)}
                            placeholder="Start Date"
                          />
                          <ModernInput
                            type="date"
                            name="endDate"
                            value={job.endDate}
                            onChange={(e) => handleChange(e, 'workHistory', index)}
                            placeholder="End Date"
                          />
                        </div>
                        <ModernTextArea
                          name="details"
                          value={job.details}
                          onChange={(e) => handleChange(e, 'workHistory', index)}
                          placeholder="Details"
                        />
                        <ModernInput
                          name="skills"
                          value={job.skills}
                          onChange={(e) => handleChange(e, 'workHistory', index)}
                          placeholder="Skills (comma-separated)"
                        />
                      </div>
                    ))}
                    <div>
                      <CancelButton onClick={() => handleEditSection('workHistory')}>Cancel</CancelButton>
                      <AddButton onClick={addWorkHistory}>Add Work History</AddButton>
                    </div>
                  </>
                ) : (
                  <>
                    {profile.workHistory.map((job, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <DetailParagraph>
                          <IconContainer>
                            <Briefcase size={18} />
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
                  </>
                )}
              </ProfileCard>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('education')}>
                  <Edit size={20} />
                </EditIconButton>
                <SectionTitle>Education</SectionTitle>
                {editingSections.education ? (
                  <>
                    {profile.education.map((edu, index) => (
                      <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <h4>Education {index + 1}</h4>
                          <DeleteButton onClick={() => removeEducation(index)}>
                            <X size={16} />
                          </DeleteButton>
                        </div>
                        <ModernInput
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="Degree"
                        />
                        <ModernInput
                          name="major"
                          value={edu.major}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="Major"
                        />
                        <ModernInput
                          name="school"
                          value={edu.school}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="School"
                        />
                        <ModernInput
                          name="graduationYear"
                          value={edu.graduationYear}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="Graduation Year"
                        />
                      </div>
                    ))}
                    <div>
                      <CancelButton onClick={() => handleEditSection('education')}>Cancel</CancelButton>
                      <AddButton onClick={addEducation}>Add Education</AddButton>
                    </div>

                  </>
                ) : (
                  <>
                    {profile.education.map((edu, index) => (
                      <p key={index}>{edu.degree} in {edu.major}, {edu.school}, {edu.graduationYear}</p>
                    ))}
                  </>
                )}
              </ProfileCard>
              <ProfileCard>
          <EditIconButton onClick={() => handleEditSection('portfolio')}>
            <Edit size={20} />
          </EditIconButton>
          <SectionTitle>Portfolio</SectionTitle>
          {editingSections.portfolio ? (
            <>
              <PortfolioContainer>
                <PortfolioScroller ref={portfolioRef}>
                  {portfolioItems.map((item, index) => (
                    <PortfolioItem key={index}>
                      {item.imageUrl ? (
                        <PortfolioImage src={item.imageUrl} />
                      ) : (
                        <FileInputLabel>
                          <Upload size={16} />
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, index)}
                            style={{ display: 'none' }}
                          />
                        </FileInputLabel>
                      )}
                      <ModernInput
                        value={item.title}
                        onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                        placeholder="Title"
                      />
                      <ModernInput
                        value={item.link}
                        onChange={(e) => updatePortfolioItem(index, 'link', e.target.value)}
                        placeholder="Project URL"
                      />
                      <DeleteButton onClick={() => removePortfolioItem(index)}>
                        <X size={16} />
                      </DeleteButton>
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
              {portfolioItems.length < 10 && (
                <AddButton onClick={addPortfolioItem}>Add Portfolio Item</AddButton>
              )}
            </>
          ) : (
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
          )}
        </ProfileCard>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('video')}>
                  <Edit size={20} />
                </EditIconButton>
                <SectionTitle>Video</SectionTitle>
                {editingSections.video ? (
                  <>
                    <ModernInput
                      name="url"
                      value={profile.video.url}
                      onChange={(e) => handleChange(e, 'video')}
                      placeholder="Video URL"
                    />
                    <ModernInput
                      name="title"
                      value={profile.video.title}
                      onChange={(e) => handleChange(e, 'video')}
                      placeholder="Video Title"
                    />
                    <p>Dimensions: {profile.video.dimensions}</p>
                    <p>Prompt: {profile.video.prompt}</p>
                    <FileInputLabel>
                      <Upload size={16} />
                      Upload Video
                      <FileInput
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          // Handle video upload
                          console.log('Video uploaded:', e.target.files[0])
                        }}
                      />
                    </FileInputLabel>
                  </>
                ) : (
                  <>
                    {profile.video.url && (
                      <Link href={profile.video.url} target="_blank" rel="noopener noreferrer">
                        <Video size={24} />
                        {profile.video.title}
                      </Link>
                    )}
                    <div style={{ marginTop: '10px' }}>
                      <img src="/images/demo-video.png" alt="Video thumbnail" style={{ borderRadius: '8px', height: '100px' }} />
                    </div>
                  </>
                )}
              </ProfileCard>
            </MainContent>
            <Sidebar>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('additionalDetails')}>
                  <Edit size={20} />
                </EditIconButton>
                <SectionTitle>Additional Details</SectionTitle>
                <DetailParagraph>
                  <IconContainer>
                    <Mail size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <ModernInput
                      name="email"
                      value={profile.email}
                      onChange={(e) => handleChange(e, 'email')}
                      placeholder="Email"
                    />
                  ) : (
                    profile.email
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <MapPinIcon size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <ModernInput
                      name="location"
                      value={profile.location}
                      onChange={(e) => handleChange(e, 'location')}
                      placeholder="Location"
                    />
                  ) : (
                    profile.location
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <Globe size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <CheckboxContainer>
                      {["English", "Spanish", "Mandarin Chinese", "French", "German", "Japanese", "Russian", "Portuguese",
                        "Arabic", "Hindi", "Italian", "Korean", "Dutch", "Turkish", "Swedish", "Polish", "Greek",
                        "Vietnamese", "Hebrew", "Thai", "Indonesian", "Danish", "Finnish", "Norwegian", "Czech"].map(lang => (
                        <CheckboxLabel key={lang}>
                          <CheckboxInput
                            type="checkbox"
                            value={lang}
                            checked={profile.languages.includes(lang)}
                            onChange={(e) => handleCheckboxChange(e, 'languages')}
                          />
                          {lang}
                        </CheckboxLabel>
                      ))}
                    </CheckboxContainer>
                  ) : (
                    `Languages: ${profile.languages.join(', ')}`
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <Clock size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <ModernSelect
                      name="workExperience"
                      value={profile.workExperience}
                      onChange={(e) => handleChange(e, 'workExperience')}
                    >
                      <option value="">Select experience</option>
                      {['0', '0-1', '1-2', '3-5', '6-10', '11-15', '16+'].map(exp => (
                        <option key={exp} value={exp}>{exp} years</option>
                      ))}
                    </ModernSelect>
                  ) : (
                    `${profile.workExperience} experience`
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <Landmark size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <CheckboxContainer>
                      {["Fully In-Office", "Fully Remote", "Hybrid (1 day a week from home)", "Hybrid (2 days a week from home)", "Hybrid (3 days a week from home)", "Hybrid (4 days a week from home)"].map(option => (
                        <CheckboxLabel key={option}>
                          <CheckboxInput
                            type="checkbox"
                            value={option}
                            checked={profile.workPreference.includes(option)}
                            onChange={(e) => handleCheckboxChange(e, 'workPreference')}
                          />
                          {option}
                        </CheckboxLabel>
                      ))}
                    </CheckboxContainer>
                  ) : (
                    `Prefers ${profile.workPreference.join(', ')}`
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <LineChart size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <ModernSelect
                      name="startupExperience"
                      value={profile.startupExperience.toString()}
                      onChange={(e) => setProfile(prev => ({ ...prev, startupExperience: e.target.value === 'true' }))}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </ModernSelect>
                  ) : (
                    `Startup Experience: ${profile.startupExperience ? 'Yes' : 'No'}`
                  )}
                </DetailParagraph>
                <DetailParagraph>
                  <IconContainer>
                    <Users size={18} />
                  </IconContainer>
                  {editingSections.additionalDetails ? (
                    <ModernSelect
                      name="jobLevel"
                      value={profile.jobLevel}
                      onChange={(e) => handleChange(e, 'jobLevel')}
                    >
                      <option value="">Select job level</option>
                      {['Student', 'Intern', 'Entry Level', 'Associate', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'SVP', 'Executive (C-level)'].map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </ModernSelect>
                  ) : (
                    `Job Level: ${profile.jobLevel}`
                  )}
                </DetailParagraph>
              </ProfileCard>
              <ProfileCard>
          <EditIconButton onClick={() => handleEditSection('links')}>
            <Edit size={20} />
          </EditIconButton>
          <SectionTitle>Olivia's Links</SectionTitle>
          {editingSections.links ? (
            <>
              <DetailParagraph>
                <ModernInput
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={(e) => handleChange(e, 'linkedin')}
                  placeholder="LinkedIn URL"
                />
              </DetailParagraph>
              <DetailParagraph>
                <ModernInput
                  name="github"
                  value={profile.github}
                  onChange={(e) => handleChange(e, 'github')}
                  placeholder="GitHub URL"
                />
              </DetailParagraph>
              <DetailParagraph>
                <ModernInput
                  name="website"
                  value={profile.website}
                  onChange={(e) => handleChange(e, 'website')}
                  placeholder="Personal Website URL"
                />
              </DetailParagraph>
              <DetailParagraph>
                <ModernInput
                  name="tiktok"
                  value={profile.tiktok}
                  onChange={(e) => handleChange(e, 'tiktok')}
                  placeholder="TikTok URL"
                />
              </DetailParagraph>
              <DetailParagraph>
                <ModernInput
                  name="instagram"
                  value={profile.instagram}
                  onChange={(e) => handleChange(e, 'instagram')}
                  placeholder="Instagram URL"
                />
              </DetailParagraph>
            </>
          ) : (
            <>
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
            </>
          )}
        </ProfileCard>

              <ProfileCard>
  <EditIconButton onClick={() => handleEditSection('athleteStatus')}>
    <Edit size={20} />
  </EditIconButton>
  <SectionTitle>Athlete Status</SectionTitle>
  {editingSections.athleteStatus ? (
    <>
      {profile.athleteStatus.map((status, index) => (
        <AthleteStatusEntry key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TrophyIcon size={18} style={{ marginRight: '0.5rem' }} />
              <h4>Athlete Status {index + 1}</h4>
            </div>
            <DeleteButton onClick={() => {
              const newAthleteStatus = profile.athleteStatus.filter((_, i) => i !== index);
              setProfile(prev => ({ ...prev, athleteStatus: newAthleteStatus }));
            }}>
              <X size={16} />
            </DeleteButton>
          </div>
                        <ModernSelect
                          name="status"
                          value={status.status}
                          onChange={(e) => handleChange(e, 'athleteStatus', index)}
                        >
                          <option value="">Select status</option>
                          {['Current Collegiate Athlete', 'Former Collegiate Athlete', 'Current Professional Athlete', 'Former Professional Athlete'].map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </ModernSelect>
                        <ModernInput
                          name="sport"
                          value={status.sport}
                          onChange={(e) => handleChange(e, 'athleteStatus', index)}
                          placeholder="Sport"
                        />
                        <ModernInput
                          name="league"
                          value={status.league}
                          onChange={(e) => handleChange(e, 'athleteStatus', index)}
                          placeholder="League"
                        />
                        <ModernInput
                          name="team"
                          value={status.team}
                          onChange={(e) => handleChange(e, 'athleteStatus', index)}
                          placeholder="School or Team"
                        />
                        <ModernInput
                          name="position"
                          value={status.position}
                          onChange={(e) => handleChange(e, 'athleteStatus', index)}
                          placeholder="Position"
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <ModernInput
                            type="date"
                            name="start"
                            value={status.duration.start}
                            onChange={(e) => {
                              const newAthleteStatus = [...profile.athleteStatus];
                              newAthleteStatus[index].duration.start = e.target.value;
                              setProfile(prev => ({ ...prev, athleteStatus: newAthleteStatus }));
                            }}
                            placeholder="Start Date"
                          />
                          <ModernInput
                            type="date"
                            name="end"
                            value={status.duration.end}
                            onChange={(e) => {
                              const newAthleteStatus = [...profile.athleteStatus];
                              newAthleteStatus[index].duration.end = e.target.value;
                              setProfile(prev => ({ ...prev, athleteStatus: newAthleteStatus }));
                            }}
                            placeholder="End Date"
                          />
                        </div>
                        <ModernInput
                          name="achievements"
                          value={status.achievements.join(', ')}
                          onChange={(e) => {
                            const newAthleteStatus = [...profile.athleteStatus];
                            newAthleteStatus[index].achievements = e.target.value.split(', ');
                            setProfile(prev => ({ ...prev, athleteStatus: newAthleteStatus }));
                          }}
                          placeholder="Achievements/Accolades (comma-separated)"
                        />
                      </AthleteStatusEntry>
                    ))}
<div style={{ marginTop: '1rem' }}>
        <CancelButton onClick={() => handleEditSection('athleteStatus')}>Cancel</CancelButton>
        <AddButton onClick={addAthleteStatus}>Add Athlete Status</AddButton>
      </div>                  </>
                ) : (
                  <>
                    {profile.athleteStatus.map((status, index) => (
                      <AthleteStatusEntry key={index}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-10px'}}>
                          <TrophyIcon size={18} style={{ marginRight: '0.5rem' }} />
                          <h4>{status.status}</h4>
                        </div>
                        <p>{status.sport} - {status.league}</p>
                        <p>{status.team}</p>
                        <p>Position: {status.position}</p>
                        <p>Duration: {status.duration.start} - {status.duration.end || 'Present'}</p>
                        <p>Achievements: {status.achievements.join(', ')}</p>
                      </AthleteStatusEntry>
                    ))}
                  </>
                )}
              </ProfileCard>
              <ProfileCard>
                <EditIconButton onClick={() => handleEditSection('belongsTo')}>
                  <Edit size={20} />
                </EditIconButton>
                <SectionTitle>Belongs to</SectionTitle>
                {editingSections.belongsTo ? (
                  <CheckboxContainer>
                    <CheckboxLabel>
                      <CheckboxInput
                        type="checkbox"
                        value="WiST"
                        checked={profile.belongsTo.includes('WiST')}
                        onChange={(e) => handleCheckboxChange(e, 'belongsTo')}
                      />
                      WiST
                    </CheckboxLabel>
                    {/* Add more options as needed */}
                  </CheckboxContainer>
                ) : (
                  profile.belongsTo.map((org, index) => (
                    <Badge key={index}>{org}</Badge>
                  ))
                )}
              </ProfileCard>
            </Sidebar>
          </ProfileContent>
        </ContentContainer>
      </PageContainer>
    </PageWrapper>
  )
}
