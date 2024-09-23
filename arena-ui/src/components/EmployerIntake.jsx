import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
`;

const Select = styled.select`
  width: 100%;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #3a3a3a;
  color: #e0e0e0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  min-height: 100px;
  resize: vertical;

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

const QualitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const QualityOption = styled.div`
  background-color: ${props => props.$selected ? '#4a4a4a' : '#3a3a3a'};
  color: #e0e0e0;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a4a4a;
  }
`;

export default function EmployerIntakeForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    contactFirstName: '',
    contactLastName: '',
    companyAddress: '',
    companyPhone: '',
    companySize: '',
    jobsPerYear: '',
    hiringGoals: '',
    currentHiringIssues: '',
    candidateQualities: [],
    additionalTeamMembers: '',
  });
  const nodeRef = useRef(null);

  const candidateQualitiesOptions = [
    'Leadership', 'Teamwork', 'Communication', 'Problem-solving', 'Creativity',
    'Adaptability', 'Technical skills', 'Work ethic', 'Attention to detail',
    'Time management', 'Critical thinking', 'Emotional intelligence',
    'Initiative', 'Flexibility', 'Customer service', 'Analytical skills'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQualitySelection = (quality) => {
    setFormData(prevState => {
      const updatedQualities = prevState.candidateQualities.includes(quality)
        ? prevState.candidateQualities.filter(q => q !== quality)
        : [...prevState.candidateQualities, quality].slice(0, 5);

      return {
        ...prevState,
        candidateQualities: updatedQualities
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 5) {
      navigate('/employer-dashboard');
    } else {
      nextStep();
    }
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(0, prevStep - 1));
  };

  const nextStep = () => {
    setStep(prevStep => Math.min(5, prevStep + 1));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{textAlign: 'center'}}>
            <FadeInText>Welcome to <span style={{ color: '#d19bf3', fontSize: '30px'}}>Arena Talent</span>, Employer!</FadeInText>
            <FadeInText>Let's get started by building your company profile. This will help us match you with the perfect candidates...</FadeInText>
            <Button style={{marginTop:'10px'}} onClick={nextStep}>Let's Go</Button>
          </div>
        );
      case 1:
        return (
          <StepGrid>
            <FadeInText>Let's start with some basic company information...</FadeInText>
            <FadeInFormGroup>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="contactFirstName">Contact First Name</Label>
              <Input
                type="text"
                id="contactFirstName"
                name="contactFirstName"
                value={formData.contactFirstName}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="contactLastName">Contact Last Name</Label>
              <Input
                type="text"
                id="contactLastName"
                name="contactLastName"
                value={formData.contactLastName}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="companyPhone">Company Phone</Label>
              <Input
                type="tel"
                id="companyPhone"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                required
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001+">1001+ employees</option>
              </Select>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="jobsPerYear">How many jobs do you typically hire for per year?</Label>
              <Input
                type="number"
                id="jobsPerYear"
                name="jobsPerYear"
                value={formData.jobsPerYear}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
          </StepGrid>
        );
      case 2:
        return (
          <StepGrid>
            <FadeInText>Tell us about your hiring goals and challenges...</FadeInText>
            <FadeInFormGroup>
              <Label htmlFor="hiringGoals">What are your hiring goals for this year?</Label>
              <Textarea
                id="hiringGoals"
                name="hiringGoals"
                value={formData.hiringGoals}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label htmlFor="currentHiringIssues">What are your current issues with hiring?</Label>
              <Textarea
                id="currentHiringIssues"
                name="currentHiringIssues"
                value={formData.currentHiringIssues}
                onChange={handleInputChange}
                required
              />
            </FadeInFormGroup>
          </StepGrid>
        );
      case 3:
        return (
          <StepGrid>
            <FadeInText>What qualities do you look for in a candidate? (Select up to 5)</FadeInText>
            <FadeInFormGroup>
              <QualitiesGrid>
                {candidateQualitiesOptions.map((quality) => (
                  <QualityOption
                    key={quality}
                    $selected={formData.candidateQualities.includes(quality)}
                    onClick={() => handleQualitySelection(quality)}
                  >
                    {quality}
                  </QualityOption>
                ))}
              </QualitiesGrid>
            </FadeInFormGroup>
            <FadeInFormGroup>
              <Label>Selected qualities ({formData.candidateQualities.length}/5):</Label>
              <p>{formData.candidateQualities.join(', ')}</p>
            </FadeInFormGroup>
          </StepGrid>
        );
      case 4:
        return (
          <StepGrid>
            <FadeInText>Would you like to add anyone else to your team?</FadeInText>
            <FadeInFormGroup>
              <Label htmlFor="additionalTeamMembers">Enter email addresses (comma-separated)</Label>
              <Textarea
                id="additionalTeamMembers"
                name="additionalTeamMembers"
                value={formData.additionalTeamMembers}
                onChange={handleInputChange}
                placeholder="e.g., john@example.com, jane@example.com"
              />
            </FadeInFormGroup>
          </StepGrid>
        );
      case 5:
        return (
          <StepGrid>
            <FadeInText>Great! You're all set.</FadeInText>
            <FadeInFormGroup>
              <p>Thank you for completing your company profile. Click 'Submit' to finish and go to your employer dashboard.</p>
            </FadeInFormGroup>
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
        <FormCard>
          <StepIndicator>
            {[...Array(6)].map((_, index) => (
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
                    <form onSubmit={handleSubmit} noValidate>
                      {renderStep()}
                      <NavigationButtons>
                        {step > 0 && <Button type="button" onClick={prevStep}>Previous</Button>}
                        {step < 5 ? (
                          <Button type="button" onClick={nextStep}>Next</Button>
                        ) : (
                          <Button type="submit">Submit</Button>
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
