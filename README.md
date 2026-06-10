# <img src="./src/app/icon.svg" width="32" height="32" align="center" /> Chronis — The Memory Locket & Cognitive Mirror

> *"Time is a quiet loom, and Chronis is the thread that binds your choices into a constellation of habits."*

🔗 **Live Demo**: [use-chronis.vercel.app](https://use-chronis.vercel.app)

**Chronis** is an elegant, editorial self-reflection dashboard and cognitive workspace. Inspired by the quiet depth of a starry night sky and the timeless beauty of classical typography, Chronis aggregates your self-logged diaries, voice memos, calendar meetings, and weekly reviews to synthesize a high-fidelity mirror of your habits, energy, and decision-making flow.

Designed with **glassmorphism**, dynamic **micro-animations**, and a twinkling **starfield background**, Chronis turns personal data metrics into a serene, meditative experience.

---

## 🎨 Theme & Design Aesthetics

Chronis is built on an editorial, dark-mode design system:
- **Cosmic Ambiance**: Twinkling background canvas (`Starfield`) using warm, starlit text colors (`#ece8e2`) drifting across a deep space-black canvas (`#050505`).
- **Classic Typography**: Serene serif accents (using `Cormorant Garamond` & Georgia) paired with clean, modern sans-serif lines (`Plus Jakarta Sans`).
- **Stardust Glassmorphism**: Cards and navigation floating in semi-translucent glass panels (`backdrop-blur`) bordered by faint stellar dust glows (`#a78bfa` / `#7c3aed`).
- **Private & Encrypted**: A status readout reflecting client-side encryption and local syncing ("Locket Synced").

---

## 📸 Walkthrough & Screen Tour

Here is a walkthrough of the core Chronis interface.

### 1. The Dashboard (Overview)
Your cockpit of self-alignment. Features a custom welcome greeting for the user (**Revanshu**), an AI-powered conversational synthesis dialogue, and an overview of your primary metrics.

![Chronis Dashboard Overview](/public/dashboard1.png)
![Chronis Dashboard Alternate](/public/dashboard2.png)

*   **Metric Cards**: Tracks 5 key behavioral scores:
    *   **Decision Confidence**: Driven by morning logs and calendar speed.
    *   **Social Energy**: Monitors battery drain from consecutive meetings.
    *   **Learning Consistency**: Integrates audiobook logs with physical runs.
    *   **Emotional Stability**: Cross-references sleep time with journal sentiments.
    *   **Focus Depth & Flow**: Measures quiet blocks of deep work.
*   **Behavioral Trend Charts**: A Recharts-powered 6-week timeseries graph visualizing how your focus, stability, and energy correlate.
*   **Contributions Breakdown**: An activity grid mapping your reflection inputs over time.

---

### 2. Insight Explorer (Evidence Check)
Ever wonder why your focus score dropped or why your decision confidence spiked? The **Insight Explorer** is a portal that displays the underlying facts, reasoning, and raw diary archives behind every metric.

![Chronis Insight Explorer](/public/insight1.png)
![Chronis Insight Explorer Detail](/public/insight2.png)

*   **Evidence Logs**: Read transcripts of voice memos (e.g., noting vocal stability scores) or review private journal entries (e.g., reflections on midnight coding or early morning runs).
*   **Reasoning Statements**: Structured analysis explaining exactly how the AI reached its rating (e.g., *"Running days show a 15% drop in stress keywords"*).

---

### 3. Life Chapters (Timeline)
Chronis translates days and weeks into a readable biography. The **Timeline** groups milestones, reflections, and insights into chronological chapters.

![Chronis Life Chapters Timeline](/public/timeline1.png)
![Chronis Timeline Detail](/public/timeline2.png)

*   **Granular Filters**: View your life progression by **Weekly**, **Monthly**, or **Quarterly** segments.
*   **Milestone Anchors**: Look back at pivotal moments (e.g., transitioning to Tech Lead, launching a product, starting a fitness habit) mapped alongside the behavioral metrics that shaped them.

---

### 4. Mobile Navigation
Seamlessly access Chronis on the go. The mobile interface maintains the same serene aesthetic and core functionality while optimizing for smaller screens.

![Chronis Mobile Navigation](/public/mobile-navigation.png)

---

## 🛠️ Tech Stack & Architecture

Chronis is engineered with a modern, high-performance web stack:
- **Framework**: [Next.js 16](https://nextjs.org/) (utilizing the App Router structure for efficient file-based routing and Server Components).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` directives for custom variables, glassmorphic filters, and float animations.
- **Visuals**: [Recharts](https://recharts.org/) for highly customized responsive charts, styled dynamically to disable focus outlines and match the dark glass aesthetic.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, uniform iconography.
- **Performance**: Integrated support for the new React Compiler (`babel-plugin-react-compiler`) to automatically optimize render cycles.

---

## 🚀 Local Run Instructions

To run Chronis locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended) and `npm` installed.

### 1. Clone & Navigate
Navigate to your project directory:
```bash
cd chronis
```

### 2. Install Dependencies
Install the required packages:
```bash
npm install
```

### 3. Run the Development Server
Launch the local Next.js dev server:
```bash
npm run dev
```

### 4. Open in Browser
Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

The page will auto-update as you edit files in `src/`.
