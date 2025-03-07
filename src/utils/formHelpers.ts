
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate unique IDs for form fields
export const generateFieldId = (): string => {
  return uuidv4();
};

// Default answer option template for risk assessment questions
export const getDefaultAnswerOption = () => {
  return {
    id: `option-${uuidv4()}`,
    text: '',
    value: 1
  };
};

// Default question template
export const getDefaultQuestion = () => {
  return {
    id: `question-${uuidv4()}`,
    question: '',
    weight: 0.5,
    isRequired: true,
    active: true,
    answers: [
      getDefaultAnswerOption(),
      getDefaultAnswerOption()
    ]
  };
};

// Helper to ensure risk thresholds always have IDs
export const ensureThresholdId = (threshold: any): any => {
  if (!threshold.id) {
    return {
      ...threshold,
      id: `threshold-${uuidv4()}`
    };
  }
  return threshold;
};
