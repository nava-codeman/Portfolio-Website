# Portfolio Nava - 3D Interactive Timeline 🕷️

Welcome to **Portfolio Nava**, a next-generation, highly interactive 3D portfolio and personal timeline built by Navjyoti Nath. Engineered with cutting-edge web technologies, this platform transcends the traditional resume by immersing visitors in a fully realized 3D environment that tracks professional milestones, internships, projects, and academic achievements.

## 🚀 Key Features

- **Immersive 3D Navigation:** Explore an infinite horizontal scrolling timeline featuring floating, dynamic holographic project cards.
- **Advanced Rendering:** Powered by **React Three Fiber (R3F)** and **Three.js**, featuring high-fidelity textures, dynamic lighting (point lights, directional shadows), and post-processing.
- **Custom Physics & Animations:** Includes custom Z-axis depth scaling, pendulum oscillation layers, glitch distortions, and complex harmonic motions built into the 3D meshes.
- **Real-World Credentials Integration:** Displays verified datasets highlighting core projects like **FitHub**, **EstroSync**, **FundSure**, and research internships at **ICAR-NRCY**.
- **Responsive Camera Director:** Intelligent FOV and camera rig scaling that adapts seamlessly across all mobile, tablet, and desktop viewports.

## 🛠️ Technology Stack

- **Core:** React.js, Vite
- **3D Engine:** Three.js, React Three Fiber, `@react-three/drei`
- **Animations:** Framer Motion, Custom Math Utils
- **Styling:** CSS3

## 📦 Getting Started

Follow these steps to deploy the portfolio locally:

### 1. Clone the Repository
```bash
git clone https://github.com/nava-codeman/Portfolio-Nava.git
cd Portfolio-Nava
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser to experience the 3D timeline.

## 📂 Architecture Overview

- `/src/components`: Contains the core 3D scene elements, including `Scene.jsx`, `CameraDirector.jsx`, and individual environment components (`Igloo.jsx`, `FitHubEnv.jsx`, etc.) representing each timeline node.
- `/public/Spidy images`: Hosts the high-resolution texture maps applied to the 3D canvas planes.
- `/src/store.js`: Manages global state for active project overlays and context engagement modules.

## 📬 Contact & Connect

**Navjyoti Nath**  
Computer Science & Engineering | Full-Stack Developer & Researcher

- **Location:** Morigaon, Assam, India – 782105
- **Email:** jyotinav710@gmail.com
- **LinkedIn:** [Navjyoti Nath](https://www.linkedin.com/in/navjyoti-nath-674688229/)
- **GitHub:** [@nava-codeman](https://github.com/nava-codeman)

---
*Designed & Engineered for maximum center-stage impact.*
