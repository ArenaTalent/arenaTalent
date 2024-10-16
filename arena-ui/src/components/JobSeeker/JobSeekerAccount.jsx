import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import JobSeekerNav from './JobSeekerNav';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const NavbarWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const PageContainer = styled.div`
  flex-grow: 1;
  background-color: #f8f9fa;
  overflow-y: auto;
`

const ContentContainer = styled.div`
  flex: 1;
  padding: 1rem 3rem;
  overflow-y: auto;
`
const BulletPoint = styled.div`
  display: flex; 
  align-items: center; 
  line-height: 1.6;
  font-size: 9pt;

  svg {
    margin-right: 10px;
  }
`
const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: bold; 
  margin-bottom: 8px;
`
const MostPopularTag = styled.span`
  position: absolute; 
  border-radius: 0px 0px 0px 8px; 
  top: 0px ; 
  right: 0px ; 
  background-color: #6b46c1; 
  color: #ffffff; 
  padding: 8px 12px; 
  font-size: 12px; 
  font-weight: bold;
  width: 5rem;
`
const Card = styled.div`
  max-width: 300px;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`
const CardDescription = styled.p`
  font-size: 14px; 
  color: #6b46c1; 
  margin-bottom: 16px;
  height: 30px;

`
const CardPrice = styled.p`
  font-size: 28px; 
  font-weight: 600; 
  margin-bottom: 16px;
`
const CardButton = styled.button`
  background-color: #6b46c1; 
  color: #ffffff; 
  font-weight: bold; 
  padding: 12px 16px; 
  border-radius: 8px; 
  border: none; 
  cursor: pointer;
  margin-bottom: 20px; 
  position: relative;
`
const DescriptionPriceContainer = styled.div`
  min-height: 110px;
`
const BulletContainerTitle = styled.h3`
  text-align: left; 
  font-size: 18px; 
  font-weight: bold; 
  margin-bottom: 8px; 
`
const BulletPointContainer = styled.div`
  text-align: left; 
  padding: 10px;
