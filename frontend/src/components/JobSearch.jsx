import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Search, Save, ChevronDown, ChevronUp } from 'lucide-react'
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

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
`

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a5568;
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 1rem;
  color: #4a5568;

  &:focus {
    outline: none;
    border-color: #4a5568;
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`

const PopularSearches = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 2rem;
`

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
`

const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
`

const FilterTitle = styled.h3`
  font-weight: 600;
  font-size: 1rem;
  color: #2d3748;
`

const FilterContent = styled.div`
  margin-top: 0.5rem;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
  }
`

const JobList = styled.div`
  flex-grow: 1;
`

const JobListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const JobCard = styled.div`
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: white;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const JobInfo = styled.div`
  display: flex;
  gap: 1.5rem;
`

const CompanyLogo = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 0.375rem;
`

const JobDetails = styled.div`
  flex: 1;
`

const JobTitle = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
`

const JobMetaInfo = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
`

const JobDescription = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span`
  background-color: #edf2f7;
  color: #4a5568;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`

const MatchPercentage = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #48bb78;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  cursor: help;
`

const SaveFilterButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #2c5282;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 300px;
`

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
`

const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`

const ModalButton = styled(Button)`
  margin-right: 0.5rem;
`

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSalaries, setSelectedSalaries] = useState([])
  const [selectedExperiences, setSelectedExperiences] = useState([])
  const [selectedWorkFromHome, setSelectedWorkFromHome] = useState([])
  const [selectedTitles, setSelectedTitles] = useState([])
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedJobLevels, setSelectedJobLevels] = useState([])
  const [sortOption, setSortOption] = useState('relevant')
  const [filteredJobs, setFilteredJobs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [savedFilters, setSavedFilters] = useState({})
  const [expandedFilters, setExpandedFilters] = useState({
    salary: true,
    experience: true,
    workFromHome: true,
    title: true,
    industry: true,
    employmentType: true,
    jobLevel: true,
  })

  const jobs = [
    {
      id: 1,
      title: "Chief Technology Officer",
      company: "Arena Talent",
      logo: "/images/black-logo.png",
      location: "Remote",
      salary: "$120,000 - $150,000",
      experience: "3-5 years",
      workFromHome: "Remote",
      industry: "Technology",
      employmentType: "Full-time",
      jobLevel: "Senior-level",
      description: "We are seeking a talented CTO to join our dynamic team...",
      postedDate: "2023-06-15",
      matchPercentage: 96,
      matchReason: "Your skills and experience closely align with our requirements.",
    },
  ]

  useEffect(() => {
    filterJobs()
    loadSavedFilters()
  }, [searchTerm, selectedSalaries, selectedExperiences, selectedWorkFromHome, selectedTitles, selectedIndustries, selectedEmploymentTypes, selectedJobLevels, sortOption])

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSalary = selectedSalaries.length === 0 || selectedSalaries.includes(job.salary)
      const matchesExperience = selectedExperiences.length === 0 || selectedExperiences.includes(job.experience)
      const matchesWorkFromHome = selectedWorkFromHome.length === 0 || selectedWorkFromHome.includes(job.workFromHome)
      const matchesTitle = selectedTitles.length === 0 || selectedTitles.includes(job.title)
      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(job.industry)
      const matchesEmploymentType = selectedEmploymentTypes.length === 0 || selectedEmploymentTypes.includes(job.employmentType)
      const matchesJobLevel = selectedJobLevels.length === 0 || selectedJobLevels.includes(job.jobLevel)

      return matchesSearch && matchesSalary && matchesExperience && matchesWorkFromHome &&
             matchesTitle && matchesIndustry && matchesEmploymentType && matchesJobLevel
    })

    filtered.sort((a, b) => {
      if (sortOption === 'recent') {
        return new Date(b.postedDate) - new Date(a.postedDate)
      } else if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      return 0 // 'relevant' sorting would typically involve more complex logic
    })

    setFilteredJobs(filtered)
  }

  const loadSavedFilters = () => {
    const filters = JSON.parse(localStorage.getItem('savedJobFilters') || '{}')
    setSavedFilters(filters)
  }

  const handleSaveFilters = () => {
    setIsModalOpen(true)
  }

  const handleModalSubmit = () => {
    if (filterName) {
      const filterCriteria = {
        selectedSalaries,
        selectedExperiences,
        selectedWorkFromHome,
        selectedTitles,
        selectedIndustries,
        selectedEmploymentTypes,
        selectedJobLevels,
      }
      const updatedFilters = { ...savedFilters, [filterName]: filterCriteria }
      localStorage.setItem('savedJobFilters', JSON.stringify(updatedFilters))
      setSavedFilters(updatedFilters)
      setIsModalOpen(false)
      setFilterName('')
      alert('Great! These filters have been saved.')
    }
  }

  const handleJobClick = (jobId) => {
    console.log(`Clicked job with id: ${jobId}`)
  }

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }))
  }

  const handleCheckboxChange = (setter, value) => {
    setter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  return (
    <PageWrapper>
      <NavWrapper>
        <JobSeekerNav />
      </NavWrapper>
      <MainContent>
        <Header>
          <Title>Browse Jobs</Title>
        </Header>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="relevant">Most relevant</option>
            <option value="recent">Most recent</option>
            <option value="alphabetical">Alphabetical</option>
          </Select>
          <Button onClick={filterJobs}>
            <Search size={18} />
            Search
          </Button>
        </SearchBar>

        <PopularSearches>
          Popular: Software Engineer, Marketing Manager, Data Analyst, Product Manager
        </PopularSearches>

        <ContentWrapper>
          <Sidebar>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('salary')}>
                <FilterTitle>Salary</FilterTitle>
                {expandedFilters.salary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.salary && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedSalaries.includes("$50,000 - $75,000")}
                      onChange={() => handleCheckboxChange(setSelectedSalaries, "$50,000 - $75,000")}
                    />
                    $50,000 - $75,000
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedSalaries.includes("$75,000 - $100,000")}
                      onChange={() => handleCheckboxChange(setSelectedSalaries, "$75,000 - $100,000")}
                    />
                    $75,000 - $100,000
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedSalaries.includes("$100,000+")}
                      onChange={() => handleCheckboxChange(setSelectedSalaries, "$100,000+")}
                    />
                    $100,000+
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('experience')}>
                <FilterTitle>Experience</FilterTitle>
                {expandedFilters.experience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.experience && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedExperiences.includes("Entry-level")}
                      onChange={() => handleCheckboxChange(setSelectedExperiences, "Entry-level")}
                    />
                    Entry-level
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedExperiences.includes("3-5 years")}
                      onChange={() => handleCheckboxChange(setSelectedExperiences, "3-5 years")}
                    />
                    3-5 years
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedExperiences.includes("5+ years")}
                      onChange={() => handleCheckboxChange(setSelectedExperiences, "5+ years")}
                    />
                    5+ years
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('workFromHome')}>
                <FilterTitle>Work From Home</FilterTitle>
                {expandedFilters.workFromHome ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.workFromHome && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedWorkFromHome.includes("Remote")}
                      onChange={() => handleCheckboxChange(setSelectedWorkFromHome, "Remote")}
                    />
                    Remote
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedWorkFromHome.includes("Hybrid")}
                      onChange={() => handleCheckboxChange(setSelectedWorkFromHome, "Hybrid")}
                    />
                    Hybrid
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedWorkFromHome.includes("In-office")}
                      onChange={() => handleCheckboxChange(setSelectedWorkFromHome, "In-office")}
                    />
                    In-office
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('title')}>
                <FilterTitle>Job Title</FilterTitle>
                {expandedFilters.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.title && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedTitles.includes("Software Engineer")}
                      onChange={() => handleCheckboxChange(setSelectedTitles, "Software Engineer")}
                    />
                    Software Engineer
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedTitles.includes("Marketing Manager")}
                      onChange={() => handleCheckboxChange(setSelectedTitles, "Marketing Manager")}
                    />
                    Marketing Manager
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('industry')}>
                <FilterTitle>Industry</FilterTitle>
                {expandedFilters.industry ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.industry && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes("Technology")}
                      onChange={() => handleCheckboxChange(setSelectedIndustries, "Technology")}
                    />
                    Technology
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes("Marketing")}
                      onChange={() => handleCheckboxChange(setSelectedIndustries, "Marketing")}
                    />
                    Marketing
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('employmentType')}>
                <FilterTitle>Employment Type</FilterTitle>
                {expandedFilters.employmentType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.employmentType && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedEmploymentTypes.includes("Full-time")}
                      onChange={() => handleCheckboxChange(setSelectedEmploymentTypes, "Full-time")}
                    />
                    Full-time
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedEmploymentTypes.includes("Part-time")}
                      onChange={() => handleCheckboxChange(setSelectedEmploymentTypes, "Part-time")}
                    />
                    Part-time
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('jobLevel')}>
                <FilterTitle>Job Level</FilterTitle>
                {expandedFilters.jobLevel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {expandedFilters.jobLevel && (
                <FilterContent>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedJobLevels.includes("Entry-level")}
                      onChange={() => handleCheckboxChange(setSelectedJobLevels, "Entry-level")}
                    />
                    Entry-level
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedJobLevels.includes("Mid-level")}
                      onChange={() => handleCheckboxChange(setSelectedJobLevels, "Mid-level")}
                    />
                    Mid-level
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedJobLevels.includes("Senior")}
                      onChange={() => handleCheckboxChange(setSelectedJobLevels, "Senior")}
                    />
                    Senior
                  </CheckboxLabel>
                </FilterContent>
              )}
            </FilterSection>
            <SaveFilterButton onClick={handleSaveFilters}>
              <Save size={18} />
              Save Filter
            </SaveFilterButton>
          </Sidebar>

          <JobList>
            <JobListHeader>
              <h2>All Jobs ({filteredJobs.length})</h2>
            </JobListHeader>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} onClick={() => handleJobClick(job.id)}>
                <MatchPercentage title={job.matchReason}>
                  {job.matchPercentage}% Match
                </MatchPercentage>
                <JobInfo>
                  <CompanyLogo src={job.logo} alt={`${job.company} logo`} />
                  <JobDetails>
                    <JobTitle>{job.title}</JobTitle>
                    <JobMetaInfo>{job.company} • {job.location}</JobMetaInfo>
                    <JobMetaInfo>{job.salary} • {job.experience} • {job.workFromHome}</JobMetaInfo>
                    <JobDescription>{job.description.substring(0, 100)}...</JobDescription>
                    <TagList>
                      <Tag>{job.industry}</Tag>
                      <Tag>{job.employmentType}</Tag>
                      <Tag>{job.jobLevel}</Tag>
                    </TagList>
                  </JobDetails>
                </JobInfo>
              </JobCard>
            ))}
          </JobList>
        </ContentWrapper>
      </MainContent>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>Name this filter to save</ModalTitle>
            <ModalInput
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter filter name"
            />
            <ModalButton onClick={handleModalSubmit}>Submit</ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#718096' }}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  )
}
