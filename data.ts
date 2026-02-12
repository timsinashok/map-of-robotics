import { Dataset, Cluster, NodeData, Reference, EdgeData } from './types';

export const CLUSTERS: Record<string, Cluster> = {
  FND: { id: 'FND', name: 'Foundations & Tools', color: '#94a3b8' }, // Slate
  PER: { id: 'PER', name: 'Perception & Reps', color: '#f472b6' }, // Pink
  MAP: { id: 'MAP', name: 'Localization & Mapping', color: '#c084fc' }, // Purple
  PLC: { id: 'PLC', name: 'Planning & Control', color: '#60a5fa' }, // Blue
  LRN: { id: 'LRN', name: 'Robot Learning', color: '#fbbf24' }, // Amber
  EMB: { id: 'EMB', name: 'Embodied Skills', color: '#34d399' }, // Emerald
  HMS: { id: 'HMS', name: 'Human & Multi-Robot', color: '#f87171' }, // Red
};

// Simplified Ref database for demo purposes (would be larger in prod)
const REFS: Record<string, Reference> = {
  R001: { id: 'R001', type: 'book', title: 'Modern Robotics', authors: ['Lynch', 'Park'], year: 2017, url: 'https://hades.mech.northwestern.edu/images/7/7f/MR.pdf' },
  R002: { id: 'R002', type: 'book', title: 'Probabilistic Robotics', authors: ['Thrun', 'et al'], year: 2005 },
  R010: { id: 'R010', type: 'survey', title: 'SLAM: Past, Present, and Future', authors: ['Cadena', 'et al'], year: 2016 },
  R013: { id: 'R013', type: 'paper', title: 'Probabilistic Roadmaps', authors: ['Kavraki', 'et al'], year: 1996 },
  R025: { id: 'R025', type: 'paper', title: 'Diffusion Policy', authors: ['Chi', 'et al'], year: 2023, url: 'https://diffusion-policy.cs.columbia.edu/' },
  R028: { id: 'R028', type: 'paper', title: 'RT-1: Robotics Transformer', authors: ['Google'], year: 2022 },
  R146: { id: 'R146', type: 'paper', title: 'PaLM-E', authors: ['Driess', 'et al'], year: 2023 },
  R006: { id: 'R006', type: 'survey', title: 'Factor Graphs for Robot Perception', authors: ['Dellaert', 'Kaess'], year: 2017 },
  R048: { id: 'R048', type: 'paper', title: 'Rigid Body Dynamics Algorithms', authors: ['Featherstone'], year: 2008 },
};

