
import React from 'react';
import { TestCase } from '@/utils/types/testTypes';
import StatusBadge from '../ui/StatusBadge';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface TestCaseInformationProps {
  testCase: TestCase;
}

const TestCaseInformation: React.FC<TestCaseInformationProps> = ({ testCase }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{testCase.title}</span>
          <StatusBadge status={testCase.status} />
        </CardTitle>
        <CardDescription>
          {testCase.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Steps to Reproduce</h3>
          <ol className="list-decimal pl-6 space-y-1">
            {testCase.stepsToReproduce.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Expected Results</h3>
          <p className="text-gray-700">{testCase.expectedResults}</p>
        </div>
      </CardContent>
    </>
  );
};

export default TestCaseInformation;