`



const TabButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '10px',
        backgroundColor: active ? '#CAAAE1' : 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #CAAAE1' : '1px solid #e5e7eb',
        cursor: 'pointer',
        flex: 1,
        fontSize: '14px',
        fontWeight: active ? 'bold' : 'normal',
        color: active ? '#FFFFFF' : '#000000',
      }}
    >
      {children}
    </button>
  );

  const Input = ({ label, ...props }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>{label}</label>
      <input
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #CAAAE1',
          borderRadius: '4px',
          fontSize: '14px',
        }}
        {...props}
      />
    </div>
  );

  const Button = ({ children, ...props }) => (
    <button
      style={{
        backgroundColor: '#CAAAE1',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
      {...props}
    >
      {children}
    </button>
  );

  const Checkbox = ({ label, ...props }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input
        type="checkbox"
        style={{
          marginRight: '10px',
          accentColor: '#CAAAE1',
        }}
        {...props}
      />
      <label style={{ fontSize: '14px' }}>{label}</label>
    </div>
  );

  export default function JobSeekerSettings() {

    const location = useLocation();
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('john@email.com');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');




    const [currentTab, setCurrentTab] = useState('monthly');
    const [selectedCard, setSelectedCard] = useState(null);



    const handleUpdateEmail = (e) => {
      e.preventDefault();
      setEmail(newEmail);
      setNewEmail('');
    };

    const handleUpdatePassword = (e) => {
      e.preventDefault();
      setOldPassword('');
      setNewPassword('');
    };

    useEffect(() => {
      const query = new URLSearchParams(location.search);
      const tab = query.get('tab');
      if (tab) {
        setActiveTab(tab);
      }
    }, [location]);    

  return (
    <PageWrapper>
    <NavbarWrapper>
      <JobSeekerNav />
    </NavbarWrapper>
    <PageContainer>
      <ContentContainer>
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Account Settings</h1>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Manage your job seeker account preferences</p>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        <TabButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login Settings</TabButton>
        <TabButton active={activeTab === 'billing'} onClick={() => setActiveTab('billing')}>Billing</TabButton>
        <TabButton active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}>Notifications</TabButton>
      </div>

      {activeTab === 'login' && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Basic Information</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>This is login information that you can update anytime.</p>

          <form onSubmit={handleUpdateEmail}>
            <Input label="Current Email" value={email} disabled />
            <Input label="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter your new email" />
            <Button type="submit">Update Email</Button>
          </form>

          <form onSubmit={handleUpdatePassword} style={{ marginTop: '30px' }}>
            <Input label="Old Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter your old password" />
            <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password" />
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>Minimum 8 characters</p>
            <Button type="submit">Change Password</Button>
          </form>
        </div>
      )}




{/*
      {activeTab === 'billing' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#6b7280' }}>Billing details will be implemented here.</p>
        </div>
      )} */}

{activeTab === 'billing' && (
  <div style={{ 
    fontFamily: 'Arial, sans-serif' 
  }}>
 
   <div style={{ display: 'flex', gridTemplateColumns: 'repeat(2, 1fr)', gap:'2rem', textAlign: 'center', justifyContent: 'center'}}>
     {/* Arena: Free */}
     <Card onClick={() => setSelectedCard('basic')}>
        <TableTitle>Arena</TableTitle>
        <DescriptionPriceContainer>
        <CardDescription style={{marginBottom: '38px'}}>Apply for jobs and track your progress for free, forever </CardDescription>
        <CardPrice>Free</CardPrice>
        </DescriptionPriceContainer>
        <CardButton>Cancel</CardButton>

        <BulletPointContainer>
          <BulletContainerTitle>Includes:</BulletContainerTitle>      
          <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Detailed Profile</BulletPoint>
          <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Apply to unlimited jobs</BulletPoint>
          <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Automated application tracker & status updates</BulletPoint>
          <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Get amplified to recruiters</BulletPoint>
          <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Salary transparency & insights</BulletPoint>

        </BulletPointContainer>
     </Card>

     <Card style ={{border: '2px solid #6b46c1'}} onClick={() => setSelectedCard('pro')}>
      {/* Monthly or Every 3 Months Flag */}
      {currentTab === 'monthly' && (<MostPopularTag>Most Popular</MostPopularTag>)}
      {currentTab === 'every3months' && (<MostPopularTag>Save 20%</MostPopularTag>)}
       
       <TableTitle>Arena PRO</TableTitle>
       <DescriptionPriceContainer>
       <CardDescription style={{marginBottom: '8px'}}>Land your dream job faster with personalized insights & advice</CardDescription>
       {/* Toggle Buttons */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setCurrentTab('monthly')}
            style={{
              fontSize: '6pt',
              padding: '5px 7px',
              width: '70px',
              backgroundColor: currentTab === 'monthly' ? '#6b46c1' : '#e5e7eb',
              border: 'none',
              borderRadius: '8px 0 0 8px',
              color: currentTab === 'monthly' ? 'white' : 'black',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setCurrentTab('every3months')}
            style={{
              fontSize: '6pt',
              padding: '5px 7px',  
              width: '70px',   
              backgroundColor: currentTab === 'every3months' ? '#6b46c1' : '#e5e7eb',
              border: 'none',
              borderRadius: '0 8px 8px 0',
              color: currentTab === 'every3months' ? 'white' : 'black',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease',
            }}
          >
            Every 3 months
          </button>
        </div>

       {/* Monthly Pricing or 3 Months Pricing Toggle*/}
       {currentTab === 'monthly' && (<CardPrice style={{ marginTop: '10px'}}>$14.99<span style={{ fontSize: '16px' }}>/month</span></CardPrice> )}
       {currentTab === 'every3months' && (<CardPrice style={{ marginTop: '10px'}}>$35.99<span style={{ fontSize: '16px' }}>/3 months</span></CardPrice>)}
       </DescriptionPriceContainer>
       <CardButton>Upgrade</CardButton>
       <CardButton style={{display: 'none'}}>Subscribed</CardButton> 

       <BulletPointContainer>
        <BulletContainerTitle>Includes:</BulletContainerTitle>      
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Detailed profile</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Apply to unlimited jobs</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Automated application tracker & status updates</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Get amplified to recruiters</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Salary transparency & insights</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />AI-powered job match scores</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} />Personalized career advice</BulletPoint>
       </BulletPointContainer>
     </Card>   
    </div>
  </div>
)}








      {activeTab === 'notifications' && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Notification Preferences</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Customize your preferred notification settings.</p>

          <Checkbox label="Applications" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for jobs that you have applied to</p>

          <Checkbox label="Job Matches" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for job openings that the AI has matched you with </p>

          <Checkbox label="Recommendations" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for personalized recommendations from Arena</p>

          <Button style={{ marginTop: '10px' }}>Update Notifications</Button>
        </div>
      )}
    </div>
    </ContentContainer>
    </PageContainer>
    </PageWrapper>
  );
}
