import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Search, Save, ChevronDown, ChevronUp } from 'lucide-react'
import JobSeekerNav from './JobSeekerNav'
import { useNavigate } from 'react-router-dom';
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
  background-color: #48bb78;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
  display: inline-block;
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
const ScrollableList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`

const SubcategorySearch = styled(SearchInput)`
  margin-bottom: 0.5rem;
`


const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`

const TooltipContent = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`
const JobTitleWrapper = styled.div`
  display: flex;
 flex-direction: row;
  justify-content: space-between;
`
export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSalaries, setSelectedSalaries] = useState([])
  const [selectedExperiences, setSelectedExperiences] = useState([])
  const [selectedWorkPreferences, setSelectedWorkPreferences] = useState([])
  const [selectedTitles, setSelectedTitles] = useState([])
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedJobLevels, setSelectedJobLevels] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPostedDate, setSelectedPostedDate] = useState('')
  const [selectedBenefits, setSelectedBenefits] = useState([])
  const [sortOption, setSortOption] = useState('relevant')
  const [filteredJobs, setFilteredJobs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [savedFilters, setSavedFilters] = useState({})
  const [openFilters, setOpenFilters] = useState({})
  const [subcategorySearch, setSubcategorySearch] = useState('')
  const [titleSearch, setTitleSearch] = useState('')
  const [benefitsSearch, setBenefitsSearch] = useState('')
  const navigate = useNavigate()

  const salaryRanges = [
    "Under $30,000", "$30,000 - $50,000", "$50,000 - $70,000", "$70,000 - $90,000",
    "$90,000 - $110,000", "$110,000 - $130,000", "$130,000 - $150,000", "$150,000+"
  ]

  const experienceLevels = [
    "Entry Level", "1-2 Years", "3-5 Years", "6-8 Years", "9-11 Years", "12+ Years"
  ]

  const industries = ["Sports", "Media", "Entertainment", "Fashion"]

  const allSubcategories = [
    // Sports
    "Professional Sports", "College Sports", "E-Sports", "Sports Technology",
    "Sports Marketing", "Sports Management", "Sports Medicine", "Fitness",
    // Media
    "Broadcast Media", "Digital Media", "Publishing", "Advertising",
    "Journalism", "Social Media", "Streaming Services", "Podcasting",
    // Entertainment
    "Film Production", "Music", "Gaming", "Live Events",
    "Theater", "Animation", "Virtual Reality", "Theme Parks",
    // Fashion
    "Luxury Fashion", "Streetwear", "Sportswear", "Fashion Technology",
    "Sustainable Fashion", "Accessories", "Cosmetics", "Fashion Media"
  ]

  const jobTitles = [
    "Software Engineer", "Data Analyst", "Product Manager", "Marketing Specialist",
    "Sales Representative", "Human Resources Manager", "Financial Analyst",
    "Graphic Designer", "Content Writer", "Customer Service Representative",
    "Project Manager", "Business Analyst", "UX/UI Designer", "Operations Manager",
    "Account Executive", "Social Media Manager", "Data Scientist", "DevOps Engineer",
    "Quality Assurance Tester", "Network Administrator"
  ]

  const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"]

  const jobLevels = [
    "Entry Level", "Junior", "Mid-Level", "Senior", "Lead", "Manager", "Director", "Executive"
  ]

  const postedDates = [
    "Last 24 hours", "Last 48 hours", "Last 7 days", "Last 2 weeks", "Last 30 days"
  ]

  const benefits = [
    "Health Insurance", "Dental Insurance", "Vision Insurance", "401(k)", "Paid Time Off",
    "Remote Work Options", "Flexible Schedule", "Professional Development",
    "Tuition Reimbursement", "Gym Membership", "Company Phone", "Company Car",
    "Stock Options", "Performance Bonus", "Signing Bonus", "Relocation Assistance",
    "Parental Leave", "Child Care", "Pet Insurance", "Commuter Benefits"
  ]

  const jobs = [
    {
      id: 1,
      title: "Chief Technology Officer",
      company: "Arena Talent",
      logo: "/images/black-logo.png",
      location: "Remote",
      salary: "$130,000 - $150,000",
      experience: "6-8 Years",
      workPreference: "Remote",
      industry: "Sports",
      subcategory: "Sports Technology",
      employmentType: "Full-time",
      jobLevel: "Executive",
      description: "We are seeking a talented CTO to join our dynamic team...",
      postedDate: "2023-06-15",
      benefits: ["Health Insurance", "401(k)", "Remote Work Options", "Stock Options"],
      matchPercentage: 96,
      matchReason: "Your skills and experience closely align with our requirements.",
    },
    // Add more job data here...
  ]

  useEffect(() => {
    filterJobs()
    loadSavedFilters()
  }, [searchTerm, selectedSalaries, selectedExperiences, selectedWorkPreferences, selectedTitles, selectedIndustries, selectedSubcategories, selectedEmploymentTypes, selectedJobLevels, selectedLocation, selectedPostedDate, selectedBenefits, sortOption])

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSalary = selectedSalaries.length === 0 || selectedSalaries.includes(job.salary)
      const matchesExperience = selectedExperiences.length === 0 || selectedExperiences.includes(job.experience)
      const matchesWorkPreference = selectedWorkPreferences.length === 0 || selectedWorkPreferences.includes(job.workPreference)
      const matchesTitle = selectedTitles.length === 0 || selectedTitles.includes(job.title)
      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(job.industry)
      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(job.subcategory)
      const matchesEmploymentType = selectedEmploymentTypes.length === 0 || selectedEmploymentTypes.includes(job.employmentType)
      const matchesJobLevel = selectedJobLevels.length === 0 || selectedJobLevels.includes(job.jobLevel)
      const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      const matchesPostedDate = !selectedPostedDate || isWithinDateRange(job.postedDate, selectedPostedDate)
      const matchesBenefits = selectedBenefits.length === 0 || selectedBenefits.every(benefit => job.benefits.includes(benefit))

      return matchesSearch && matchesSalary && matchesExperience && matchesWorkPreference &&
             matchesTitle && matchesIndustry && matchesSubcategory && matchesEmploymentType &&
             matchesJobLevel && matchesLocation && matchesPostedDate && matchesBenefits
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

  const isWithinDateRange = (postedDate, selectedRange) => {
    const jobDate = new Date(postedDate)
    const currentDate = new Date()
    const timeDiff = currentDate.getTime() - jobDate.getTime()
    const daysDiff = timeDiff / (1000 * 3600 * 24)

    switch (selectedRange) {
      case "Last 24 hours":
        return daysDiff <= 1
      case "Last 48 hours":
        return daysDiff <= 2
      case "Last 7 days":
        return daysDiff <= 7
      case "Last 2 weeks":
        return daysDiff <= 14
      case "Last 30 days":
        return daysDiff <= 30
      default:
        return true
    }
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
        selectedWorkPreferences,
        selectedTitles,
        selectedIndustries,
        selectedSubcategories,
        selectedEmploymentTypes,
        selectedJobLevels,
        selectedLocation,
        selectedPostedDate,
        selectedBenefits
      }
      const updatedFilters = { ...savedFilters, [filterName]: filterCriteria }
      localStorage.setItem('savedJobFilters', JSON.stringify(updatedFilters))
      setSavedFilters(updatedFilters)
      setIsModalOpen(false)
      setFilterName('')
    }
  }

  const toggleFilter = (filterName) => {
    setOpenFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }))
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

  const filteredSubcategories = allSubcategories.filter(subcat =>
    subcat.toLowerCase().includes(subcategorySearch.toLowerCase())
  )

  const filteredJobTitles = jobTitles.filter(title =>
    title.toLowerCase().includes(titleSearch.toLowerCase())
  )

  const filteredBenefits = benefits.filter(benefit =>
    benefit.toLowerCase().includes(benefitsSearch.toLowerCase())
  )

  const handleJobClick = (jobId) => {
    navigate(`/job-posting1`)
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
                {openFilters['salary'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['salary'] && (
                <FilterContent>
                  {salaryRanges.map(range => (
                    <CheckboxLabel key={range}>
                      <input
                        type="checkbox"
                        checked={selectedSalaries.includes(range)}
                        onChange={() => handleCheckboxChange(setSelectedSalaries, range)}
                      />
                      {range}
                    </CheckboxLabel>
                  ))}
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('experience')}>
                <FilterTitle>Experience</FilterTitle>
                {openFilters['experience'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['experience'] && (
                <FilterContent>
                  {experienceLevels.map(level => (
                    <CheckboxLabel key={level}>
                      <input
                        type="checkbox"
                        checked={selectedExperiences.includes(level)}
                        onChange={() => handleCheckboxChange(setSelectedExperiences, level)}
                      />
                      {level}
                    </CheckboxLabel>
                  ))}
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('jobTitle')}>
                <FilterTitle>Job Title</FilterTitle>
                {openFilters['jobTitle'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['jobTitle'] && (
                <FilterContent>
                  <SubcategorySearch
                    type="text"
                    placeholder="Search job titles"
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                  />
                  <ScrollableList>
                    {filteredJobTitles.map(title => (
                      <CheckboxLabel key={title}>
                        <input
                          type="checkbox"
                          checked={selectedTitles.includes(title)}
                          onChange={() => handleCheckboxChange(setSelectedTitles, title)}
                        />
                        {title}
                      </CheckboxLabel>
                    ))}
                  </ScrollableList>
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('industry')}>
                <FilterTitle>Industry</FilterTitle>
                {openFilters['industry'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['industry'] && (
                <FilterContent>
                  {industries.map(industry => (
                    <CheckboxLabel key={industry}>
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => handleCheckboxChange(setSelectedIndustries, industry)}
                      />
                      {industry}
                    </CheckboxLabel>
                  ))}
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('subcategories')}>
                <FilterTitle>Subcategories</FilterTitle>
                {openFilters['subcategories'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['subcategories'] && (
                <FilterContent>
                  <SubcategorySearch
                    type="text"
                    placeholder="Search subcategories"
                    value={subcategorySearch}
                    onChange={(e) => setSubcategorySearch(e.target.value)}
                  />
                  <ScrollableList>
                    {filteredSubcategories.map(subcat => (
                      <CheckboxLabel key={subcat}>
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcat)}
                          onChange={() => handleCheckboxChange(setSelectedSubcategories, subcat)}
                        />
                        {subcat}
                      </CheckboxLabel>
                    ))}
                  </ScrollableList>
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('employmentType')}>
                <FilterTitle>Employment Type</FilterTitle>
                {openFilters['employmentType'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['employmentType'] && (
                <FilterContent>
                  {employmentTypes.map(type => (
                    <CheckboxLabel key={type}>
                      <input
                        type="checkbox"
                        checked={selectedEmploymentTypes.includes(type)}
                        onChange={() => handleCheckboxChange(setSelectedEmploymentTypes, type)}
                      />
                      {type}
                    </CheckboxLabel>
                  ))}
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('jobLevel')}>
                <FilterTitle>Job Level</FilterTitle>
                {openFilters['jobLevel'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['jobLevel'] && (
                <FilterContent>
                  {jobLevels.map(level => (
                    <CheckboxLabel key={level}>
                      <input
                        type="checkbox"
                        checked={selectedJobLevels.includes(level)}
                        onChange={() => handleCheckboxChange(setSelectedJobLevels, level)}
                      />
                      {level}
                    </CheckboxLabel>
                  ))}
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('location')}>
                <FilterTitle>Location</FilterTitle>
                {openFilters['location'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['location'] && (
                <FilterContent>
                  <SearchInput
                    type="text"
                    placeholder="Enter location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('postedDate')}>
                <FilterTitle>Posted Date</FilterTitle>
                {openFilters['postedDate'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['postedDate'] && (
                <FilterContent>
                  <Select value={selectedPostedDate} onChange={(e) => setSelectedPostedDate(e.target.value)}>
                    <option value="">Any time</option>
                    {postedDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </Select>
                </FilterContent>
              )}
            </FilterSection>

            <FilterSection>
              <FilterHeader onClick={() => toggleFilter('benefits')}>
                <FilterTitle>Benefits</FilterTitle>
                {openFilters['benefits'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterHeader>
              {openFilters['benefits'] && (
                <FilterContent>
                  <SubcategorySearch
                    type="text"
                    placeholder="Search benefits"
                    value={benefitsSearch}
                    onChange={(e) => setBenefitsSearch(e.target.value)}
                  />
                  <ScrollableList>
                    {filteredBenefits.map(benefit => (
                      <CheckboxLabel key={benefit}>
                        <input
                          type="checkbox"
                          checked={selectedBenefits.includes(benefit)}
                          onChange={() => handleCheckboxChange(setSelectedBenefits, benefit)}
                        />
                        {benefit}
                      </CheckboxLabel>
                    ))}
                  </ScrollableList>
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
                <JobInfo>
                  <CompanyLogo src={job.logo} alt={`${job.company} logo`} />
                  <JobDetails>
                    <JobTitleWrapper>

                      <JobTitle>{job.title}</JobTitle>
                      <TooltipWrapper>
                        <MatchPercentage>
                          {job.matchPercentage}% Match
                        </MatchPercentage>
                        <TooltipContent>
                          {job.matchReason}
                        </TooltipContent>
                      </TooltipWrapper>
                    </JobTitleWrapper>
                    <JobMetaInfo>{job.company} • {job.location}</JobMetaInfo>
                    <JobMetaInfo>{job.salary} • {job.experience} • {job.workPreference}</JobMetaInfo>
                    <JobDescription>{job.description.substring(0, 100)}...</JobDescription>
                    <TagList>
                      <Tag>{job.industry}</Tag>
                      <Tag>{job.subcategory}</Tag>
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
            <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  )
}
