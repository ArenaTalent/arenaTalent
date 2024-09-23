import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const Card = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const CardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #1a202c;
`

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  background-color: ${props => props.active ? '#805ad5' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: ${props => props.active ? '#805ad5' : '#f7fafc'};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  gap: 1px;
  background-color: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`

const CalendarCell = styled.div`
  background-color: ${props =>
    props.isHeader ? '#f7fafc' :
    props.isToday ? '#ebf4ff' : 'white'};
  padding: 8px;
  text-align: ${props => props.isTimeCell ? 'right' : 'center'};
  font-weight: ${props => props.isHeader || props.isToday ? 'bold' : 'normal'};
  color: ${props => props.isTimeCell ? '#718096' : '#1a202c'};
  font-size: ${props => props.isTimeCell ? '12px' : '14px'};
  ${props => !props.isHeader && !props.isTimeCell && 'height: 60px;'}
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isHeader ? 'center' : 'flex-start'};
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`

export default function InterviewSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 22)) // September 22, 2024
  const [view, setView] = useState('week')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }

    return dates
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const handlePrevWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() - 7)
      return newDate
    })
  }

  const handleNextWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + 7)
      return newDate
    })
  }

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Schedule</CardTitle>
        <ButtonGroup>
          <Button onClick={handlePrevWeek}><ChevronLeft size={16} /></Button>
          <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <Button onClick={handleNextWeek}><ChevronRight size={16} /></Button>
        </ButtonGroup>
      </CardHeader>
      <ButtonGroup style={{ marginBottom: '20px' }}>
        <Button>
          <Plus size={16} />
          New Interview
        </Button>
        <ButtonGroup>
          {['day', 'week', 'month'].map((v) => (
            <Button key={v} active={view === v} onClick={() => setView(v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonGroup>
      <CalendarGrid>
        <CalendarCell isHeader>GMT +07</CalendarCell>
        {getWeekDates().map((date, index) => (
          <CalendarCell key={index} isHeader isToday={isToday(date)}>
            <div>{daysOfWeek[date.getDay()]}</div>
            <div style={{ fontSize: '24px' }}>{date.getDate()}</div>
            {isToday(date) && <div style={{ fontSize: '12px', color: '#4299e1' }}>Today</div>}
          </CalendarCell>
        ))}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <CalendarCell isTimeCell>
              {formatHour(hour)}
            </CalendarCell>
            {Array(7).fill(null).map((_, index) => (
              <CalendarCell key={index} />
            ))}
          </React.Fragment>
        ))}
      </CalendarGrid>
    </Card>
  )
}
