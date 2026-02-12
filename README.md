<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# RoboMap: Interactive Robotics Research Map

An interactive, navigable 2D visualization of the robotics research landscape. Explore 60+ research topics across 7 major domains, from fundamental algorithms to cutting-edge learning-based approaches.

## ✨ Features

- **Interactive Map Visualization** - Navigate through robotics research topics using a D3.js-powered force-directed graph
- **7 Major Research Domains**
  - 🛠️ **Foundations & Tools** - Kinematics, dynamics, optimization, state estimation
  - 👁️ **Perception & Representations** - Vision, point clouds, NeRF, tactile sensing
  - 🗺️ **Localization & Mapping** - SLAM, VIO, neural mapping
  - 🎯 **Planning & Control** - Motion planning, trajectory optimization, MPC
  - 🧠 **Robot Learning** - Imitation learning, RL, foundation models
  - 🤖 **Embodied Skills** - Manipulation, locomotion, mobile robots
  - 👥 **Human & Multi-Robot** - HRI, shared autonomy, swarm robotics

- **Rich Node Details** - Click any topic to view descriptions, difficulty ratings, prerequisites, and research references
- **Smart Search** - Find topics instantly with real-time search filtering
- **Theme Switching** - Toggle between light and dark modes
- **Flexible Layouts** - Switch between horizontal and vertical tree layouts
- **Zoom & Pan** - Navigate large maps with intuitive controls
- **Reference Library** - Access curated papers, books, and surveys for each topic

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/map-of-robotics.git
cd map-of-robotics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🚀 Deployment

### Deploy to GitHub Pages

Deploy your app to GitHub Pages in minutes:

```bash
# Quick deploy (manual method)
npm run deploy
```

For detailed deployment instructions including automated GitHub Actions setup, see [DEPLOYMENT.md](DEPLOYMENT.md).

**Live Demo**: Replace with your GitHub Pages URL after deployment
```
https://YOUR_USERNAME.github.io/map-of-robotics/
```

## 🎮 Usage

### Navigation
- **Click & Drag** - Pan around the map
- **Scroll** - Zoom in/out
- **Click Node** - View detailed information
- **Search Bar** - Type to filter topics
- **Zoom Controls** - Use +/- buttons or fit-to-view

### Exploring Topics
Each node displays:
- **Name** - Research area or technique
- **One-liner** - Quick description
- **Difficulty** - Learning curve (1-5 stars)
- **Prerequisites** - Required background knowledge
- **References** - Key papers, books, and resources

### Themes
Toggle between:
- **Dark Mode** (Tech) - Modern dark UI for extended viewing
- **Light Mode** - Clean, professional appearance

## 📁 Project Structure

```
map-of-robotics/
├── components/
│   ├── MapVisualization.tsx  # D3.js visualization component
│   ├── DetailPanel.tsx        # Node detail sidebar
│   ├── Controls.tsx           # Search, theme, layout controls
│   └── Onboarding.tsx         # User onboarding flow
├── data.ts                    # Research nodes, edges, references
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
├── index.tsx                  # Entry point
├── package.json               # Dependencies and scripts
└── vite.config.ts            # Vite configuration
```

## 🔧 Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **D3.js** - Data visualization and graph layout
- **Vite** - Fast build tool and dev server
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first styling (via inline classes)

## 📊 Data Structure

### Nodes
Each research topic is represented as a node:
```typescript
{
  id: "N01",
  name: "Kinematics & Lie groups",
  parent: "FND", // Cluster ID
  coords: { x: -0.90, y: -0.20 },
  one_liner: "Geometry of motion using SE(3)/SO(3)",
  difficulty: 3,
  prerequisites: ["N01", "N02"],
  canonical_refs: ["R001"],
  tags: ["math", "geometry"]
}
```

### Clusters
Seven major research domains organize the topics:
- `FND` - Foundations & Tools
- `PER` - Perception & Representations
- `MAP` - Localization & Mapping
- `PLC` - Planning & Control
- `LRN` - Robot Learning
- `EMB` - Embodied Skills
- `HMS` - Human & Multi-Robot

### Edges
Relationships between topics:
- `enables` - Topic A enables Topic B
- `uses` - Topic A uses Topic B
- `related_to` - Topics share concepts

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Adding Research Topics
1. Edit `data.ts`
2. Add new node to `RAW_NODES` array
3. Define coordinates, cluster, and metadata
4. Add references to `REFS` if needed
5. Create edges to related topics

### Improving Visualization
- Enhance D3.js layouts in `MapVisualization.tsx`
- Add new interaction modes
- Improve responsive design

### Expanding References
- Add papers, books, tutorials to `REFS`
- Link references to relevant nodes
- Include URLs when available

## 📚 Resources

### Learning Robotics
This map serves as a study guide. Start with:
1. **Foundations & Tools** (FND) - Build mathematical foundations
2. **Perception** (PER) or **Planning** (PLC) - Choose your path
3. **Robot Learning** (LRN) - Modern approaches
4. **Embodied Skills** (EMB) - Application domains

### Key References
- **Modern Robotics** (Lynch & Park, 2017)
- **Probabilistic Robotics** (Thrun et al., 2005)
- **SLAM: Past, Present, and Future** (Cadena et al., 2016)

## 🎓 Educational Use

This project is designed for:
- **Students** - Understand the robotics research landscape
- **Researchers** - Find related work and dependencies
- **Educators** - Create course curricula and learning paths
- **Practitioners** - Identify techniques for specific problems

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with modern web technologies and inspired by the robotics research community. Special thanks to all researchers whose work is represented in this map.

## 🔗 Links

- **AI Studio App**: https://ai.studio/apps/drive/13kbWyVsdMHZMS0f-Kx807zaM0ExZ2AJP
- **Report Issues**: [GitHub Issues](https://github.com/yourusername/map-of-robotics/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/map-of-robotics/discussions)

---

**Made with ❤️ for the robotics community**
