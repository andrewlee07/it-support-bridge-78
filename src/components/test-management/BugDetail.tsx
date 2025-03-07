
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bug } from '@/utils/types/testTypes';
import { Badge } from '@/components/ui/badge';
import { StatusBadge, SeverityBadge } from './ui/BugBadges';

interface BugDetailProps {
  bug: Bug;
  onClose: () => void;
  onEdit: () => void;
}

const BugDetail: React.FC<BugDetailProps> = ({ bug, onClose, onEdit }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{bug.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <SeverityBadge severity={bug.severity} />
          <StatusBadge status={bug.status} />
          <Badge variant="outline" className="capitalize">
            {bug.priority} priority
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{bug.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Steps to Reproduce</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {bug.stepsToReproduce.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {bug.attachment && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Screenshot</h3>
          <div className="border rounded-md p-2">
            <img 
              src={bug.attachment} 
              alt="Bug screenshot" 
              className="max-h-60 object-contain mx-auto" 
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Reported by:</span> {bug.createdBy}
        </div>
        <div>
          <span className="font-semibold">Reported on:</span> {new Date(bug.createdAt).toLocaleString()}
        </div>
        {bug.assignedDeveloper && (
          <div>
            <span className="font-semibold">Assigned to:</span> {bug.assignedDeveloper}
          </div>
        )}
        <div>
          <span className="font-semibold">Last updated:</span> {new Date(bug.updatedAt).toLocaleString()}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>
          Edit Bug
        </Button>
      </div>
    </div>
  );
};

export default BugDetail;
