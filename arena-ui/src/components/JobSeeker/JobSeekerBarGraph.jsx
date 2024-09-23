import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const BarContainer = styled.div`
  margin-bottom: 10px;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;

const BarOuter = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const BarInner = styled.div`
  height: 20px;
  background-color: ${props => props.color};
  width: ${props => props.width}%;
`;

const TotalLabel = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
`;

const data = [
  { label: 'Shortlisted', value: 15, color: '#4CAF50' },
  { label: 'Interview', value: 10, color: '#2196F3' },
  { label: 'Rejected', value: 7, color: '#F44336' },
  { label: 'Unreviewed', value: 10, color: '#FFC107' },
];

const JobSeekerBarGraph = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <GraphContainer>
      {data.map((item) => (
        <BarContainer key={item.label}>
          <BarLabel>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </BarLabel>
          <BarOuter>
            <BarInner color={item.color} width={(item.value / total) * 100} />
          </BarOuter>
        </BarContainer>
      ))}
      <TotalLabel>Total: {total}</TotalLabel>
    </GraphContainer>
  );
}

export default JobSeekerBarGraph;
