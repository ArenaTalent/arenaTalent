import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LanguageSelector from './LanguageSelector';
import StrengthSelector from './StrengthSelector';
import CulturePreferenceSelector from './CulturePreferenceSelector';
import FileUploader from './FileUploader';

const GlobalStyle = createGlobalStyle`
  body, input, select, button {
    font-family: 'Open Sans', sans-serif;
    background-color: #1a1a1a;
    color: #e0e0e0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 100px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FormCard = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const FadeInText = styled.p`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.5s;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #e0e0e0;
`;

const FadeInFormGroup = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 1s;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #e0e0e0;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #3a3a3a;
  color: #e0e0e0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6a6a6a;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: #8a8a8a;
  }
`;

const DateInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

const Select = styled.select`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #3a3a3a;
  color: #e0e0e0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="292.4" height="292.4" fill="%23e0e0e0"><path d="M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;

  &:focus {
    outline: none;
    border-color: #6a6a6a;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  background-color: #4a4a4a;
  color: #e0e0e0;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #5a5a5a;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StepDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#e0e0e0' : '#4a4a4a'};
  margin: 0 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  ${props => props.$active && `
    transform: scale(1.2);
  `}
`;

const SlideContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlideContent = styled.div`
  &.slide-enter {
    transform: translateX(100%);
  }
  &.slide-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-in-out;
  }
  &.slide-exit {
    transform: translateX(0%);
  }
  &.slide-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in-out;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const RightAlignedButton = styled(Button)`
  float: right;
`;

const HorizontalGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const SalaryInputGroup = styled.div`
  flex: 1;
`;

const SalaryInput = styled(Input)`
  width: 70%;
`;

const RatingHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  font-size: 10px;
  font-weight: bold;
  margin-left: 8px;
  cursor: help;
  vertical-align: top;

  &::after {
    content: 'i';
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: #555;
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

  ${TooltipContainer}:hover & {
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
    border-color: #555 transparent transparent transparent;
  }
`;

const StarRating = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StarLabel = styled.span`
  margin-right: 1rem;
  min-width: 150px;
`;

const Stars = styled.div`
  display: flex;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.$filled ? '#FFD700' : '#4a4a4a'};
`;

