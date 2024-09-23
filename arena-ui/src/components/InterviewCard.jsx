import React from 'react';
import styled from 'styled-components';
import { Calendar as CalendarIcon } from 'lucide-react';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const ScheduleContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const DayHeader = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
`;

const TimeSlot = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  color: #757575;

  &:last-child {
    border-bottom: none;
  }
`;

const NoInterviews = styled.div`
  padding: 20px;
  text-align: center;
  color: #757575;
`;

const InterviewCard = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <CardContainer>
      <CardHeader>
        <CalendarIcon size={24} />
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <ScheduleContainer>
        <DayHeader>{formattedDate}</DayHeader>
        <NoInterviews>No interviews scheduled for today</NoInterviews>
      </ScheduleContainer>
    </CardContainer>
  );
}

export default InterviewCard;
