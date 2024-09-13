import React , { useState, useEffect }from 'react'
import styled from 'styled-components'
import { Search, Save } from 'lucide-react'
import JobSeekerNav from './JobSeekerNav'
import { useNavigate } from 'react-router-dom'


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
  width: 25%%;
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
const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`



export default function ModernCompanySearch() {
  const navigate = useNavigate()
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

  const industries = [
    "Advertising", "Technology", "Sports", "Media", "Entertainment", "Professional Sports", "Gaming", "Music"
  ]

  const workPreferences = ["Remote", "Hybrid", "In Office"]

  const topRankings = ["Work Life Balance", "Application process", "Salary", "Work Place Diversity"]


  const companies = [
    {
      name: "The Minnesota Vikings",
      logo: "/images/unknown.png",
      jobCount: 1,
      location: "Eagan, MN",
      description: "The Minnesota Vikings are a professional football team based in Minneapolis, Minnesota, competing in the NFC North division of the NFL. Founded in 1960, the team is known for its passionate fan base and distinctive purple and gold colors.",
      tags: ["Professional Sports"],
      isHiring: true,
      isArenaPartner: true,
      workPreference: "In Office",
      topRankings: {
        "Work Life Balance": 80,
        "Application process": 75,
        "Salary": 90,
        "Work Place Diversity": 85
      }
    },
    {
      name: "Arena Talent",
      logo: "/images/black-logo.png",
      jobCount: 1,
      location: "Remote",
      description: "Arena connects employers with top talent in sports, media, and entertainment using AI to power transparency and equity in the hiring process",
      tags: ["Technology", "Sports","Entertainment","Media"],
      isHiring: true,
      isArenaPartner: false,
      workPreference: "Remote",
      topRankings: {
        "Work Life Balance": 95,
        "Application process": 90,
        "Salary": 85,
        "Work Place Diversity": 95
      }
    },
  ]

  useEffect(() => {
    filterCompanies()
    loadSavedFilters()
  }, [searchTerm, selectedIndustries, selectedLocation, selectedWorkPreferences, selectedTopRankings, showOnlyHiring, showOnlyArenaPartners, sortOption])

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

      return matchesSearch && matchesIndustries && matchesLocation && matchesWorkPreference && matchesHiring && matchesArenaPartner && matchesTopRankings
    })

    // Sort companies
    filtered.sort((a, b) => {
      if (sortOption === 'recent') {
        return b.jobCount - a.jobCount // Assuming more job count means more recent
      } else if (sortOption === 'alphabetical') {
        return a.name.localeCompare(b.name)
      }
      return 0 // 'relevant' sorting would typically involve more complex logic
    })

    setFilteredCompanies(filtered)
  }

  const handleTopRankingClick = (company) => {
    if (company.name === "The Minnesota Vikings") {
      navigate('/profile-vikings')
    } else if (company.name === "Arena Talent") {
      navigate('/profile-arena')
    }
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
      }
      const updatedFilters = { ...savedFilters, [filterName]: filterCriteria }
      localStorage.setItem('savedFilters', JSON.stringify(updatedFilters))
      setSavedFilters(updatedFilters)
      setIsModalOpen(false)
      setFilterName('')
      alert('Great! These filters have been saved.')
    }
  }
  const handleLoadSavedFilters = () => {
    const savedFilters = localStorage.getItem('savedFilters')
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters)
      setSelectedIndustries(parsedFilters.selectedIndustries || [])
      setSelectedLocation(parsedFilters.selectedLocation || '')
      setSelectedWorkPreferences(parsedFilters.selectedWorkPreferences || [])
      setSelectedTopRankings(parsedFilters.selectedTopRankings || [])
      setShowOnlyHiring(parsedFilters.showOnlyHiring || false)
      setShowOnlyArenaPartners(parsedFilters.showOnlyArenaPartners || false)
      filterCompanies()
    }
  }
  const handleCompanyClick = (company) => {
    if (company.name === "The Minnesota Vikings") {
      navigate('/company-profile/vikings')
    } else if (company.name === "Arena Talent") {
      navigate('/company-profile')
    }
  }
  return (
    <PageWrapper>
      <NavWrapper>
      <JobSeekerNav />
      </NavWrapper>
      <MainContent>
        <Header>
          <Title>Browse Companies</Title>
        </Header>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Company Name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="relevant">Most relevant</option>
            <option value="recent">Most recent</option>
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
              <FilterTitle>Industry</FilterTitle>
              {industries.map((industry) => (
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
              <FilterTitle>Location</FilterTitle>
              <SearchInput
                type="text"
                placeholder="Enter location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </FilterSection>
            <FilterSection>
              <FilterTitle>Work Preference</FilterTitle>
              {workPreferences.map((pref) => (
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
              <FilterTitle>Top Ranking</FilterTitle>
              {topRankings.map((ranking) => (
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
              <FilterTitle>Currently Hiring</FilterTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={showOnlyHiring}
                  onChange={() => setShowOnlyHiring(!showOnlyHiring)}
                />
                Show only hiring companies
              </CheckboxLabel>
            </FilterSection>
            <FilterSection>
              <FilterTitle>Arena Partner</FilterTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={showOnlyArenaPartners}
                  onChange={() => setShowOnlyArenaPartners(!showOnlyArenaPartners)}
                />
                Show only Arena partners
              </CheckboxLabel>
            </FilterSection>
            {/* <FilterButton onClick={filterCompanies}>Apply Filters</FilterButton> */}
            <SaveFilterButton onClick={handleSaveFilters}>
              <Save size={18} />
              Save Filter
            </SaveFilterButton>
            {/* <SavedFiltersDropdown
              value={selectedSavedFilter}
              onChange={(e) => setSelectedSavedFilter(e.target.value)}
            >
              <option value="">Select saved filter</option>
              {Object.keys(savedFilters).map((filterName) => (
                <option key={filterName} value={filterName}>{filterName}</option>
              ))}
            </SavedFiltersDropdown>
            <FilterButton onClick={handleLoadSavedFilters}>Load Selected Filter</FilterButton> */}
          </Sidebar>

          <CompanyList>
            <CompanyListHeader>
              <h2>All Companies ({filteredCompanies.length})</h2>
            </CompanyListHeader>
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.name} onClick={() => handleCompanyClick(company)}>
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
                        <Tag key={tag} onClick={() => handleTopRankingClick(company)}>{tag}</Tag>
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
