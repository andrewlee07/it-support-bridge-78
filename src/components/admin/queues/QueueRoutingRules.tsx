
import React from 'react';

const QueueRoutingRules: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Queue Routing Rules</h3>
      </div>
      {/* Routing rules implementation will go here */}
      <p className="text-muted-foreground">Configure how tickets are automatically routed to queues.</p>
    </div>
  );
};

export default QueueRoutingRules;
