import React, { useState } from 'react';
import JobSeekerNav from './JobSeekerNav';
import styled from 'styled-components';


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

  export default function JobSeekerSettings() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('john@email.com');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
      <JobSeekerNav />
    </NavbarWrapper>
    <PageContainer>
      <ContentContainer>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Job Seeker Settings</h1>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Manage your job seeker account preferences</p>

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

      {activeTab === 'billing' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#6b7280' }}>Billing details will be implemented here.</p>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Notification Preferences</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Customize your preferred notification settings.</p>

          <Checkbox label="Applications" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for jobs that you have applied to</p>

          <Checkbox label="Jobs" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for job openings that suit your profile</p>

          <Checkbox label="Recommendations" />
          <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '25px', marginBottom: '15px' }}>These are notifications for personalized recommendations from our recruiters</p>

          <Button style={{ marginTop: '10px' }}>Update Notifications</Button>
        </div>
      )}
    </div>
    </ContentContainer>
    </PageContainer>
    </PageWrapper>
  );
}
