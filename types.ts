export interface Coordinates {
  x: number;
  y: number;
}

export type ClusterId = 'FND' | 'PER' | 'MAP' | 'PLC' | 'LRN' | 'EMB' | 'HMS';

export interface Cluster {
  id: ClusterId;
  name: string;
  color: string;
}

export interface Reference {
  id: string;
  type: 'paper' | 'book' | 'survey' | 'dataset' | 'code' | 'tutorial';
  title: string;
  authors: string[];
  year: number;
  url?: string;
  tags?: string[];
  access?: string;
}

export interface NodeData {
  id: string;
  kind: 'leaf' | 'cluster' | 'root';
  parent: ClusterId | 'ROOT';
  name: string;
  one_liner: string;
  tags: string[];
  keywords: string[];
  difficulty: number; // 1-5
  prerequisites: string[]; // Node IDs
  canonical_refs: string[]; // Ref IDs
  recent_refs: string[]; // Ref IDs
  coords: Coordinates;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: 'enables' | 'uses' | 'related_to';
}

export interface Dataset {
  nodes: NodeData[];
  edges: EdgeData[];
  refs: Record<string, Reference>;
  clusters: Record<ClusterId, Cluster>;
}