import React, { useState } from 'react';
import JobSeekerNav from './JobSeekerNav';
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

  export default function JobSeekerSettings() {
   

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

   
  return (
    <PageWrapper>
    <NavbarWrapper>
      <JobSeekerNav />
    </NavbarWrapper>
    <PageContainer>
      <ContentContainer>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Account Settings</h1>
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




{/* 
      {activeTab === 'billing' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#6b7280' }}>Billing details will be implemented here.</p>
        </div>
      )} */}
      
      {activeTab === 'billing' && (
 <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
 {/* Toggle Buttons */}
 <div style={{ textAlign: 'center' }}>
   <button
     onClick={() => setCurrentTab('monthly')}
     style={{
       padding: '10px 20px',
       margin: '10px',
       backgroundColor: currentTab === 'monthly' ? '#9f7aea' : '#e5e7eb',
       border: 'none',
       color: currentTab === 'monthly' ? 'white' : 'black',
       cursor: 'pointer',
     }}
   >
     Monthly
   </button>
   <button
     onClick={() => setCurrentTab('every3months')}
     style={{
       padding: '10px 20px',
       margin: '10px',
       backgroundColor: currentTab === 'every3months' ? '#9f7aea' : '#e5e7eb',
       border: 'none',
       color: currentTab === 'every3months' ? 'white' : 'black',
       cursor: 'pointer',
     }}
   >
     Every 3 months
   </button>
 </div>

 {/* Monthly Plan */}
 {currentTab === 'monthly' && (
   <div style={{ textAlign: 'center', padding: '20px' }}>
     <div
       style={{
         display: 'inline-block',
         width: '280px',
         padding: '20px',
         border: '1px solid #ccc',
         borderRadius: '10px',
         backgroundColor: '#1f2937',
         color: 'white',
         margin: '20px',
         transition: 'transform 0.2s', 
         transform: selectedCard === 'basic' ? 'scale(1.05)' : 'scale(1)', 
         boxShadow: selectedCard === 'basic' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none', 
         cursor: 'pointer',
       }}
       onClick={() => setSelectedCard('basic')} 
     >
       <h2>Arena</h2>
       <p>Apply for jobs and track your progress for free, forever</p>
       <h3 style={{ fontSize: '32px', margin: '10px 0' }}>$0 <span style={{ fontSize: '16px' }}>per month</span></h3>
       <button style={{ padding: '10px 20px', backgroundColor: '#9f7aea', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Subscribe</button>
       <h3 style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>This Includes:</h3>
       <div style={{ textAlign: 'left', padding: '10px' }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Detailed profile</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Apply to unlimited jobs</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Automated application tracker & status updates</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Get amplified to recruiters</span>
         </div>
       </div>
     </div>

     <div
       style={{
         display: 'inline-block',
         width: '280px',
         padding: '20px',
         border: '1px solid #ccc',
         borderRadius: '10px',
         backgroundColor: '#1f2937',
         color: 'white',
         margin: '20px',
         transition: 'transform 0.2s',
         transform: selectedCard === 'pro' ? 'scale(1.05)' : 'scale(1)',
         boxShadow: selectedCard === 'pro' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
         cursor: 'pointer',
       }}
       onClick={() => setSelectedCard('pro')}
     >
       <h2>Arena PRO <span style={{ backgroundColor: '#111827', color: '#9f7aea', padding: '5px', borderRadius: '5px', fontSize: '12px' }}>Most popular</span></h2>
       <p>Land your dream job faster with personalized insights & advice (7-day free trial included)</p>
       <h3 style={{ fontSize: '32px', margin: '10px 0' }}>$14.99 <span style={{ fontSize: '16px' }}>per month</span></h3>
       <button style={{ padding: '10px 20px', backgroundColor: '#9f7aea', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Start trial</button>
       <h3 style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>This Includes:</h3>
       <div style={{ textAlign: 'left', padding: '10px' }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Detailed profile</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Apply to unlimited jobs</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Automated application tracker & status updates</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Get amplified to recruiters</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>AI-powered job match scores</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Personalized career advice</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
           <span>Salary transparency & insights</span>
         </div>
       </div>
     </div>
   </div>
 )}

 {/* Every 3 Months Plan */}
 {currentTab === 'every3months' && (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            width: '280px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#1f2937',
            color: 'white',
            margin: '20px',
            transition: 'transform 0.2s',
            transform: selectedCard === 'pro' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedCard === 'pro' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedCard('pro')} 
        >
          <h2>Arena PRO <span style={{ backgroundColor: '#111827', color: '#9f7aea', padding: '5px', borderRadius: '5px', fontSize: '12px' }}>Most popular</span></h2>
          <p>Land your dream job faster with personalized insights & advice (7-day free trial included)</p>
          <h3 style={{ fontSize: '32px', margin: '10px 0' }}>$39.99 <span style={{ fontSize: '16px' }}>every 3 months</span></h3>
          <button style={{ padding: '10px 20px', backgroundColor: '#9f7aea', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Start trial</button>
          <h3 style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>This Includes:</h3>
          <div style={{ textAlign: 'left', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Detailed profile</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Apply to unlimited jobs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Automated application tracker & status updates</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Get amplified to recruiters</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>AI-powered job match scores</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Personalized career advice</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
              <span>Salary transparency & insights</span>
            </div>
          </div>
        </div>
      </div>
    )}
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