// Combining the explicit JSON list with the Coordinate Table from markdown
const RAW_NODES: Partial<NodeData>[] = [
  // FND
  { id: "N01", parent: "FND", name: "Kinematics & Lie groups", coords: { x: -0.90, y: -0.20 }, one_liner: "Geometry of motion using SE(3)/SO(3)." },
  { id: "N02", parent: "FND", name: "Dynamics & rigid-body", coords: { x: -0.90, y: -0.50 }, one_liner: "Inertia, Coriolis, gravity for prediction." },
  { id: "N03", parent: "FND", name: "Contact & friction modeling", coords: { x: -0.85, y: -0.55 }, one_liner: "Interactions, sticking/sliding, impacts." },
  { id: "N04", parent: "FND", name: "Numerical optimization", coords: { x: -0.75, y: -0.30 }, one_liner: "Solving robotics as constrained optimization." },
  { id: "N05", parent: "FND", name: "Optimal control (DDP/iLQR)", coords: { x: -0.80, y: -0.45 }, one_liner: "Locally optimal feedback policies." },
  { id: "N06", parent: "FND", name: "MPC / MPPI", coords: { x: -0.75, y: -0.55 }, one_liner: "Receding horizon online planning." },
  { id: "N07", parent: "FND", name: "State estimation", coords: { x: -0.65, y: -0.15 }, one_liner: "Fuse noisy sensors into state estimates." },
  { id: "N08", parent: "FND", name: "Factor graphs", coords: { x: -0.60, y: -0.05 }, one_liner: "Sparse probabilistic inference graphs." },
  { id: "N09", parent: "FND", name: "Middleware & sim", coords: { x: -0.15, y: -0.10 }, one_liner: "ROS, Gazebo, MuJoCo infrastructure." },

  // PER
  { id: "N10", parent: "PER", name: "Geometric vision", coords: { x: -0.55, y: 0.10 }, one_liner: "Structure and motion from images." },
  { id: "N11", parent: "PER", name: "Point clouds & LiDAR", coords: { x: -0.35, y: 0.10 }, one_liner: "3D geometry from depth sensors." },
  { id: "N12", parent: "PER", name: "Learned 3D perception", coords: { x: 0.35, y: 0.10 }, one_liner: "Features from point sets (PointNet)." },
  { id: "N13", parent: "PER", name: "Neural implicit (NeRF)", coords: { x: 0.55, y: 0.15 }, one_liner: "Continuous neural fields for rendering." },
  { id: "N14", parent: "PER", name: "Open-vocab perception", coords: { x: 0.70, y: 0.35 }, one_liner: "Detect unseen objects via language." },
  { id: "N15", parent: "PER", name: "Object pose estimation", coords: { x: -0.10, y: 0.20 }, one_liner: "Infer 6D pose for manipulation." },
  { id: "N16", parent: "PER", name: "Tactile sensing", coords: { x: -0.05, y: 0.05 }, one_liner: "Touch for contact geometry/forces." },
  { id: "N17", parent: "PER", name: "Active perception", coords: { x: -0.10, y: 0.30 }, one_liner: "Move to sense better." },

  // MAP
  { id: "N18", parent: "MAP", name: "SLAM paradigms", coords: { x: -0.55, y: 0.25 }, one_liner: "Estimate trajectory + map jointly." },
  { id: "N19", parent: "MAP", name: "Pose graph + loops", coords: { x: -0.55, y: 0.20 }, one_liner: "Global consistency via optimization." },
  { id: "N20", parent: "MAP", name: "Visual SLAM", coords: { x: -0.45, y: 0.20 }, one_liner: "Camera tracking (ORB-SLAM)." },
  { id: "N21", parent: "MAP", name: "VIO", coords: { x: -0.35, y: 0.15 }, one_liner: "Visual-inertial odometry." },
  { id: "N22", parent: "MAP", name: "LiDAR SLAM", coords: { x: -0.35, y: 0.15 }, one_liner: "Large-scale mapping with lasers." },
  { id: "N23", parent: "MAP", name: "Learning-based SLAM", coords: { x: 0.35, y: 0.25 }, one_liner: "Deep depth/flow for robustness." },
  { id: "N24", parent: "MAP", name: "Neural mapping", coords: { x: 0.55, y: 0.25 }, one_liner: "NeRF-SLAM / 3DGS mapping." },
  { id: "N25", parent: "MAP", name: "Multi-robot mapping", coords: { x: -0.30, y: 0.35 }, one_liner: "Collaborative SLAM." },

  // PLC
  { id: "N26", parent: "PLC", name: "Search-based planning", coords: { x: -0.70, y: 0.35 }, one_liner: "A*, D*, graph search." },
  { id: "N27", parent: "PLC", name: "Sampling-based planning", coords: { x: -0.60, y: 0.25 }, one_liner: "RRT, PRM for high dimensions." },
  { id: "N28", parent: "PLC", name: "TrajOpt planners", coords: { x: -0.55, y: 0.10 }, one_liner: "Direct trajectory optimization." },
  { id: "N29", parent: "PLC", name: "Learning-based planning", coords: { x: 0.25, y: 0.20 }, one_liner: "Learned heuristics/priors." },
  { id: "N30", parent: "PLC", name: "TAMP", coords: { x: -0.20, y: 0.55 }, one_liner: "Task and Motion Planning." },
  { id: "N31", parent: "PLC", name: "Planning under uncertainty", coords: { x: -0.35, y: 0.60 }, one_liner: "POMDPs and belief space." },
  { id: "N32", parent: "PLC", name: "Compliant force control", coords: { x: -0.70, y: -0.25 }, one_liner: "Impedance/admittance control." },
  { id: "N33", parent: "PLC", name: "Whole-body control", coords: { x: -0.45, y: -0.35 }, one_liner: "Humanoids and legged WBC." },

  // LRN
  { id: "N34", parent: "LRN", name: "Behavior cloning", coords: { x: 0.30, y: 0.10 }, one_liner: "Supervised imitation learning." },
  { id: "N35", parent: "LRN", name: "Interactive imitation", coords: { x: 0.35, y: 0.25 }, one_liner: "DAgger, human-in-the-loop." },
  { id: "N36", parent: "LRN", name: "Inverse RL", coords: { x: 0.45, y: 0.45 }, one_liner: "Infer objective from expert." },
  { id: "N37", parent: "LRN", name: "Representation learning", coords: { x: 0.55, y: 0.15 }, one_liner: "Self-supervised features." },
  { id: "N38", parent: "LRN", name: "On-policy RL", coords: { x: 0.55, y: 0.05 }, one_liner: "PPO, Policy Gradients." },
  { id: "N39", parent: "LRN", name: "Off-policy RL", coords: { x: 0.60, y: 0.05 }, one_liner: "SAC, Replay Buffers." },
  { id: "N40", parent: "LRN", name: "Offline RL", coords: { x: 0.65, y: 0.10 }, one_liner: "Learning from static datasets." },
  { id: "N41", parent: "LRN", name: "Model-based RL", coords: { x: 0.55, y: 0.20 }, one_liner: "World models and dreaming." },
  { id: "N42", parent: "LRN", name: "Sim-to-real", coords: { x: 0.35, y: 0.05 }, one_liner: "Domain randomization." },
  { id: "N43", parent: "LRN", name: "Meta-learning", coords: { x: 0.45, y: -0.05 }, one_liner: "Rapid adaptation." },
  { id: "N44", parent: "LRN", name: "Multi-task learning", coords: { x: 0.60, y: 0.25 }, one_liner: "Generalist policies." },
  { id: "N45", parent: "LRN", name: "Lang-conditioned manip", coords: { x: 0.70, y: 0.55 }, one_liner: "Instruction following." },
  { id: "N46", parent: "LRN", name: "Generative policies", coords: { x: 0.70, y: 0.15 }, one_liner: "Diffusion for action sequences." },
  { id: "N47", parent: "LRN", name: "Foundation policies", coords: { x: 0.75, y: 0.35 }, one_liner: "Large scale multi-task models." },
  { id: "N48", parent: "LRN", name: "VLA models", coords: { x: 0.80, y: 0.55 }, one_liner: "Vision-Language-Action." },

  // EMB
  { id: "N49", parent: "EMB", name: "Grasp synthesis", coords: { x: 0.10, y: 0.05 }, one_liner: "Predicting stable grasps." },
  { id: "N50", parent: "EMB", name: "Contact-rich manip", coords: { x: 0.15, y: -0.10 }, one_liner: "Insertion, tools, assembly." },
  { id: "N51", parent: "EMB", name: "Deformable manip", coords: { x: 0.25, y: 0.10 }, one_liner: "Cloth, rope, liquids." },
  { id: "N52", parent: "EMB", name: "Dexterous in-hand", coords: { x: 0.25, y: -0.15 }, one_liner: "Multi-finger reorientation." },
  { id: "N53", parent: "EMB", name: "Bimanual manipulation", coords: { x: 0.35, y: -0.05 }, one_liner: "Dual-arm coordination." },
  { id: "N54", parent: "EMB", name: "Mobile manipulation", coords: { x: 0.35, y: 0.35 }, one_liner: "Base + Arm coordination." },
  { id: "N55", parent: "EMB", name: "Legged locomotion", coords: { x: 0.35, y: -0.45 }, one_liner: "Dynamic walking/running." },
  { id: "N56", parent: "EMB", name: "Aerial robotics", coords: { x: -0.20, y: -0.35 }, one_liner: "Drones and 3D motion." },

  // HMS
  { id: "N57", parent: "HMS", name: "HRI", coords: { x: 0.15, y: 0.80 }, one_liner: "Human-Robot Interaction." },
  { id: "N58", parent: "HMS", name: "Shared autonomy", coords: { x: 0.20, y: 0.65 }, one_liner: "Blending human/robot intent." },
  { id: "N59", parent: "HMS", name: "MRTA", coords: { x: -0.05, y: 0.65 }, one_liner: "Task allocation." },
  { id: "N60", parent: "HMS", name: "Swarm robotics", coords: { x: -0.15, y: 0.70 }, one_liner: "Local rules, global behavior." },
];

