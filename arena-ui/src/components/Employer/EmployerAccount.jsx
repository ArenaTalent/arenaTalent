import React, { useState } from 'react';
import EmployerNav from './EmployerNav';
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
  background-color: #f3f4f6;
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
  margin-bottom: 10px; 
  position: relative;
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

  export default function EmployerAccount() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('john@email.com');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


     const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

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


  return (
    <PageWrapper>
    <NavbarWrapper>
      <EmployerNav />
    </NavbarWrapper>
    <PageContainer>
      <ContentContainer>
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Account Settings</h1>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Manage your employer account preferences</p>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '20px' }}>
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

      {/* {activeTab === 'billing' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#6b7280' }}>Billing details will be implemented here.</p>
        </div>
      )} */}
{activeTab === 'billing' && (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center'}}>
    {/* Starter Plan */}
    <Card onClick={() => handlePlanClick('starter')}>
      <TableTitle>Starter</TableTitle>
      <CardDescription>Try Arena free for 14 days</CardDescription>
      <CardPrice>$0 <span style={{ fontSize: '14px' }}>(Start trial)</span></CardPrice>
      <CardButton>Start Trial</CardButton>

      <BulletPointContainer>  
        <BulletContainerTitle>Includes:</BulletContainerTitle>      
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> 1 recruiter seat</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> 1 unique job slot</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool (limited)</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging (10 max)</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</BulletPoint>
      </BulletPointContainer>
    </Card>

    {/* Premium Plan */}
    <Card onClick={() => handlePlanClick('premium')}>

      <TableTitle>Premium</TableTitle>
      <CardDescription>For smaller companies & nonprofits</CardDescription>
      <CardPrice>$750<span style={{ fontSize: '16px' }}>/month</span></CardPrice>
      <CardButton>Book a demo</CardButton>

      <BulletPointContainer>
        <BulletContainerTitle>Includes:</BulletContainerTitle>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> 2 recruiter seats</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> 5 rotating job slots</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Dedicated account support</BulletPoint>
      </BulletPointContainer>
    </Card>

    {/* Enterprise Plan */}
    <Card style ={{border: '2px solid #6b46c1'}} onClick={() => handlePlanClick('enterprise')}>
      <MostPopularTag>Most Popular</MostPopularTag>
      <TableTitle>Enterprise</TableTitle>
      <CardDescription>Schedule a demo to learn about our flexible pricing plans</CardDescription>
      <CardPrice>Custom</CardPrice>
      <CardButton>Book a demo</CardButton>

      
      <BulletPointContainer>
        <BulletContainerTitle>Includes:</BulletContainerTitle>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Unlimited recruiter seats</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Unlimited job slots</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Dedicated account support</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Custom ATS Integration</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Featured jobs on platform</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Featured jobs on social</BulletPoint>
        <BulletPoint><FontAwesomeIcon icon={faCheckCircle} /> Access to recruiting events</BulletPoint>
      </BulletPointContainer>
    </Card>
  </div>
)}


























      {activeTab === 'notifications' && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Notification Preferences</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Customize your preferred notification settings.</p>

          <Checkbox label="Matches" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for personalized recommendations of job seekers that fit your preferences</p>


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
