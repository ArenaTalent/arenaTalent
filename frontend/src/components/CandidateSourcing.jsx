import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Search, Save, ChevronDown, ChevronUp, ArrowUpDown, X, User } from 'lucide-react'
import {  useNavigate } from 'react-router-dom'
import EmployerNav from './EmployerNav'
import { profiles } from '../data/profiles'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Open Sans', sans-serif;
`

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  background-color: #CAAAE1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  &:hover {
    background-color: #0060df;
  }
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`

const Sidebar = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  height: 100%;
  overflow-y: auto;
  position: sticky;
  top: 0;
`

const FilterSection = styled.div`
  margin-bottom: 1rem;
`

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FilterContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  max-height: 200px;
  overflow-y: auto;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
`

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const JobSeekerList = styled.div`
  display: grid;
  gap: 1rem;
`

const JobSeekerCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`

const JobSeekerInfo = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`

const JobSeekerName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`

const JobSeekerDetails = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span`
  background-color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.8rem;
`

const MatchPercentage = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${props => props.color};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const SortButton = styled(Button)`
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: -40px;

  &:hover {
    background-color: #f0f0f0;
  }
`

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const PopupContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
`

const PopupTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const PopupDescription = styled.p`
  margin-bottom: 1rem;
`

const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

const FilterSearchInput = styled(SearchInput)`
  width: 100%;
  margin-bottom: 0.5rem;
`