const EducationEntryForm = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
`;

export default function DemoJobSeekerIntakeForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    phone: '',
    current_employer: '',
    current_title: '',
    years_experience: '',
    job_level: '',
    startup_experience: false,
    education: [{ college: '', major: '', degree: '', graduation_year: '' }],
    languages: [],
    open_to_work: '',
    athlete_status: '',
    preferred_telework_policy: '',
    highest_education: '',
    company_culture_preferences: [],
    job_types: [],
    dream_companies: [],
    linkedin: '',
    portfolio: '',
    instagram: '',
    github: '',
    personal_website: '',
    gender: '',
    race: '',
    sexual_orientation: '',
    veteran_status: '',
    disability_status: '',
    accommodation_needed: '',
    pronouns: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    work_start_date: '',
    work_end_date: '',
    starting_salary: '',
    ending_salary: '',
    job_search_motivation: '',
    top_strengths: [],
    job_search_challenge: '',
    profile_picture: null,
    cover_photo: null,
    resume: null,
  });
  const nodeRef = useRef(null);
  const [companyRatings, setCompanyRatings] = useState({
    applicationProcess: 0,
    interviewProcess: 0,
    benefits: 0,
    salary: 0,
    workLifeBalance: 0,
    diversity: 0
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files.length > 0 ? files[0] : null
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prevState => {
      const newEducation = [...prevState.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prevState, education: newEducation };
    });
  };

  const addEducation = () => {
    if (formData.education.length < 3) {
      setFormData(prevState => ({
        ...prevState,
        education: [
          ...prevState.education,
          { college: '', major: '', degree: '', graduation_year: '' }
        ]
      }));
    }
  };

  const handleRatingChange = (category, rating) => {
    setCompanyRatings(prevRatings => ({
      ...prevRatings,
      [category]: rating
    }));
  };


  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData(prevState => ({
        ...prevState,
        education: prevState.education.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        education: [{ college: '', major: '', degree: '', graduation_year: '' }]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 9) {
      navigate('/jobseeker-dashboard');
    } else {
      nextStep();
    }
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(0, prevStep - 1));
  };

  const nextStep = () => {
    setStep(prevStep => Math.min(9, prevStep + 1));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{textAlign: 'center'}}>
            <FadeInText>Welcome to <span style={{ color: '#d19bf3', fontSize: '30px'}}>Arena Talent</span>, Job Seeker!</FadeInText>
            <FadeInText>Let's get started by building your profile. This will help our CoachAI match you with the perfect open opportunities for you...</FadeInText>
            <Button style={{marginTop:'10px'}} onClick={nextStep}>Let's Go</Button>
          </div>
        );
        case 1:
          return (
            <StepGrid>
              <FadeInText>{formData.name || 'Job Seeker'}, let's start with some basics...</FadeInText>
              <FadeInFormGroup>
                <Label htmlFor="date_of_birth">Date of Birth (Required)</Label>
                <DateInput
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  min="1900-01-01"
                />
              </FadeInFormGroup>
              <FadeInFormGroup>
              <Label htmlFor="pronouns">Pronouns (Optional)</Label>
              <Select
                id="pronouns"
                name="pronouns"
                value={formData.pronouns}
                onChange={handleInputChange}
              >
                <option value="">Select pronouns (optional)</option>
                <option value="she/her">she/her</option>
                <option value="he/him">he/him</option>
                <option value="they/them">they/them</option>
                <option value="she/they">she/they</option>
                <option value="he/they">he/they</option>
                <option value="it/its">it/its</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="street_address">Address (Required)</Label>
              <Input
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleInputChange}
                placeholder="Street Address"
                required
              />
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State (e.g., CA)"
                required
              />
              <Input
                type="text"
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                placeholder="ZIP Code"
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="phone">Phone Number (Required)</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                required
              />
            </FadeInFormGroup>
          </StepGrid>
        );
        case 2:
          return (
            <StepGrid>
              <FadeInText>Let's learn more about your work history...</FadeInText>
              <FadeInFormGroup>
                <Label htmlFor="current_title">Current or Most Recent Title (Optional)</Label>
                <Input
                  type="text"
                  id="current_title"
                  name="current_title"
                  value={formData.current_title}
                  onChange={handleInputChange}
                  placeholder="Current Title"
                />
              </FadeInFormGroup>
              <FadeInFormGroup>

                <Label htmlFor="current_employer">Current Employer (Optional)</Label>
                <Input
                  type="text"
                  id="current_employer"
                  name="current_employer"
                  value={formData.current_employer}
                  onChange={handleInputChange}
                  placeholder="Current Employer (optional)"
                />
              </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="work_start_date">Start Date (Optional)</Label>
              <Input
                type="date"
                id="work_start_date"
                name="work_start_date"
                value={formData.work_start_date}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="work_end_date">End Date (Leave blank if still present)</Label>
              <Input
                type="date"
                id="work_end_date"
                name="work_end_date"
                value={formData.work_end_date}
                onChange={handleInputChange}
              />

            </FadeInFormGroup>
            <FadeInFormGroup>
            <HorizontalGroup>
              <SalaryInputGroup>
                <Label htmlFor="starting_salary">Starting Salary (Optional)</Label>
                <SalaryInput
                  type="number"
                  id="starting_salary"
                  name="starting_salary"
                  value={formData.starting_salary}
                  onChange={handleInputChange}
                  placeholder="Starting Salary"
                />
              </SalaryInputGroup>
              <SalaryInputGroup>
                <Label htmlFor="ending_salary">Ending Salary (Optional)</Label>
                <SalaryInput
                  type="number"
                  id="ending_salary"
                  name="ending_salary"
                  value={formData.ending_salary}
                  onChange={handleInputChange}
                  placeholder="Ending Salary"
                />
              </SalaryInputGroup>
            </HorizontalGroup>
            </FadeInFormGroup>
            {formData.current_employer && (
              <FadeInFormGroup>
                <RatingHeader>
                  <Label>Please rate {formData.current_employer} on the following:</Label>
                  <TooltipContainer>
                    <InfoIcon />
                    <Tooltip>
                      Employers won't be able to see what you rate them. This will help other job seekers on Arena get transparent insights on companies they are interested in.
                    </Tooltip>
                  </TooltipContainer>
                </RatingHeader>
                <StarRating>
                  {Object.entries({
                    applicationProcess: 'Application Process',
                    interviewProcess: 'Interview Process',
                    benefits: 'Benefits',
                    salary: 'Salary',
                    workLifeBalance: 'Work Life Balance',
                    diversity: 'Diversity in the workplace'
                  }).map(([key, label]) => (
                    <StarRow key={key}>
                      <StarLabel>{label}</StarLabel>
                      <Stars>
                        {[1, 2, 3, 4, 5].map(star => (
                        <Star
                        key={star}
                        $filled={star <= companyRatings[key]}
                        onClick={() => handleRatingChange(key, star)}
                      >
                        ★
                      </Star>
                        ))}
                      </Stars>
                    </StarRow>
                  ))}
                </StarRating>
              </FadeInFormGroup>
            )}
            <FadeInFormGroup>
              <Label htmlFor="block_current_employer">Would you like to block your current employer from seeing your profile? (Required)</Label>
              <Select
                id="block_current_employer"
                name="block_current_employer"
                value={formData.block_current_employer}
                onChange={handleInputChange}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="years_experience">Years of Experience (Required)</Label>
              <Select
                id="years_experience"
                name="years_experience"
                value={formData.years_experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Years of Experience</option>
                <option value="0">0</option>
                <option value="1-2">1-2</option>
                <option value="3-5">3-5</option>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
                <option value="16+">16+</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="job_level">Job Level (Required)</Label>
              <Select
                id="job_level"
                name="job_level"
                value={formData.job_level}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Job Level</option>
                <option value="intern">Intern</option>
                <option value="entry">Entry Level</option>
                <option value="associate">Associate</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
                <option value="manager">Manager</option>
                <option value="director">Director</option>
                <option value="vp">VP</option>
                <option value="executive">Executive (C-level)</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="startup_experience">Do you have startup experience? Any Stage. (Required) </Label>
              <Select
                id="startup_experience"
                name="startup_experience"
                value={formData.startup_experience}
                onChange={handleInputChange}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="open_to_work">Are you open to work? (Required)</Label>
              <Select
                id="open_to_work"
                name="open_to_work"
                value={formData.open_to_work}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FadeInFormGroup>
            {formData.current_employer && (
              <FadeInFormGroup>

              </FadeInFormGroup>
            )}
          </StepGrid>
        );

        case 3:
          return (
            <StepGrid>
              <FadeInText>Now let's learn more about your education...</FadeInText>
              <FadeInFormGroup>
                <Label htmlFor="highest_education">Highest Level of Education Received (Required)</Label>
                <Select
                  id="highest_education"
                  name="highest_education"
                  value={formData.highest_education}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select highest education</option>
                  <option value="high_school">High School Diploma</option>
                  <option value="associate">Associate's Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                </Select>
              </FadeInFormGroup>
              {formData.education.map((edu, index) => (
                <EducationEntryForm key={index}>
                  <Input
                    type="text"
                    name={`education[${index}].college`}
                    value={edu.college}
                    onChange={(e) => handleEducationChange(index, 'college', e.target.value)}
                    placeholder="College/University"
                  />
                  <Input
                    type="text"
                    name={`education[${index}].major`}
                    value={edu.major}
                    onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                    placeholder="Major/Field of Study"
                  />
                  <Input
                    type="text"
                    name={`education[${index}].degree`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="Degree"
                  />
                  <Select
                    name={`education[${index}].graduation_year`}
                    value={edu.graduation_year}
                    onChange={(e) => handleEducationChange(index, 'graduation_year', e.target.value)}
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </Select>
                  <Button type="button" style={{marginTop:'20px'}} onClick={() => removeEducation(index)}>
                    {formData.education.length > 1 ? 'Remove' : 'Clear'}
                  </Button>
                </EducationEntryForm>
              ))}
              {formData.education.length < 3 && (
                <Button type="button" onClick={addEducation}>Add Education</Button>
              )}
              <FadeInFormGroup>
                <Label htmlFor="languages">Languages (Required)</Label>
                <LanguageSelector
                  selectedLanguages={formData.languages}
                  setSelectedLanguages={(languages) => setFormData(prevState => ({ ...prevState, languages }))}
                />
              </FadeInFormGroup>
            </StepGrid>
          );
      case 4:
        return (
          <StepGrid>
            <FadeInText>A couple of other questions for you...</FadeInText>
            <FadeInFormGroup>
              <Label htmlFor="athlete_status">Are you a current or former student-athlete or professional athlete? (Required)</Label>
              <Select
                id="athlete_status"
                name="athlete_status"
                value={formData.athlete_status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Athlete Status</option>
                <option value="Current NCAA Athlete">Current NCAA Athlete</option>
                <option value="Graduated NCAA Athlete">Graduated NCAA Athlete</option>
                <option value="Pro Athlete">Pro Athlete</option>
                <option value="Former Pro Athlete">Former Pro Athlete</option>
                <option value="Not an Athlete">Not an Athlete</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="preferred_telework_policy">How do you prefer to work? (Required)</Label>
              <Select
                id="preferred_telework_policy"
                name="preferred_telework_policy"
                value={formData.preferred_telework_policy}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Preferred Telework Policy</option>
                <option value="In-Office">In-Office</option>
                <option value="Fully Remote">Fully Remote</option>
                <option value="Hybrid (1 day a week from home)">Hybrid (1 day a week from home)</option>
                <option value="Hybrid (2 days a week from home)">Hybrid (2 days a week from home)</option>
                <option value="Hybrid (3 days a week from home)">Hybrid (3 days a week from home)</option>
                <option value="Hybrid (4 days a week from home)">Hybrid (4 days a week from home)</option>
              </Select>
            </FadeInFormGroup>
          </StepGrid>
        );

        case 5:
  return (
    <StepGrid>
      <FadeInText>Let's learn about your job search...</FadeInText>

      <FadeInFormGroup>
        <Label htmlFor="job_search_motivation">What is motivating your job search right now? (Required)</Label>
        <Input
          type="text"
          id="job_search_motivation"
          name="job_search_motivation"
          value={formData.job_search_motivation}
          onChange={handleInputChange}
          placeholder="Enter your motivation"
          required
        />
      </FadeInFormGroup>

      <FadeInFormGroup>
        <Label htmlFor="top_strengths">What are your top 3 strengths? (Required)</Label>
        <StrengthSelector
          selectedStrengths={formData.top_strengths}
          setSelectedStrengths={(strengths) => setFormData(prevState => ({ ...prevState, top_strengths: strengths }))}
        />
        <p>Selected strengths: {formData.top_strengths.join(', ')}</p>
      </FadeInFormGroup>

      <FadeInFormGroup>
        <Label htmlFor="job_search_challenge">What has been the #1 most challenging part of your job search so far? (Required)</Label>
        <Select
          id="job_search_challenge"
          name="job_search_challenge"
          value={formData.job_search_challenge}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a challenge</option>
          <option value="figuring_out_fit">Figuring out what jobs I would be a top candidate for</option>
          <option value="ghosting">Ghosting/not hearing back from recruiters</option>
          <option value="lack_of_jobs">Hard to find jobs/lack of jobs</option>
          <option value="no_offers">Interviewing but not getting offers</option>
          <option value="salary_transparency">Lack of salary transparency</option>
          <option value="networking">Network/getting in front of people</option>
          <option value="time_consuming">Time-consuming process/not having enough time</option>
        </Select>
      </FadeInFormGroup>

      <FadeInFormGroup>
        <Label htmlFor="company_culture_preferences">Company Culture Preferences (Select 3 - Required)</Label>
        <CulturePreferenceSelector
          selectedPreferences={formData.company_culture_preferences}
          setSelectedPreferences={(preferences) => setFormData(prevState => ({ ...prevState, company_culture_preferences: preferences }))}
        />
        <p>Selected preferences: {formData.company_culture_preferences.join(', ')}</p>
      </FadeInFormGroup>
    </StepGrid>
  );
      case 6:
        return (
          <StepGrid>
             <FadeInText>Your Links...</FadeInText>
            <FadeInFormGroup>
              <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
              <Input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="LinkedIn URL"
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
              <Input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="Portfolio URL"
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="instagram">Instagram URL (Optional)</Label>
              <Input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="Instagram URL"
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="github">GitHub URL (Optional)</Label>
              <Input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="GitHub URL"
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="personal_website">Personal Website URL (Optional)</Label>
              <Input
                type="url"
                id="personal_website"
                name="personal_website"
                value={formData.personal_website}
                onChange={handleInputChange}
                placeholder="Personal Website URL"
              />
            </FadeInFormGroup>
          </StepGrid>
        );
        case 7:
          return (
            <StepGrid>
              <FadeInText>Last but not least, let's learn what makes you YOU…</FadeInText>
              <p>
                Why we ask these demographic questions:

                At Arena, we are committed to promoting equity and diversity within the sports, media, and entertainment industries. By collecting this demographic information, we generate valuable insights that help employers understand the composition of their applicant pools. This data enables organizations to assess and improve their diversity and inclusion efforts.
<br /><br />
                <strong>Note:</strong> Individual responses may be used by employers to better understand their candidate pool and improve their diversity and inclusion efforts. All questions are optional with an option to opt-out if preferred. If you choose to opt-out, it will not hurt your chances of getting seen by recruiters.
              </p>
            </StepGrid>
          );

      case 8:
        return (
          <StepGrid>
            <FadeInFormGroup>
  <Label htmlFor="gender">Gender (Required)</Label>
  <Select
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="non-binary">Non-binary</option>
    <option value="transgender">Transgender</option>
    <option value="other">Other</option>
    <option value="prefer-not-to-say">Prefer not to say</option>
  </Select>
</FadeInFormGroup>

<FadeInFormGroup>
  <Label htmlFor="race">Race/Ethnicity (Required)</Label>
  <Select
    id="race"
    name="race"
    value={formData.race}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Race/Ethnicity</option>
    <option value="white">White</option>
    <option value="black">Black or African American</option>
    <option value="asian">Asian</option>
    <option value="hispanic">Hispanic or Latino</option>
    <option value="native-american">Native American or Alaska Native</option>
    <option value="pacific-islander">Native Hawaiian or Other Pacific Islander</option>
    <option value="two-or-more">Two or More Races</option>
    <option value="other">Other</option>
    <option value="prefer-not-to-say">Prefer not to say</option>
  </Select>
</FadeInFormGroup>

<FadeInFormGroup>
  <Label htmlFor="sexual_orientation">Sexual Orientation (Required)</Label>
  <Select
    id="sexual_orientation"
    name="sexual_orientation"
    value={formData.sexual_orientation}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Sexual Orientation</option>
    <option value="straight">Straight/Heterosexual</option>
    <option value="gay">Gay</option>
    <option value="lesbian">Lesbian</option>
    <option value="bisexual">Bisexual</option>
    <option value="queer">Queer</option>
    <option value="other">Other</option>
    <option value="prefer-not-to-say">Prefer not to say</option>
  </Select>
</FadeInFormGroup>

<FadeInFormGroup>
  <Label htmlFor="veteran_status">Veteran Status (Required)</Label>
  <Select
    id="veteran_status"
    name="veteran_status"
    value={formData.veteran_status}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Veteran Status</option>
    <option value="veteran">Veteran</option>
    <option value="active-duty">Active Duty</option>
    <option value="reservist">Reservist</option>
    <option value="not-veteran">Not a Veteran</option>
    <option value="prefer-not-to-say">Prefer not to say</option>
  </Select>
</FadeInFormGroup>

<FadeInFormGroup>
  <Label htmlFor="disability_status">Disability Status (Required)</Label>
  <Select
    id="disability_status"
    name="disability_status"
    value={formData.disability_status}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Disability Status</option>
    <option value="yes">Yes, I have a disability</option>
    <option value="no">No, I don't have a disability</option>
    <option value="prefer-not-to-say">Prefer not to say</option>
  </Select>
</FadeInFormGroup>
            {formData.disability_status === 'yes' && (
              <FadeInFormGroup>
                <Label htmlFor="accommodation_needed">Accommodation Needed</Label>
                <Input
                  as="textarea"
                  id="accommodation_needed"
                  name="accommodation_needed"
                  value={formData.accommodation_needed}
                  onChange={handleInputChange}
                  placeholder="Please describe any accommodations needed during the job application/interview stages"
                />
              </FadeInFormGroup>
            )}
          </StepGrid>
        );
        case 9:
          return (
            <StepGrid>
              <FadeInText>Uploads</FadeInText>
              <FileUploader
                label="Profile Picture (Required, Max 5MB)"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                file={formData.profile_picture}
                required
                maxSize={5 * 1024 * 1024} // 5MB
              />
              <FileUploader
                label="Cover Photo (Optional, Max 10MB)"
                name="cover_photo"
                accept="image/*"
                onChange={handleFileChange}
                file={formData.cover_photo}
                maxSize={10 * 1024 * 1024} // 10MB
              />
              <FileUploader
                label="Resume (Required, PDF only, Max 10MB)"
                name="resume"
                accept="application/pdf"
                onChange={handleFileChange}
                file={formData.resume}
                required
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </StepGrid>
          );

  default:
    return null;
}
};

return (
  <>
      <GlobalStyle />
      <FormContainer>
        <LogoContainer>
          <Logo src="/images/white-logo.png" alt="Company Logo" />
        </LogoContainer>
        <FormCard>
          <StepIndicator>
            {[...Array(10)].map((_, index) => (
              <StepDot key={index} $active={index === step} />
            ))}
          </StepIndicator>
          <SlideContainer>
            <TransitionGroup>
              <CSSTransition
                key={step}
                nodeRef={nodeRef}
                classNames="slide"
                timeout={300}
              >
                <SlideContent ref={nodeRef}>
                  {step === 0 ? (
                    renderStep()
                  ) : (
                    <form onSubmit={handleSubmit}  noValidate>
                      {renderStep()}
                      <NavigationButtons>
                        {step > 0 && <Button type="button" onClick={prevStep}>Previous</Button>}
                        {step < 9 ? (
                          <RightAlignedButton type="button" onClick={nextStep}>Next</RightAlignedButton>
                        ) : (
                          <RightAlignedButton type="submit">Submit</RightAlignedButton>
                        )}
                      </NavigationButtons>
                    </form>
                  )}
                </SlideContent>
              </CSSTransition>
            </TransitionGroup>
          </SlideContainer>
        </FormCard>
      </FormContainer>


</>

  );
}
