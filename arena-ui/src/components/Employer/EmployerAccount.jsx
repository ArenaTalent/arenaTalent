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
  width: 250px;
  background-color: #f3f4f6;
`

const PageContainer = styled.div`
  flex-grow: 1;
  background-color: #f3f4f6;
  overflow-y: auto;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 2rem;
  position: relative;
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
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
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '100px', 
      marginTop: '32px',
      width: '100%',
      // maxWidth: '1400px',
      margin: '0 auto',
    }}
  >
    {/* Starter Plan */}
    <div
      style={{
        padding: '40px',
        backgroundColor: selectedPlan === 'starter' ? '#E6D6F1' : '#f3f4f6',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '350px', 
        flex: '1', 
        transform: selectedPlan === 'starter' ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onClick={() => handlePlanClick('starter')}
    >
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Starter</h2>
        <p style={{ fontSize: '14px', color: '#6b46c1', marginBottom: '16px' }}>
          Try Arena free for 14 days
        </p>
        <p style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>
          $0 <span style={{ fontSize: '14px' }}>(Start trial)</span>
        </p>
        <button style={{ backgroundColor: '#6b46c1', color: '#ffffff', fontWeight: 'bold', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>
          Start Trial
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>This Includes:</h3>
        <ul style={{ marginBottom: '24px', padding: '0', listStyleType: 'none' }}>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> 1 recruiter seat</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> 1 unique job slot</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool (limited)</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging (10 max)</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</li>
        </ul>
      </div>
    </div>

    {/* Premium Plan */}
    <div
      style={{
        padding: '40px',
        backgroundColor: selectedPlan === 'premium' ? '#E6D6F1' : '#f3f4f6',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%', 
        maxWidth: '350px', 
        flex: '1', 
        transform: selectedPlan === 'premium' ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onClick={() => handlePlanClick('premium')}
    >
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Premium</h2>
        <p style={{ fontSize: '14px', color: '#6b46c1', marginBottom: '16px' }}>
          For smaller companies & nonprofits
        </p>
        <p style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>$750/month</p>
        <button style={{ backgroundColor: '#6b46c1', color: '#ffffff', fontWeight: 'bold', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>
          Book a demo
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>This Includes:</h3>
        <ul style={{ marginBottom: '24px', padding: '0', listStyleType: 'none' }}>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> 2 recruiter seats</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> 5 rotating job slots</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Dedicated account support</li>
        </ul>
      </div>
    </div>

    {/* Enterprise Plan */}
    <div
      style={{
        padding: '40px',
        backgroundColor: selectedPlan === 'enterprise' ? '#E6D6F1' : '#f3f4f6',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid #6b46c1',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%', 
        maxWidth: '350px', 
        flex: '1', 
        transform: selectedPlan === 'enterprise' ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onClick={() => handlePlanClick('enterprise')}
    >
      <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#6b46c1', color: '#ffffff', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold' }}>
        Most Popular
      </span>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Enterprise</h2>
        <p style={{ fontSize: '14px', color: '#6b46c1', marginBottom: '16px' }}>
          Schedule a demo about our flexible pricing plans
        </p>
        <p style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>Custom</p>
        <button style={{ backgroundColor: '#6b46c1', color: '#ffffff', fontWeight: 'bold', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>
          Schedule a demo
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>This Includes:</h3>
        <ul style={{ marginBottom: '24px', padding: '0', listStyleType: 'none' }}>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Unlimited recruiter seats</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Unlimited job slots</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Employer profile</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI applicant matches</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> AI candidate sourcing tool</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Real-time candidate insights</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Direct messaging</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Applicant tracking</li>
          <li style={{ lineHeight: '1.6' }}><FontAwesomeIcon icon={faCheckCircle} /> Dedicated account support</li>
        </ul>
      </div>
    </div>
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
