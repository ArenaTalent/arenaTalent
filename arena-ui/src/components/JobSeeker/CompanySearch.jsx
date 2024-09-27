import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Search, Save, ChevronDown, ChevronUp } from 'lucide-react'
import JobSeekerNav from './JobSeekerNav'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
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

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d3748;
  }
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

const SearchButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4299e1;

  &:hover {
    background-color: #3182ce;
  }
`
const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
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

const FilterTitle = styled.h3`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #2d3748;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
  }
`

const CompanyList = styled.div`
  flex-grow: 1;
`

const CompanyListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const CompanyCard = styled.div`
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

const PartnerBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #9f7aea;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`

const CompanyInfo = styled.div`
  display: flex;
  gap: 1.5rem;
`

const CompanyLogo = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: contain;
  border-radius: 0.375rem;
`

const CompanyDetails = styled.div`
  flex: 1;
`

const CompanyName = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
`

const JobCount = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
`

const CompanyDescription = styled.p`
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

const FilterButton = styled(Button)`
  margin-top: 1rem;
`

const SaveFilterButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: black;
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

const SavedFiltersDropdown = styled(Select)`
  margin-top: 1rem;
  width: 100%;
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

export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedWorkPreferences, setSelectedWorkPreferences] = useState([])
  const [selectedTopRankings, setSelectedTopRankings] = useState([])
  const [showOnlyHiring, setShowOnlyHiring] = useState(false)
  const [showOnlyArenaPartners, setShowOnlyArenaPartners] = useState(false)
  const [sortOption, setSortOption] = useState('relevant')
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [savedFilters, setSavedFilters] = useState({})
  const [selectedSavedFilter, setSelectedSavedFilter] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [jobPostings, setJobPostings] = useState('')
  const [hiresFromArena, setHiresFromArena] = useState('')
  const [openFilters, setOpenFilters] = useState({})
  const [subcategorySearch, setSubcategorySearch] = useState('')

  const industries = [
    "Sports", "Media", "Entertainment", "Fashion"
  ]



  const allSubcategories = [
    // Sports
    "Professional Sports", "College Sports", "E-Sports", "Sports Technology",
    "Sports Marketing", "Sports Management", "Sports Medicine", "Fitness",
    "Outdoor Sports", "Recreational Sports", "Sports Analytics", "Youth Sports",
    "Athlete Representation", "Stadium Operations", "Event Management",
    "Sports Sponsorships", "Sports Broadcasting", "Fan Engagement", "Team Operations",

    // Media
    "Broadcast Media", "Digital Media", "Publishing", "Advertising",
    "Journalism", "Social Media", "Streaming Services", "Podcasting",
    "Film Journalism", "Investigative Reporting", "Public Relations", "Content Creation",
    "Media Buying", "Media Planning", "News Production", "Multimedia Journalism",
    "Interactive Media", "Community Management", "Influencer Marketing",

    // Entertainment
    "Film Production", "Music", "Gaming", "Live Events",
    "Theater", "Animation", "Virtual Reality", "Theme Parks",
    "Television Production", "Documentary Filmmaking", "Concert Promotion", "Talent Management",
    "Celebrity Management", "Film Distribution", "Cinematography", "Sound Design",
    "Set Design", "Voice Acting", "Content Distribution", "Entertainment Law",
    "Reality TV", "Music Production", "Film Scoring", "Comedy",

    // Fashion
    "Luxury Fashion", "Streetwear", "Sportswear", "Fashion Technology",
    "Sustainable Fashion", "Accessories", "Cosmetics", "Fashion Media",
    "Apparel Design", "Textile Design", "Retail Fashion", "Fashion Merchandising",
    "Fashion Photography", "Fashion Blogging", "Runway Shows", "Fashion Buying",
    "E-commerce Fashion", "Fashion Consulting", "Pattern Making", "Fashion Illustration",
    "Costume Design", "Footwear Design", "Fashion PR", "Jewelry Design"
  ]
  const workPreferences = ["Remote", "Hybrid", "In Office"]

  const topRankings = ["Work Life Balance", "Application process", "Salary", "Work Place Diversity"]

  const companySizes = ["1-50", "51-200", "201-500", "501-1000", "1000+"]

  const jobPostingsRanges = ["1-5", "6-20", "21-50", "51-100", "100+"]

  const hiresFromArenaRanges = ["1-5", "6-20", "21-50", "51-100", "100+"]

  const companies = [
    {
      name: "Arena Talent",
      logo: "/images/black-logo.png",
      jobCount: 5,
      location: "Remote",
      description: "Arena connects employers with top talent in sports, media, and entertainment using AI to power transparency and equity in the hiring process",
      tags: ["Technology", "Sports", "Entertainment", "Media"],
      isHiring: true,
      isArenaPartner: false,
      workPreference: "Remote",
      topRankings: {
        "Work Life Balance": 95,
        "Application process": 90,
        "Salary": 85,
        "Work Place Diversity": 95
      },
      size: "1-50",
      jobPostings: 5,
      hiresFromArena: 10
    },
    // Add more company data here...
  ]

  useEffect(() => {
    filterCompanies()
    loadSavedFilters()
  }, [searchTerm, selectedIndustries, selectedLocation, selectedWorkPreferences, selectedTopRankings, showOnlyHiring, showOnlyArenaPartners, sortOption, companySize, jobPostings, hiresFromArena])

  const filterCompanies = () => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            company.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesIndustries = selectedIndustries.length === 0 || company.tags.some(tag => selectedIndustries.includes(tag))
      const matchesLocation = !selectedLocation || company.location.toLowerCase().includes(selectedLocation.toLowerCase())
      const matchesWorkPreference = selectedWorkPreferences.length === 0 || selectedWorkPreferences.includes(company.workPreference)
      const matchesHiring = !showOnlyHiring || company.isHiring
      const matchesArenaPartner = !showOnlyArenaPartners || company.isArenaPartner
      const matchesTopRankings = selectedTopRankings.length === 0 || selectedTopRankings.every(ranking => company.topRankings[ranking] >= 80)
      const matchesCompanySize = !companySize || company.size === companySize
      const matchesJobPostings = !jobPostings || (company.jobPostings >= parseInt(jobPostings.split('-')[0]) && company.jobPostings <= parseInt(jobPostings.split('-')[1] || Infinity))
      const matchesHiresFromArena = !hiresFromArena || (company.hiresFromArena >= parseInt(hiresFromArena.split('-')[0]) && company.hiresFromArena <= parseInt(hiresFromArena.split('-')[1] || Infinity))

      return matchesSearch && matchesIndustries && matchesLocation && matchesWorkPreference && matchesHiring && matchesArenaPartner && matchesTopRankings && matchesCompanySize && matchesJobPostings && matchesHiresFromArena
    })

    filtered.sort((a, b) => {
      if (sortOption === 'recent') {
        return b.jobCount - a.jobCount
      } else if (sortOption === 'alphabetical') {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

    setFilteredCompanies(filtered)
  }

  const loadSavedFilters = () => {
    const filters = JSON.parse(localStorage.getItem('savedFilters') || '{}')
    setSavedFilters(filters)
  }

  const handleSaveFilters = () => {
    setIsModalOpen(true)
  }

  const handleModalSubmit = () => {
    if (filterName) {
      const filterCriteria = {
        selectedIndustries,
        selectedLocation,
        selectedWorkPreferences,
        selectedTopRankings,
        showOnlyHiring,
        showOnlyArenaPartners,
        companySize,
        jobPostings,
        hiresFromArena
      }
      const updatedFilters = { ...savedFilters, [filterName]: filterCriteria }
      localStorage.setItem('savedFilters', JSON.stringify(updatedFilters))
      setSavedFilters(updatedFilters)
      setIsModalOpen(false)
      setFilterName('')
    }
  }

  const toggleFilter = (filterName) => {
    setOpenFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }))
  }
  const filteredSubcategories = allSubcategories.filter(subcat =>
    subcat.toLowerCase().includes(subcategorySearch.toLowerCase())
  )
  return (
    <PageWrapper>
       <NavWrapper>
        <JobSeekerNav />
      </NavWrapper>
      <MainContent>
        <Header>
          <Title>🏟 Browse Companies Attending MSBC </Title>
        </Header>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Company Name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="recent">Most Recent Job Postings</option>
            <option value="alphabetical">Alphabetical</option>
          </Select>
          <SearchButton onClick={filterCompanies}>
            <Search size={18} />
            Search
          </SearchButton>
        </SearchBar>

        <PopularSearches>
          Popular : Ocatgon, Endeavor, Chicago Cubs, Vox Media
        </PopularSearches>

        <ContentWrapper>
          <Sidebar>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('industry')}>
                Industry
                {openFilters['industry'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['industry'] && industries.map((industry) => (
                <CheckboxLabel key={industry}>
                  <input
                    type="checkbox"
                    checked={selectedIndustries.includes(industry)}
                    onChange={() => {
                      setSelectedIndustries(prev =>
                        prev.includes(industry)
                          ? prev.filter(i => i !== industry)
                          : [...prev, industry]
                      )
                    }}
                  />
                  {industry}
                </CheckboxLabel>
              ))}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('subcategories')}>
                Subcategories
                {openFilters['subcategories'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['subcategories'] && (
                <>
                  <SubcategorySearch
                    type="text"
                    placeholder="Search subcategories"
                    value={subcategorySearch}
                    onChange={(e) => setSubcategorySearch(e.target.value)}
                  />
                  <ScrollableList>
                    {filteredSubcategories.map((subcat) => (
                      <CheckboxLabel key={subcat}>
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(subcat)}
                          onChange={() => {
                            setSelectedIndustries(prev =>
                              prev.includes(subcat)
                                ? prev.filter(i => i !== subcat)
                                : [...prev, subcat]
                            )
                          }}
                        />
                        {subcat}
                      </CheckboxLabel>
                    ))}
                  </ScrollableList>
                </>
              )}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('location')}>
                Location
                {openFilters['location'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['location'] && (
                <SearchInput
                  type="text"
                  placeholder="Enter location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              )}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('workPreference')}>
                Work Preference
                {openFilters['workPreference'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['workPreference'] && workPreferences.map((pref) => (
                <CheckboxLabel key={pref}>
                  <input
                    type="checkbox"
                    checked={selectedWorkPreferences.includes(pref)}
                    onChange={() => {
                      setSelectedWorkPreferences(prev =>
                        prev.includes(pref)
                          ? prev.filter(p => p !== pref)
                          : [...prev, pref]
                      )
                    }}
                  />
                  {pref}
                </CheckboxLabel>
              ))}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('topRanking')}>
                Top Ranking
                {openFilters['topRanking'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['topRanking'] && topRankings.map((ranking) => (
                <CheckboxLabel key={ranking}>
                  <input
                    type="checkbox"
                    checked={selectedTopRankings.includes(ranking)}
                    onChange={() => {
                      setSelectedTopRankings(prev =>
                        prev.includes(ranking)
                          ? prev.filter(r => r !== ranking)
                          : [...prev, ranking]
                      )
                    }}
                  />
                  {ranking}
                </CheckboxLabel>
              ))}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('companySize')}>
                Company Size
                {openFilters['companySize'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['companySize'] && (
                <Select value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                  <option value="">Any size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Select>
              )}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('jobPostings')}>
                Number of Job Postings
                {openFilters['jobPostings'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['jobPostings'] && (
                <Select value={jobPostings} onChange={(e) => setJobPostings(e.target.value)}>
                  <option value="">Any number</option>
                  {jobPostingsRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </Select>
              )}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('hiresFromArena')}>
                Hires from Arena
                {openFilters['hiresFromArena'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['hiresFromArena'] && (
                <Select value={hiresFromArena} onChange={(e) => setHiresFromArena(e.target.value)}>
                  <option value="">Any number</option>
                  {hiresFromArenaRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </Select>
              )}
            </FilterSection>
            <FilterSection>
              <FilterTitle onClick={() => toggleFilter('hiring')}>
                Currently Hiring
                {openFilters['hiring'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </FilterTitle>
              {openFilters['hiring'] && (
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={showOnlyHiring}
                    onChange={() => setShowOnlyHiring(!showOnlyHiring)}
                  />
                  Show only hiring companies
                </CheckboxLabel>
              )}
            </FilterSection>


            <SaveFilterButton onClick={handleSaveFilters}>
              <Save size={18} />
              Save Filter
            </SaveFilterButton>
          </Sidebar>

          <CompanyList>
            <CompanyListHeader>
              <h2>All Companies ({filteredCompanies.length})</h2>
            </CompanyListHeader>
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.name}>
                {company.isArenaPartner && (
                  <PartnerBadge>Arena Partner</PartnerBadge>
                )}
                <CompanyInfo>
                  <CompanyLogo src={company.logo} alt={company.name} />
                  <CompanyDetails>
                    <CompanyName>{company.name}</CompanyName>
                    <JobCount>{company.jobCount} Jobs • {company.location}</JobCount>
                    <CompanyDescription>{company.description}</CompanyDescription>
                    <TagList>
                      {company.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagList>
                  </CompanyDetails>
                </CompanyInfo>
              </CompanyCard>
            ))}
          </CompanyList>
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
