
// Define types for the service topology visualization
export type TopologyNode = {
  id: string;
  name: string;
  category: string;
  status: string;
  value: number; // Used for size in visualizations
  color?: string;
};

export type TopologyLink = {
  source: string;
  target: string;
  value: number; // Link strength
  type: string;
};

export type TopologyData = {
  nodes: TopologyNode[];
  links: TopologyLink[];
};