export const NODES: NodeData[] = RAW_NODES.map(n => ({
  kind: 'leaf',
  tags: [],
  keywords: [],
  difficulty: 3,
  prerequisites: [],
  canonical_refs: [],
  recent_refs: [],
  ...n
} as NodeData));

export const EDGES: EdgeData[] = [
  { id: "E1", source: "N07", target: "N18", type: "enables" },
  { id: "E2", source: "N08", target: "N19", type: "enables" },
  { id: "E3", source: "N13", target: "N24", type: "enables" },
  { id: "E4", source: "N29", target: "N27", type: "related_to" },
  { id: "E5", source: "N46", target: "N29", type: "enables" },
  { id: "E6", source: "N46", target: "N34", type: "related_to" },
  { id: "E7", source: "N48", target: "N45", type: "enables" },
  { id: "E8", source: "N58", target: "N30", type: "uses" },
  { id: "E9", source: "N59", target: "N60", type: "related_to" },
  // Implicit connections from proximity/domain
  { id: "E10", source: "N01", target: "N02", type: "enables" },
  { id: "E11", source: "N34", target: "N46", type: "related_to" },
  { id: "E12", source: "N10", target: "N11", type: "related_to" },
  { id: "E13", source: "N38", target: "N39", type: "related_to" },
];

export const FULL_DATASET: Dataset = {
  nodes: NODES,
  edges: EDGES,
  refs: REFS,
  clusters: CLUSTERS
};