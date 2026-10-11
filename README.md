# Scroll-Driven Hero Section Animation

[![Live Demo (Vercel)](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://assignemnt-eight.vercel.app/)
[![Repository](https://img.shields.io/badge/Repository-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/gpranit16/assignemnt)
[![GSAP 3.12](https://img.shields.io/badge/Animation-GSAP%20ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)

An ultra-smooth, high-performance scroll-driven hero section animation inspired by automotive motion UI, featuring an interactive supercar track, dynamic letter-collision illumination for **W E L C O M E &nbsp; I T Z &nbsp; F I Z Z**, real-time telemetry HUD, and synchronized impact metric cards.

---

## 🔗 Submission Links

- **Live Webpage (Vercel):** [https://assignemnt-eight.vercel.app/](https://assignemnt-eight.vercel.app/)
- **Live Webpage (GitHub Pages Mirror):** [https://gpranit16.github.io/assignemnt/](https://gpranit16.github.io/assignemnt/)
- **GitHub Repository:** [https://github.com/gpranit16/assignemnt](https://github.com/gpranit16/assignemnt)
- **Reference Inspiration:** [Scroll Car Animation Demo](https://paraschaturvedi.github.io/car-scroll-animation)

---

## ⚡ Functional Requirements & Implementation

| Requirement | Specification | Implementation Detail | Status |
| :--- | :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies first screen (above fold) with letter-spaced headline & statistics | `100vh` sticky viewport containing letter-spaced headline `W E L C O M E   I T Z   F I Z Z` and 4 color-coded impact metrics | **Completed** |
| **2. Initial Load Animation** | Smooth entrance on page load (staggered reveal + delayed statistics) | GSAP timeline with `stagger: 0.035` letter entrance, smooth vehicle roll-in, telemetry fade, and counter preparation | **Completed** |
| **3. Scroll-Based Animation** | Main visual element moves based on scroll progress with fluid easing | Pinning via `ScrollTrigger.create` with `scrub: 0.8` interpolation. Supercar coordinates drive dynamic trail and character illumination | **Completed** |
| **4. Motion & Performance** | 60+ FPS hardware acceleration, transform-only, zero reflows | Pre-cached letter offsets, `translate3d` & `will-change: transform`, no layout recalculation during scroll ticks | **Completed** |

---

## 🏎️ Core Features

1. **Letter-Spaced Dynamic Illumination:**
   - As the supercar travels along the track from left to right, each glyph in `W E L C O M E   I T Z   F I Z Z` lights up with a radiant glow when crossed by the vehicle.
   - Letters transition smoothly back if the user scrolls backwards.

2. **Electric Energy Trail:**
   - A glowing `#45db7d` neon trail follows behind the vehicle's rear axle in real time, expanding across the road surface.

3. **Synchronized Impact Metric Cards:**
   - **58%** — Increase in pick-up point usage (Electric Lime)
   - **23%** — Decreased customer phone calls (Sky Blue)
   - **27%** — Surge in digital service engagement (Dark Slate / Emerald)
   - **40%** — Drop in checkout dispatch latency (Vivid Tangerine)
   - Each card triggers at tailored scroll milestones with animated counter numbers.

4. **Real-Time Telemetry HUD:**
   - Displays live scroll percentage (`0%` to `100%`).
   - Dynamic speedometer calculating simulated velocity (`0` to `240 KM/H`) based on scroll momentum.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic structure, accessible markup.
- **CSS3:** Custom properties (design tokens), GPU-accelerated transforms, dark automotive UI palette, Syne & Space Grotesk typography.
- **JavaScript (ES6+):** Modular, performant event and animation pipeline.
- **GSAP 3.12 & ScrollTrigger:** Physics-based scrubbed timeline, pinning, and timeline management.
- **Lucide Icons:** Clean, lightweight SVG icon system.

---

## 📂 Project Structure

```text
├── index.html       # Hero section, sticky track, metrics, telemetry markup
├── style.css        # Responsive styling, typography, animations, dark theme
├── main.js          # GSAP ScrollTrigger engine, letter collision, metrics scrub
├── car.svg          # Ultra-detailed vector top-view supercar asset
└── README.md        # Documentation, live demo links & assignment compliance
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/gpranit16/assignemnt.git
   cd assignemnt
   ```

2. Open `index.html` directly in any modern browser, or run a local static server:
   ```bash
   # Using VS Code Live Server or npx serve:
   npx serve .
   # Or using Python:
   python -m http.server 3000
   ```

3. Visit `http://localhost:3000` to interact with the scroll animation.
