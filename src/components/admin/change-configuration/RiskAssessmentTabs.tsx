
import React from 'react';
import RiskTabs from './components/RiskTabs';
import RiskQuestionsContent from './components/RiskQuestionsContent';
import RiskThresholdsContent from './components/RiskThresholdsContent';

const RiskAssessmentTabs: React.FC = () => {
  return (
    <RiskTabs>
      <RiskQuestionsContent />
      <RiskThresholdsContent />
    </RiskTabs>
  );
};

export default RiskAssessmentTabs;
