import React from 'react'
import styled from 'styled-components'
import { CalendarDays } from 'lucide-react'

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #6366f1, #a855f7);
  padding: 20px;
`

const ContentBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 32px;
  text-align: center;
  max-width: 32rem;
  width: 100%;
`

const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
`

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #3730a3;
  margin-bottom: 1rem;
  margin-top: -20px;
  white-space: nowrap;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const DateText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4f46e5;
  margin-left: 0.5rem;
`

const Message = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`

const InfoBox = styled.div`
  background-color: #e0e7ff;
  border-radius: 8px;
  padding: 1rem;
`

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #3730a3;

  a {
    color: #4f46e5;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Component() {
  return (
    <PageContainer>
      <ContentBox>
        <Logo src="/images/black-logo.png" alt="Arena x MSBC Logo" />
        <Title>Arena x MSBC</Title>
        <DateContainer>
          <CalendarDays size={24} color="#4f46e5" />
          <DateText>Your Login Will Be Available on October 18th</DateText>
        </DateContainer>
        <Message>
          We look forward to seeing you at the event!
        </Message>
        <InfoBox>
          <InfoText>
          Please check your email for additional information and updates regarding Arena or email us at{' '}
            <a href="mailto:support@arenatalent.com">support@arenatalent.com</a>
          </InfoText>
        </InfoBox>
      </ContentBox>
    </PageContainer>
  )
}
