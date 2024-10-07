import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Loader2, Heart, Umbrella, GraduationCap, Users, Home, Bus } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Open Sans', sans-serif;
  transform: scale(0.9);
  transition: transform 0.3s;
  position: relative;

  &.open {
    transform: scale(1);
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #CAAAE1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #B088D1;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem;
  background-color: transparent;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const BenefitCard = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RequiredText = styled.span`
  color: red;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`;

const benefitCategories = {
  healthcare: { icon: Heart, label: 'Healthcare' },
  vacation: { icon: Umbrella, label: 'Vacation' },
  skillDevelopment: { icon: GraduationCap, label: 'Skill Development' },
  teamSummits: { icon: Users, label: 'Team Summits' },
  remoteWorking: { icon: Home, label: 'Remote Working' },
  commuterBenefits: { icon: Bus, label: 'Commuter Benefits' },
};

export default function JobPostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [isAILoading, setIsAILoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsContentLoaded(true), 100);
    } else {
      setIsContentLoaded(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsOpen(false);
  };

  const handleAICheck = () => {
    setIsAILoading(true);
    setTimeout(() => {
      setIsAILoading(false);
      // Simulating AI failure after 10 seconds
      setTimeout(() => {
        alert("Our AI seems to be down. Please let us know here: support@arenatalent.com");
      }, 10000);
    }, 2000);
  };

  const addBenefit = () => {
    if (benefits.length < 10) {
      setBenefits([...benefits, { category: 'healthcare', title: '', description: '' }]);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Post a Job</Button>
      <ModalOverlay className={isOpen ? 'open' : ''}>
        <ModalContent className={isContentLoaded ? 'open' : ''}>
          {isContentLoaded ? (
            <>
              <Title>Post a New Job</Title>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">Job Title <RequiredText>*</RequiredText></Label>
                  <Input id="title" name="title" placeholder="e.g. Senior Software Engineer" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="location">Location <RequiredText>*</RequiredText></Label>
                  <Input id="location" name="location" placeholder="e.g. New York, NY" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="wfhPolicy">WFH Policy <RequiredText>*</RequiredText></Label>
                  <Select id="wfhPolicy" name="wfhPolicy" required>
                    <option value="">Select WFH Policy</option>
                    <option value="fullyInOffice">Fully in Office</option>
                    <option value="hybrid1">Hybrid 1 day a week in office</option>
                    <option value="hybrid2">Hybrid 2 days a week in office</option>
                    <option value="hybrid3">Hybrid 3 days a week in office</option>
                    <option value="hybrid4">Hybrid 4 days a week in office</option>
                    <option value="fullyRemote">Fully Remote</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="jobType">Job Type <RequiredText>*</RequiredText></Label>
                  <Select id="jobType" name="jobType" required>
                    <option value="">Select Job Type</option>
                    <option value="fullTime">Full-time</option>
                    <option value="partTime">Part-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="contract">Contract</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="intern">Intern</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="salaryType">Salary <RequiredText>*</RequiredText></Label>
                  <Select id="salaryType" name="salaryType">
                    <option value="">Select Salary Type</option>
                    <option value="fixed">Enter a salary</option>
                    <option value="ai">Use AI to provide standard range</option>
                  </Select>
                  <Select id="salaryRange" name="salaryRange">
                    <option value="">Select Salary Range</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`${(i + 1) * 20000}-${(i + 2) * 20000}`}>
                        ${(i + 1) * 20000} - ${(i + 2) * 20000}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="jobLevel">Job Level <RequiredText>*</RequiredText></Label>
                  <Select id="jobLevel" name="jobLevel" required>
                    <option value="">Select Job Level</option>
                    <option value="intern">Intern</option>
                    <option value="entryLevel">Entry-Level</option>
                    <option value="manager">Manager</option>
                    <option value="director">Director</option>
                    <option value="vp">VP</option>
                    <option value="svp">SVP</option>
                    <option value="executive">Executive (C-Suite)</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="jobOverview">Job Overview <RequiredText>*</RequiredText></Label>
                  <Textarea id="jobOverview" name="jobOverview" placeholder="Provide a brief overview of the job" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="responsibilities">Responsibilities <RequiredText>*</RequiredText></Label>
                  <Textarea id="responsibilities" name="responsibilities" placeholder="List the main responsibilities of the role" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="requiredQualifications">Required Qualifications <RequiredText>*</RequiredText></Label>
                  <Textarea id="requiredQualifications" name="requiredQualifications" placeholder="List the required qualifications" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="optionalQualifications">Optional Qualifications</Label>
                  <Textarea id="optionalQualifications" name="optionalQualifications" placeholder="List any optional qualifications" />
                </FormGroup>

                <FormGroup>
                  <Label>Benefits</Label>
                  <BenefitsGrid>
                    {benefits.map((benefit, index) => {
                      const BenefitIcon = benefitCategories[benefit.category].icon;
                      return (
                        <BenefitCard key={index}>
                          <Select
                            value={benefit.category}
                            onChange={(e) => {
                              const newBenefits = [...benefits];
                              newBenefits[index].category = e.target.value;
                              setBenefits(newBenefits);
                            }}
                          >
                            {Object.entries(benefitCategories).map(([key, { label }]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                          </Select>
                          <IconWrapper>
                            <BenefitIcon size={16} />
                            <span>{benefitCategories[benefit.category].label}</span>
                          </IconWrapper>
                          <Input
                            placeholder="Benefit Title"
                            value={benefit.title}
                            onChange={(e) => {
                              const newBenefits = [...benefits];
                              newBenefits[index].title = e.target.value;
                              setBenefits(newBenefits);
                            }}
                          />
                          <Textarea
                            placeholder="Benefit Description"
                            value={benefit.description}
                            onChange={(e) => {
                              const newBenefits = [...benefits];
                              newBenefits[index].description = e.target.value;
                              setBenefits(newBenefits);
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const newBenefits = benefits.filter((_, i) => i !== index);
                              setBenefits(newBenefits);
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </BenefitCard>
                      );
                    })}
                  </BenefitsGrid>
                  <Button type="button" onClick={addBenefit} disabled={benefits.length >= 10}>
                    Add Benefit
                  </Button>
                </FormGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button type="button" onClick={handleAICheck} disabled={isAILoading}>
                    {isAILoading ? (
                      <>
                        <Loader2 size={16} style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                        Checking with AI...
                      </>
                    ) : (
                      'Check with AI'
                    )}
                  </Button>
                  <Button type="submit">Post Job</Button>
                </div>
              </Form>
            </>
          ) : (
            <Loader2 size={24} style={{ margin: 'auto', display: 'block' }} />
          )}
          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={24} />
          </CloseButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
