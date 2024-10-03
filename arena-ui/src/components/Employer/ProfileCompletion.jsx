import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployerNav from './EmployerNav';
import styled from 'styled-components';

const hiringRanges = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100", "100+"];
const hiringRanges2 = ["0-20", "20-40", "40-50", "50-100", "100-150", "150-200", "200+"];

const hiringGoals = {
  "Diverse candidates": ["Female/Non-Binary", "Black", "Asian", "Hispanic/Latino", "Indigenous", "Native Hawaiian/Pacific Islander", "LGBTQIA+", "Veteran", "People With Disabilities"],
  "Seniority": ["Students", "Entry-Level", "Mid-Level", "Senior Executive"],
  "Job Functions": ["AI/Tech/Engineering", "Business Development", "Communications/PR", "Content/Journalism", "Data Analytics", "Finance/Accounting", "Gaming/Esports", "Human Resources/DEIB", "Legal", "Marketing", "Philanthropy", "Production/Creative", "Sales", "Strategy/Operations", "Talent Management", "Other (tell us)"],
  "Job Types": ["Full-Time", "Part-Time/Seasonal", "Freelance/Contract", "Intern"],
  "Other (tell us)": []
};

const hiringChallenges = [
  "ATS inefficiencies", "Attracting diverse talent", "Employer branding", "Finding quality talent", "Lack of industry data",
  "Limited access to desired talent", "Low budget", "Low resources", "Offer rejections", "Salary transparency",
  "Sourcing talent", "Time-to-hire", "Volume of applications", "Other (tell us)"
];

const candidateQualities = [
  'Leadership', 'Teamwork', 'Communication', 'Problem-solving', 'Creativity',
  'Adaptability', 'Technical skills', 'Work ethic', 'Attention to detail',
  'Time management', 'Critical thinking', 'Emotional intelligence',
  'Initiative', 'Flexibility', 'Customer service', 'Analytical skills'
];

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
`;

const NavbarWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  background-color: white;
  overflow-y: auto;
`;


