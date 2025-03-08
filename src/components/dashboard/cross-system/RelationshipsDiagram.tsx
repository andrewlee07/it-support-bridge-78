
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelationshipData } from '@/utils/types/dashboard';
import { Relationship } from 'lucide-react';

interface RelationshipsDiagramProps {
  data: RelationshipData;
}

const RelationshipsDiagram: React.FC<RelationshipsDiagramProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Relationship className="h-5 w-5" />
          <span>Cross-Domain Relationships</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              Visualizing relationships between domains:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data.nodes.map((node) => (
                <div key={node.id} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">{node.value}</span>
                  </div>
                  <p className="text-sm">{node.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                {data.links.length} connections between domains
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipsDiagram;