const NestedFilterContent = styled(FilterContent)`
  padding-left: 1rem;
`

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  margin-left: 0.5rem;

  &:hover {
    color: #333;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 4rem;
`

export default function CandidateSourcing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [locationSearch, setLocationSearch] = useState('')
  const [selectedCurrentEmployers, setSelectedCurrentEmployers] = useState([])
  const [currentEmployerSearch, setCurrentEmployerSearch] = useState('')
  const [selectedCurrentTitles, setSelectedCurrentTitles] = useState([])
  const [currentTitleSearch, setCurrentTitleSearch] = useState('')
  const [selectedWorkExperience, setSelectedWorkExperience] = useState([])
  const [selectedCurrentLevel, setSelectedCurrentLevel] = useState([])
  const [selectedHighestDegree, setSelectedHighestDegree] = useState([])
  const [selectedMajors, setSelectedMajors] = useState([])
  const [majorSearch, setMajorSearch] = useState('')
  const [selectedUniversities, setSelectedUniversities] = useState([])
  const [universitySearch, setUniversitySearch] = useState('')
  const [selectedHBCU, setSelectedHBCU] = useState(false)
  const [selectedStrengths, setSelectedStrengths] = useState([])
  const [strengthSearch, setStrengthSearch] = useState('')
  const [selectedWillingToRelocate, setSelectedWillingToRelocate] = useState(null)
  const [selectedGenders, setSelectedGenders] = useState([])
  const [selectedRaces, setSelectedRaces] = useState([])
  const [selectedStartupExperience, setSelectedStartupExperience] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedAthleteStatus, setSelectedAthleteStatus] = useState([])
  const [selectedVeteranStatus, setSelectedVeteranStatus] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState(profiles)
  const [openFilters, setOpenFilters] = useState({})
  const [sortOrder, setSortOrder] = useState('desc')
  const [isPopupOpen, setIsPopupOpen] = useState(true)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showMatchPercentage, setShowMatchPercentage] = useState(false)

  useEffect(() => {
    filterProfiles()
  }, [searchTerm, selectedLocations, selectedCurrentEmployers, selectedCurrentTitles, selectedWorkExperience, selectedCurrentLevel, selectedHighestDegree, selectedMajors, selectedUniversities, selectedHBCU, selectedStrengths, selectedWillingToRelocate, selectedGenders, selectedRaces, selectedStartupExperience, selectedLanguages, selectedAthleteStatus, selectedVeteranStatus])

  const filterProfiles = () => {
    let filtered = profiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            profile.currentTitle.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(profile.location)
      const matchesCurrentEmployer = selectedCurrentEmployers.length === 0 || selectedCurrentEmployers.includes(profile.currentEmployer)
      const matchesCurrentTitle = selectedCurrentTitles.length === 0 || selectedCurrentTitles.includes(profile.currentTitle)
      const matchesWorkExperience = selectedWorkExperience.length === 0 || selectedWorkExperience.includes(profile.workExperience)
      const matchesCurrentLevel = selectedCurrentLevel.length === 0 || selectedCurrentLevel.includes(profile.currentLevel)
      const matchesHighestDegree = selectedHighestDegree.length === 0 || [profile.education1, profile.education2, profile.education3].some(edu => edu && selectedHighestDegree.includes(edu.degree))
      const matchesMajors = selectedMajors.length === 0 || [profile.education1, profile.education2, profile.education3].some(edu => edu && selectedMajors.includes(edu.major))
      const matchesUniversities = selectedUniversities.length === 0 || [profile.education1, profile.education2, profile.education3].some(edu => edu && selectedUniversities.includes(edu.university))
      const matchesHBCU = !selectedHBCU || (profile.education1 && profile.education1.university.includes('HBCU')) || (profile.education2 && profile.education2.university.includes('HBCU')) || (profile.education3 && profile.education3.university.includes('HBCU'))
      const matchesStrengths = selectedStrengths.length === 0 || selectedStrengths.every(strength => profile.strengths.includes(strength))
      const matchesWillingToRelocate = selectedWillingToRelocate === null || profile.willingToRelocate === selectedWillingToRelocate
      const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(profile.gender)
      const matchesRace = selectedRaces.length === 0 || selectedRaces.includes(profile.race)
      const matchesStartupExperience = selectedStartupExperience.length === 0 || selectedStartupExperience.includes(profile.startupExperience ? 'Yes' : 'No')
      const matchesLanguages = selectedLanguages.length === 0 || selectedLanguages.every(language => profile.languages && profile.languages.includes(language))
      const matchesAthleteStatus = selectedAthleteStatus.length === 0 || selectedAthleteStatus.includes(profile.athleteStatus)
      const matchesVeteranStatus = selectedVeteranStatus.length === 0 || selectedVeteranStatus.includes(profile.veteranStatus)

      return matchesSearch && matchesLocation && matchesCurrentEmployer && matchesCurrentTitle &&
             matchesWorkExperience && matchesCurrentLevel && matchesHighestDegree && matchesMajors &&
             matchesUniversities && matchesHBCU && matchesStrengths &&
             matchesWillingToRelocate && matchesGender && matchesRace &&
             matchesStartupExperience && matchesLanguages && matchesAthleteStatus &&
             matchesVeteranStatus
    })

    filtered.sort((a, b) => sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating)
    setFilteredProfiles(filtered)
  }

  const toggleFilter = (filterName) => {
    setOpenFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }))
  }

  const toggleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc')
    setFilteredProfiles(prev => [...prev].sort((a, b) => sortOrder === 'asc' ? b.rating - a.rating : a.rating - b.rating))
  }

  const handleJobSelection = (job) => {
    setSelectedJob(job)
    setShowMatchPercentage(job !== 'all')
    setIsPopupOpen(false)
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#48bb78'
    if (percentage >= 60) return '#ed8936'
    if (percentage >= 40) return '#ecc94b'
    return '#f56565'
  }

  const renderFilterOptions = (options, selected, setSelected, searchTerm = '') => {
    const filteredOptions = searchTerm
      ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
      : options

    const selectedOptions = filteredOptions.filter(option => selected.includes(option))
    const unselectedOptions = filteredOptions.filter(option => !selected.includes(option))

    return (
      <>
        {selectedOptions.map((option) => (
          <CheckboxLabel key={option}>
            <Checkbox
              type="checkbox"
              checked={true}
              onChange={() => {
                setSelected(selected.filter(item => item !== option))
              }}
            />
            {option}
            <ClearButton onClick={() => setSelected(selected.filter(item => item !== option))}>
              <X size={12} />
            </ClearButton>
          </CheckboxLabel>
        ))}
        {unselectedOptions.map((option) =>

 (
          <CheckboxLabel key={option}>
            <Checkbox
              type="checkbox"
              checked={false}
              onChange={() => {
                setSelected([...selected, option])
              }}
            />
            {option}
          </CheckboxLabel>
        ))}
      </>
    )
  }

  const clearAllFilters = () => {
    setSelectedLocations([])
    setSelectedCurrentEmployers([])
    setSelectedCurrentTitles([])
    setSelectedWorkExperience([])
    setSelectedCurrentLevel([])
    setSelectedHighestDegree([])
    setSelectedMajors([])
    setSelectedUniversities([])
    setSelectedHBCU(false)
    setSelectedStrengths([])
    setSelectedWillingToRelocate(null)
    setSelectedGenders([])
    setSelectedRaces([])
    setSelectedStartupExperience([])
    setSelectedLanguages([])
    setSelectedAthleteStatus([])
    setSelectedVeteranStatus([])
    setOpenFilters({})
  }

  const languageOptions = [
    "English", "Spanish", "Mandarin Chinese", "French", "German", "Japanese", "Russian", "Portuguese", "Arabic", "Hindi",
    "Italian", "Korean", "Dutch", "Turkish", "Swedish", "Polish", "Greek", "Vietnamese", "Hebrew", "Thai",
    "Indonesian", "Danish", "Finnish", "Norwegian", "Czech"
  ]

  const athleteStatusOptions = [
    "Current Collegiate Athlete",
    "Former Collegiate Athlete",
    "Current Professional Athlete",
    "Former Professional Athlete"
  ]

  const raceOptions = [
    "White", "Black", "Asian", "Hispanic", "Native American", "Pacific Islander", "Middle Eastern/Arab"
  ]

  const genderOptions = [
    "Male", "Female", "Non-binary", "Transgender Male", "Transgender Female"
  ]

  const veteranStatusOptions = [
    "Veteran", "Active Duty", "Reservist", "Not a Veteran"
  ]

  const handleProfileClick = (profileId) => {
    navigate(`/js-profile/${profileId}`)
  }

  return (
    <PageWrapper>
      {isPopupOpen && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Choose Job to Source For</PopupTitle>
            <PopupDescription>
              Select a specific job to see match percentages, or view all job seekers.
            </PopupDescription>
            <Select onChange={(e) => handleJobSelection(e.target.value)}>
              <option value="">Select a job</option>
              <option value="Coordinator, Premium Experience & Operations">Coordinator, Premium Experience & Operations</option>
              <option value="all">View All Job Seekers</option>
            </Select>
          </PopupContent>
        </PopupOverlay>
      )}
      <NavWrapper>
        <EmployerNav />
      </NavWrapper>
      <MainContent>
        <Header>Browse Job Seekers {selectedJob && selectedJob !== 'all' && `for ${selectedJob}`}</Header>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search job seekers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={filterProfiles}>
            <Search size={18} />
            Search
          </Button>
        </SearchBar>

        <ContentWrapper>
          <Sidebar>
            <FilterSection>
                <h1>Filters</h1>
              <FilterTitle onClick={() => toggleFilter('gender')}>
                Gender
                {openFilters.gender ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.gender}>
                {renderFilterOptions(genderOptions, selectedGenders, setSelectedGenders)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('race')}>
                Race
                {openFilters.race ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.race}>
                {renderFilterOptions(raceOptions, selectedRaces, setSelectedRaces)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('location')}>
                Location
                {openFilters.location ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.location}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search locations"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
                {renderFilterOptions([
                  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
                  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas,TX", "San Jose, CA",
                  "United States (Remote)", "Atlanta, GA", "Miami, FL", "Seattle, WA", "Boston, MA",
                  "San Francisco, CA", "Denver, CO", "Washington, D.C.", "Nashville, TN", "Austin, TX"
                ], selectedLocations, setSelectedLocations, locationSearch)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('currentEmployer')}>
                Current Employer
                {openFilters.currentEmployer ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.currentEmployer}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search current employers"
                  value={currentEmployerSearch}
                  onChange={(e) => setCurrentEmployerSearch(e.target.value)}
                />
                {renderFilterOptions(Array.from(new Set(profiles.map(p => p.currentEmployer))), selectedCurrentEmployers, setSelectedCurrentEmployers, currentEmployerSearch)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('currentTitle')}>
                Current Title
                {openFilters.currentTitle ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.currentTitle}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search current titles"
                  value={currentTitleSearch}
                  onChange={(e) => setCurrentTitleSearch(e.target.value)}
                />
                {renderFilterOptions(Array.from(new Set(profiles.map(p => p.currentTitle))), selectedCurrentTitles, setSelectedCurrentTitles, currentTitleSearch)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('workExperience')}>
                Work Experience
                {openFilters.workExperience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.workExperience}>
                {renderFilterOptions(['1-2 years', '3-5 years', '6-10 years', '11-15 years', '16+ years'], selectedWorkExperience, setSelectedWorkExperience)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('currentLevel')}>
                Current Level
                {openFilters.currentLevel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.currentLevel}>
                {renderFilterOptions(['Student', 'Assistant/Coordinator', 'Specialist', 'Manager', 'Director', 'SVP/Head of Department'], selectedCurrentLevel, setSelectedCurrentLevel)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('highestDegree')}>
                Highest Degree
                {openFilters.highestDegree ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.highestDegree}>
                {renderFilterOptions(["Associate's Degree", "Bachelor's Degree", "Master's Degree", "MBA", "Ph.D."], selectedHighestDegree, setSelectedHighestDegree)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('majors')}>
                Majors
                {openFilters.majors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.majors}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search majors"
                  value={majorSearch}
                  onChange={(e) => setMajorSearch(e.target.value)}
                />
                {renderFilterOptions(Array.from(new Set(profiles.flatMap(p => [p.education1?.major, p.education2?.major, p.education3?.major].filter(Boolean)))), selectedMajors, setSelectedMajors, majorSearch)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('universities')}>
                Universities
                {openFilters.universities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.universities}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search universities"
                  value={universitySearch}
                  onChange={(e) => setUniversitySearch(e.target.value)}
                />
                {renderFilterOptions(Array.from(new Set(profiles.flatMap(p => [p.education1?.university, p.education2?.university, p.education3?.university].filter(Boolean)))), selectedUniversities, setSelectedUniversities, universitySearch)}
                <NestedFilterContent>
                  <FilterTitle onClick={() => toggleFilter('hbcu')}>
                    HBCU
                    {openFilters.hbcu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </FilterTitle>
                  <FilterContent isOpen={openFilters.hbcu}>
                    <Select
                      value={selectedHBCU ? 'yes' : 'no'}
                      onChange={(e) => setSelectedHBCU(e.target.value === 'yes')}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </Select>
                  </FilterContent>
                </NestedFilterContent>
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('strengths')}>
                Strengths
                {openFilters.strengths ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.strengths}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search strengths"
                  value={strengthSearch}
                  onChange={(e) => setStrengthSearch(e.target.value)}
                />
                {renderFilterOptions([
                  'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability',
                  'Creativity', 'Time Management', 'Critical Thinking', 'Attention to Detail', 'Emotional Intelligence',
                  'Strategic Planning', 'Networking', 'Decision Making', 'Conflict Resolution', 'Analytical Skills',
                  'Project Management', 'Negotiation', 'Public Speaking', 'Customer Service', 'Technical Proficiency',
                  'Data Analysis', 'Research', 'Writing', 'Multitasking', 'Sales',
                  'Marketing', 'Budgeting', 'Coaching', 'Innovation', 'Interpersonal Skills'
                ], selectedStrengths, setSelectedStrengths, strengthSearch)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('willingToRelocate')}>
                Willing to Relocate
                {openFilters.willingToRelocate ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.willingToRelocate}>
                <Select
                  value={selectedWillingToRelocate === null ? '' : selectedWillingToRelocate.toString()}
                  onChange={(e) => setSelectedWillingToRelocate(e.target.value === '' ? null : e.target.value === 'true')}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('startupExperience')}>
                Startup Experience
                {openFilters.startupExperience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.startupExperience}>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={selectedStartupExperience.includes('Yes')}
                    onChange={() => {
                      if (selectedStartupExperience.includes('Yes')) {
                        setSelectedStartupExperience(selectedStartupExperience.filter(item => item !== 'Yes'))
                      } else {
                        setSelectedStartupExperience([...selectedStartupExperience, 'Yes'])
                      }
                    }}
                  />
                  Yes
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={selectedStartupExperience.includes('No')}
                    onChange={() => {
                      if (selectedStartupExperience.includes('No')) {
                        setSelectedStartupExperience(selectedStartupExperience.filter(item => item !== 'No'))
                      } else {
                        setSelectedStartupExperience([...selectedStartupExperience, 'No'])
                      }
                    }}
                  />
                  No
                </CheckboxLabel>
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('languages')}>
                Languages
                {openFilters.languages ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.languages}>
                <FilterSearchInput
                  type="text"
                  placeholder="Search languages"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase()
                    const filteredOptions = languageOptions.filter(lang => lang.toLowerCase().includes(searchTerm))
                    renderFilterOptions(filteredOptions, selectedLanguages, setSelectedLanguages)
                  }}
                />
                {renderFilterOptions(languageOptions, selectedLanguages, setSelectedLanguages)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('athleteStatus')}>
                Athlete Status
                {openFilters.athleteStatus ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.athleteStatus}>
                {renderFilterOptions(athleteStatusOptions, selectedAthleteStatus, setSelectedAthleteStatus)}
              </FilterContent>
            </FilterSection>

            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('veteranStatus')}>
                Veteran Status
                {openFilters.veteranStatus ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              <FilterContent isOpen={openFilters.veteranStatus}>
                {renderFilterOptions(veteranStatusOptions, selectedVeteranStatus, setSelectedVeteranStatus)}
              </FilterContent>
            </FilterSection>

            <ButtonGroup>
              <Button onClick={() => {}}>
                <Save size={18} />
                Save
              </Button>
              <Button onClick={clearAllFilters}>
                Clear
              </Button>
            </ButtonGroup>
          </Sidebar>

          <div>
            <SortContainer>
              <SortButton onClick={toggleSort}>
                <ArrowUpDown size={18} />
                Sort by {showMatchPercentage ? 'Match' : 'Relevance'} {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
              </SortButton>
            </SortContainer>
            <JobSeekerList>
              <h2>All Job Seekers ({filteredProfiles.length})</h2>
              {filteredProfiles.map((profile) => (
                <JobSeekerCard key={profile.id} onClick={() => handleProfileClick(profile.id)}>
                  <User size={24} />
                  <JobSeekerInfo>
                    <JobSeekerName>{profile.name}</JobSeekerName>
                    <JobSeekerDetails>{profile.currentTitle} at {profile.currentEmployer}</JobSeekerDetails>
                    <JobSeekerDetails>{profile.location} • {profile.workExperience} • {profile.currentLevel}</JobSeekerDetails>
                    <TagList>
                      {profile.education1 && (
                        <Tag>{profile.education1.degree} in {profile.education1.major}</Tag>
                      )}
                      <Tag>{profile.workPreference}</Tag>
                      {profile.willingToRelocate && <Tag>Willing to Relocate</Tag>}
                    </TagList>
                  </JobSeekerInfo>
                  {showMatchPercentage && (
                    <MatchPercentage color={getMatchColor(profile.rating)}>
                      {profile.rating}% Match
                    </MatchPercentage>
                  )}
                </JobSeekerCard>
              ))}
            </JobSeekerList>
          </div>
        </ContentWrapper>
      </MainContent>
    </PageWrapper>
  )
}