export default function EmployerSurvey() {
    const navigate = useNavigate();
    const [slide, setSlide] = useState(1);
    const [fullTimeRoles, setFullTimeRoles] = useState('');
    const [partTimeRoles, setPartTimeRoles] = useState('');
    const [selectedHiringGoals, setSelectedHiringGoals] = useState({});
    const [selectedChallenges, setSelectedChallenges] = useState([]);
    const [selectedQualities, setSelectedQualities] = useState([]);
    const [otherHiringGoal, setOtherHiringGoal] = useState('');
    const [otherJobFunction, setOtherJobFunction] = useState('');
    const [otherChallenge, setOtherChallenge] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});

    const handleSubmit = () => {
        // Here you can add any logic to process the survey data if needed
        // For example, you might want to send the data to an API

        // Navigate to the employer dashboard
        navigate('/employer-dashboard');
    };

    const handleBackToDash = () => {
        navigate('/employer-dashboard');
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleHiringGoalChange = (category, subCategory) => {
        setSelectedHiringGoals(prev => {
            const newGoals = { ...prev };
            if (!newGoals[category]) {
                newGoals[category] = [];
            }
            const index = newGoals[category].indexOf(subCategory);
            if (index > -1) {
                newGoals[category] = newGoals[category].filter(item => item !== subCategory);
            } else {
                newGoals[category] = [...newGoals[category], subCategory];
            }
            if (newGoals[category].length === 0) {
                delete newGoals[category];
            }
            return newGoals;
        });
    };

    const handleChallengeChange = (challenge) => {
      setSelectedChallenges(prev => {
        if (prev.includes(challenge)) {
          return prev.filter(c => c !== challenge);
        }
        if (prev.length < 3) {
          return [...prev, challenge];
        }
        return prev;
      });
    };

    const handleQualityChange = (quality) => {
      setSelectedQualities(prev => {
        if (prev.includes(quality)) {
          return prev.filter(q => q !== quality);
        }
        if (prev.length < 3) {
          return [...prev, quality];
        }
        return prev;
      });
    };

    return (
        <PageWrapper>
        <NavbarWrapper>
            <EmployerNav />
        </NavbarWrapper>
        <PageContainer>
        <div style={{
            minHeight: '100vh',
            background: 'whitesmoke',
            padding: '48px 16px',
            fontFamily: "'Open Sans', sans-serif"
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '32px' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: '#E2E8F0',
                            borderRadius: '4px'
                        }}>
                            <div style={{
                                width: `${(slide / 3) * 100}%`,
                                height: '100%',
                                background: '#CAAAE1',
                                borderRadius: '4px',
                                transition: 'width 0.3s ease-in-out'
                            }}></div>
                        </div>
                    </div>

                    {slide === 1 && (
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#1A202C',
                                marginBottom: '24px'
                            }}>Hiring Expectations</h2>
                            <div style={{
                                background: '#F9F5FF',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '24px'
                            }}>
                                <label htmlFor="fullTimeRoles" style={{
                                    display: 'block',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#4A5568',
                                    marginBottom: '12px'
                                }}>
                                    How many full-time roles do you expect to hire for in the next year?
                                    <span style={{ color: '#E53E3E', marginLeft: '4px' }}>*</span>
                                </label>
                                <select
                                    id="fullTimeRoles"
                                    value={fullTimeRoles}
                                    onChange={(e) => setFullTimeRoles(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #CBD5E0',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#2D3748'
                                    }}
                                    required
                                >
                                    <option value="">Select range</option>
                                    {hiringRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{
                                background: '#F9F5FF',
                                borderRadius: '12px',
                                padding: '24px'
                            }}>
                                <label htmlFor="partTimeRoles" style={{
                                    display: 'block',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#4A5568',
                                    marginBottom: '12px'
                                }}>
                                    How many part-time, seasonal, or internship roles do you expect to hire for in the next year?
                                    <span style={{ color: '#E53E3E', marginLeft: '4px' }}>*</span>
                                </label>
                                <select
                                    id="partTimeRoles"
                                    value={partTimeRoles}
                                    onChange={(e) => setPartTimeRoles(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #CBD5E0',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#2D3748'
                                    }}
                                    required
                                >
                                    <option value="">Select range</option>
                                    {hiringRanges2.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {slide === 2 && (
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#1A202C',
                                marginBottom: '24px'
                            }}>Hiring Goals and Challenges</h2>
                            <div style={{
                                background: '#F9F5FF',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '24px'
                            }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#2D3748',
                                    marginBottom: '16px'
                                }}>
                                    What are your hiring goals?
                                    <span style={{ color: '#E53E3E', marginLeft: '4px' }}>*</span>
                                </h3>
                                <div style={{ display: 'grid', gap: '16px' }}>
                                    {Object.entries(hiringGoals).map(([category, subCategories]) => (
                                        <div key={category} style={{
                                            background: '#FFFFFF',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '8px',
                                            padding: '16px'
                                        }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    userSelect: 'none'
                                                }}
                                                onClick={() => toggleCategory(category)}
                                            >
                                                {expandedCategories[category] ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
                                                <span style={{
                                                    fontSize: '16px',
                                                    fontWeight: '500',
                                                    color: '#2D3748',
                                                    marginLeft: '8px'
                                                }}>{category}</span>
                                            </div>
                                            {expandedCategories[category] && (
                                                <div style={{ marginLeft: '28px', marginTop: '12px' }}>
                                                    {subCategories.map(subCategory => (
                                                        <label key={subCategory} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '8px',
                                                            cursor: 'pointer'
                                                        }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedHiringGoals[category]?.includes(subCategory)}
                                                                onChange={() => handleHiringGoalChange(category, subCategory)}
                                                                style={{ marginRight: '8px' }}
                                                            />
                                                            <span style={{
                                                                fontSize: '14px',
                                                                color: '#4A5568'
                                                            }}>{subCategory}</span>
                                                            {subCategory === "Other (tell us)" && selectedHiringGoals[category]?.includes(subCategory) && (
                                                                <input
                                                                    type="text"
                                                                    value={otherJobFunction}
                                                                    onChange={(e) => setOtherJobFunction(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    placeholder="Please specify"
                                                                    style={{
                                                                        marginLeft: '8px',
                                                                        padding: '4px 8px',
                                                                        border: '1px solid #CBD5E0',
                                                                        borderRadius: '4px',
                                                                        fontSize: '14px'
                                                                    }}
                                                                />
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                            {category === "Other (tell us)" && selectedHiringGoals[category] && (
                                                <input
                                                    type="text"
                                                    value={otherHiringGoal}
                                                    onChange={(e) => setOtherHiringGoal(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    placeholder="Please specify"
                                                    style={{
                                                        marginTop: '8px',
                                                        padding: '8px',
                                                        border: '1px solid #CBD5E0',
                                                        borderRadius: '4px',
                                                        fontSize: '14px',
                                                        width: '100%'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                background: '#F9F5FF',
                                borderRadius: '12px',
                                padding: '24px'
                            }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#2D3748',
                                    marginBottom: '16px'
                                }}>
                                    What are your current challenges in the hiring process? (Select up to 3)
                                    <span style={{ color: '#E53E3E', marginLeft: '4px' }}>*</span>
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '16px'
                                }}>
                                    {hiringChallenges.map(challenge => (
                                        <div key={challenge}>
                                            <div
                                                onClick={() => handleChallengeChange(challenge)}
                                                style={{
                                                    padding: '12px',
                                                    border: `1px solid ${selectedChallenges.includes(challenge) ? '#CAAAE1' : '#E2E8F0'}`,
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    background: selectedChallenges.includes(challenge) ? '#CAAAE1' : '#FFFFFF',
                                                    color: selectedChallenges.includes(challenge) ? '#FFFFFF' : '#2D3748',
                                                    transition: 'all 0.2s ease-in-out'
                                                }}
                                            >
                                                {challenge}
                                            </div>
                                            {challenge === "Other (tell us)" && selectedChallenges.includes(challenge) && (
                                                <input
                                                    type="text"
                                                    value={otherChallenge}
                                                    onChange={(e) => setOtherChallenge(e.target.value)}
                                                    placeholder="Please specify"
                                                    style={{
                                                        marginTop: '8px',
                                                        padding: '8px',
                                                        border: '1px solid #CBD5E0',
                                                        borderRadius: '4px',
                                                        fontSize: '14px',
                                                        width: '100%'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {slide === 3 && (
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#1A202C',
                                marginBottom: '24px'
                            }}>Candidate Qualities</h2>
                            <div style={{
                                background: '#F9F5FF',
                                borderRadius: '12px',
                                padding: '24px'
                            }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#2D3748',
                                    marginBottom: '16px'
                                }}>
                                    What qualities do you look for in candidates? (Select up to 3)
                                    <span style={{ color: '#E53E3E', marginLeft: '4px' }}>*</span>
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                    gap: '16px'
                                }}>
                                    {candidateQualities.map(quality => (
                                        <div
                                            key={quality}
                                            onClick={() => handleQualityChange(quality)}
                                            style={{
                                                padding: '12px',
                                                border: `1px solid ${selectedQualities.includes(quality) ? '#CAAAE1' : '#E2E8F0'}`,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                background: selectedQualities.includes(quality) ? '#CAAAE1' : '#FFFFFF',
                                                color: selectedQualities.includes(quality) ? '#FFFFFF' : '#2D3748',
                                                transition: 'all 0.2s ease-in-out'
                                            }}
                                        >
                                            {quality}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '32px'
                    }}>
                        {slide === 1 ? (
                            <button
                                onClick={handleBackToDash}
                                style={{
                                    padding: '12px 24px',
                                    background: '#E2E8F0',
                                    color: '#4A5568',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                <HomeIcon style={{ marginRight: '8px' }} />
                                Back to Dash
                            </button>
                        ) : (
                            <button
                                onClick={() => setSlide(prev => prev - 1)}
                                style={{
                                    padding: '12px 24px',
                                    background: '#E2E8F0',
                                    color: '#4A5568',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                <ChevronLeftIcon style={{ marginRight: '8px' }} />
                                Previous
                            </button>
                        )}
                        <span style={{
                            color: '#E53E3E',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>* Required</span>
                        <button
                            onClick={slide === 3 ? handleSubmit : () => setSlide(prev => Math.min(3, prev + 1))}
                            style={{
                                padding: '12px 24px',
                                background: '#CAAAE1',
                                color: '#FFFFFF',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            {slide === 3 ? 'Submit' : 'Next'}
                            {slide !== 3 && <ChevronRightIcon style={{ marginLeft: '8px' }} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </PageContainer>
        </PageWrapper>
    );
}
