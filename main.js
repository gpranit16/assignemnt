/**
 * ============================================================================
 * SCROLL-DRIVEN HERO SECTION ANIMATION - JAVASCRIPT ENGINE
 * ITZFIZZ / MOTION LAB
 * GSAP 3.12 + ScrollTrigger Scrub Pipeline
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger plugin
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.error("GSAP or ScrollTrigger failed to load.");
    return;
  }

  // --- Element Selectors ---
  const scrollSection = document.getElementById("hero-track");
  const roadContainer = document.getElementById("roadContainer");
  const roadSurface = document.getElementById("roadSurface");
  const carWrapper = document.getElementById("carWrapper");
  const carTrail = document.getElementById("carTrail");
  const headlineTrack = document.getElementById("headlineTrack");
  const letters = gsap.utils.toArray(".letter");
  
  // HUD Elements
  const hudProgress = document.getElementById("hudProgress");
  const hudSpeed = document.getElementById("hudSpeed");
  const scrollHint = document.getElementById("scrollHint");

  // Stat Cards
  const statCards = [
    document.getElementById("statCard1"),
    document.getElementById("statCard2"),
    document.getElementById("statCard3"),
    document.getElementById("statCard4"),
  ];

  // Number Counter Target tracking
  let numbersAnimated = [false, false, false, false];

  /**
   * Helper: Counter animation for metrics
   */
  function animateNumber(element, targetNum) {
    let current = { val: 0 };
    gsap.to(current, {
      val: targetNum,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(current.val) + "%";
      }
    });
  }

  /**
   * ==========================================================================
   * 1. INITIAL LOAD ANIMATION (Requirement 2)
   * Staggered letter reveal, delayed metrics entrance, smooth intro sequence
   * ==========================================================================
   */
  function runIntroSequence() {
    const introTimeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    introTimeline
      // Topbar elements entrance
      .from(".navbar", {
        y: -40,
        opacity: 0,
        duration: 0.9,
      })
      .from(".hero-topbar", {
        x: -30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      // Letter-spaced headline staggered entrance
      .from(letters, {
        y: 35,
        opacity: 0,
        scale: 0.8,
        stagger: 0.035,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4")
      // Car smooth roll-in onto starting line
      .from(carWrapper, {
        x: -160,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.6")
      // HUD Telemetry pill fade & slide
      .from("#hudPill", {
        y: -20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.8")
      // Scroll indicator fade
      .from(scrollHint, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4");
  }

  /**
   * ==========================================================================
   * 2. SCROLL-DRIVEN ANIMATION (Core Feature - Requirement 3 & 4)
   * 1:1 Scroll binding with scrub interpolation, dynamic trail & character lighting
   * ==========================================================================
   */
  let travelDistance = 0;
  let letterOffsets = [];

  function recalculateMetrics() {
    const roadWidth = window.innerWidth;
    const carWidth = carWrapper.offsetWidth || 250;
    // Car moves from starting left margin to right edge of screen
    travelDistance = roadWidth - carWidth - 20;

    // Cache pre-computed offsets of each letter to avoid DOM layout reflow in scrub tick
    const headlineRect = headlineTrack.getBoundingClientRect();
    letterOffsets = letters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      return {
        left: rect.left,
        center: rect.left + rect.width / 2,
        width: rect.width
      };
    });
  }

  // Calculate layout initially
  recalculateMetrics();

  // Primary Car Scroll Animation
  const carScrollTween = gsap.to(carWrapper, {
    x: () => travelDistance,
    ease: "none",
    scrollTrigger: {
      trigger: scrollSection,
      start: "top top",
      end: "bottom top",
      scrub: 0.8, // Smooth momentum interpolation
      pin: ".sticky-viewport",
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0.0 -> 1.0

        // 1. Update Telemetry HUD
        const percentage = Math.round(progress * 100);
        if (hudProgress) hudProgress.textContent = `${percentage}%`;

        // Calculate simulated velocity (0 to 240 KM/H based on progress + scroll velocity)
        const baseSpeed = progress * 210;
        const scrollVelocity = Math.min(Math.abs(self.getVelocity() / 35), 30);
        const calculatedSpeed = Math.round(baseSpeed + scrollVelocity);
        if (hudSpeed) {
          hudSpeed.innerHTML = `${calculatedSpeed} <small>KM/H</small>`;
        }

        // 2. Hide scroll hint once user engages
        if (scrollHint) {
          if (progress > 0.04) {
            scrollHint.style.opacity = "0";
            scrollHint.style.pointerEvents = "none";
          } else {
            scrollHint.style.opacity = "1";
          }
        }

        // 3. Dynamic Trail Expansion
        // Calculate the front edge of the car
        const currentCarX = gsap.getProperty(carWrapper, "x");
        const carWidth = carWrapper.offsetWidth || 250;
        const carMidpointX = currentCarX + (carWidth * 0.7);

        if (carTrail) {
          gsap.set(carTrail, { width: `${Math.max(0, carMidpointX)}px` });
        }

        // 4. Character Collision & Illumination Reveal
        // Avoid heavy queries; use pre-computed offsets & current car bounds
        letters.forEach((letter, i) => {
          const letterInfo = letterOffsets[i];
          if (!letterInfo) return;

          // If the car has swept across this character's coordinate
          if (carMidpointX >= letterInfo.left) {
            letter.classList.add("illuminated");
          } else {
            letter.classList.remove("illuminated");
          }
        });
      }
    }
  });

  /**
   * ==========================================================================
   * 3. IMPACT STATS CARDS SCROLL TRIGGERS
   * Sequential reveal & scale-in synchronized with the car's progress
   * ==========================================================================
   */
  const cardMilestones = [
    { id: "#statCard1", startProgress: 0.15, endProgress: 0.35, index: 0, target: 58 },
    { id: "#statCard2", startProgress: 0.35, endProgress: 0.55, index: 1, target: 23 },
    { id: "#statCard3", startProgress: 0.55, endProgress: 0.75, index: 2, target: 27 },
    { id: "#statCard4", startProgress: 0.75, endProgress: 0.95, index: 3, target: 40 },
  ];

  cardMilestones.forEach((milestone) => {
    const cardEl = document.querySelector(milestone.id);
    if (!cardEl) return;

    gsap.fromTo(cardEl, 
      {
        opacity: 0,
        y: 35,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: scrollSection,
          // Map to relative scroll offsets inside the scroll section
          start: () => `top+=${milestone.startProgress * (scrollSection.offsetHeight - window.innerHeight)} top`,
          end: () => `top+=${milestone.endProgress * (scrollSection.offsetHeight - window.innerHeight)} top`,
          scrub: 0.6,
          onEnter: () => {
            if (!numbersAnimated[milestone.index]) {
              const numEl = cardEl.querySelector(".stat-number");
              if (numEl) animateNumber(numEl, milestone.target);
              numbersAnimated[milestone.index] = true;
            }
          }
        }
      }
    );
  });

  /**
   * ==========================================================================
   * 4. WINDOW RESIZE & OPTIMIZATION HANDLER
   * ==========================================================================
   */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      recalculateMetrics();
      ScrollTrigger.refresh();
    }, 200);
  });

  // Launch initial intro animation on page load
  runIntroSequence();
});
