/* ==========================================================================
   PORTFOLIO KOUASSI BIGNON — Scripts
   ========================================================================== */

/* ---------------------------------------------------------------------------
   1. DONNÉES DES PROJETS
   Modifiez ici les descriptions, liens et technologies de vos réalisations.
--------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Dashboard Analytics",
    category: "web",
    categoryLabel: "Web",
    image: "assets/img/projects/dashboard.png",
    description:
      "Application web de tableau de bord analytique : visualisation de données en temps réel, graphiques interactifs et rapports personnalisés pour piloter la performance d'une entreprise.",
    tags: ["React", "Node.js", "Charts.js", "API REST"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "App Fitness Tracker",
    category: "mobile",
    categoryLabel: "Mobile",
    image: "assets/img/projects/mobile-app.png",
    description:
      "Application mobile de suivi sportif et de santé : compteur d'activité, objectifs personnalisés, historique des performances et interface intuitive adaptée au mode sombre.",
    tags: ["React Native", "Firebase", "UI/UX"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Boutique en ligne",
    category: "web",
    categoryLabel: "Web",
    image: "assets/img/projects/ecommerce.png",
    description:
      "Site e-commerce complet avec catalogue produits, panier, paiement en ligne sécurisé et espace client. Design moderne optimisé pour la conversion et le mobile.",
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Identité visuelle & branding",
    category: "design",
    categoryLabel: "Design",
    image: "assets/img/projects/branding.png",
    description:
      "Création d'une identité visuelle complète : logo, charte graphique, cartes de visite et supports de communication pour une marque premium.",
    tags: ["Figma", "Illustrator", "Branding"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Site restaurant gastronomique",
    category: "web",
    categoryLabel: "Web",
    image: "assets/img/projects/restaurant.png",
    description:
      "Site vitrine élégant pour un restaurant gastronomique : menu interactif, réservation en ligne, galerie photo et ambiance chaleureuse reflétant l'établissement.",
    tags: ["HTML/CSS", "JavaScript", "WordPress"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Landing page startup",
    category: "design",
    categoryLabel: "Design",
    image: "assets/img/projects/landing.png",
    description:
      "Landing page haute conversion pour le lancement d'une startup tech : storytelling visuel, animations fluides et appels à l'action stratégiquement placés.",
    tags: ["Figma", "Prototypage", "Motion Design"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

/* ---------------------------------------------------------------------------
   2. EFFET DE TEXTE DYNAMIQUE (rôles dans le hero)
--------------------------------------------------------------------------- */
const roles = [
  "Développeur Web 💻",
  "UI / UX Designer 🎨",
  "Créateur Digital 🚀",
  "Solution Maker ⚡",
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById("typed-role");

function typeEffect() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    setTimeout(typeEffect, 75);
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 40);
  }
}
if (typedEl) typeEffect();

/* ---------------------------------------------------------------------------
   3. NAVIGATION : header au scroll, menu actif, menu mobile
--------------------------------------------------------------------------- */
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navBurger = document.getElementById("nav-burger");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  updateActiveLink();
  toggleBackToTop();
});

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

navBurger.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navBurger.classList.toggle("open", open);
  navBurger.setAttribute("aria-expanded", open);
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navBurger.classList.remove("open");
  })
);

/* ---------------------------------------------------------------------------
   4. ANIMATIONS AU SCROLL (reveal + barres de compétences + compteurs)
--------------------------------------------------------------------------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.matches(".skills-col")) animateSkillBars();
        if (entry.target.matches(".hero-stats")) animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function animateSkillBars() {
  document.querySelectorAll(".skill-bar span").forEach((bar) => {
    bar.style.width = bar.dataset.width || getComputedStyle(bar).getPropertyValue("--w");
  });
}

function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = +el.dataset.count;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + "+";
    };
    requestAnimationFrame(tick);
  });
}

/* ---------------------------------------------------------------------------
   5. FILTRES DES RÉALISATIONS
--------------------------------------------------------------------------- */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach((card, i) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
      if (match) {
        card.style.animation = "none";
        void card.offsetWidth; // relance l'animation
        card.style.animation = "";
        card.style.animationDelay = `${i * 0.06}s`;
      }
    });
  });
});

/* ---------------------------------------------------------------------------
   6. LIGHTBOX : visualisation des projets en grand
--------------------------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxCat = document.getElementById("lightbox-cat");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxTags = document.getElementById("lightbox-tags");
const lightboxLinks = document.getElementById("lightbox-links");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentIndex = 0;
let visibleIndices = [];

function getVisibleIndices() {
  const filter = document.querySelector(".filter-btn.active").dataset.filter;
  return PROJECTS.map((p, i) => ({ p, i }))
    .filter(({ p }) => filter === "all" || p.category === filter)
    .map(({ i }) => i);
}

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function renderLightbox() {
  const project = PROJECTS[currentIndex];
  lightboxImage.src = project.image;
  lightboxImage.alt = project.title;
  lightboxTitle.textContent = project.title;
  lightboxDesc.textContent = project.description;
  lightboxCat.textContent = project.categoryLabel;

  const position = visibleIndices.indexOf(currentIndex) + 1;
  lightboxCounter.textContent = `${position} / ${visibleIndices.length}`;

  lightboxTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  lightboxLinks.innerHTML = `
    <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">🌐 Voir le projet</a>
    <a href="${project.codeUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">⌨️ Code source</a>
  `;
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  const position = visibleIndices.indexOf(currentIndex);
  const nextPosition =
    (position + direction + visibleIndices.length) % visibleIndices.length;
  currentIndex = visibleIndices[nextPosition];
  renderLightbox();
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    visibleIndices = getVisibleIndices();
    openLightbox(+card.dataset.index);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
lightboxNext.addEventListener("click", () => navigateLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigateLightbox(-1);
  if (e.key === "ArrowRight") navigateLightbox(1);
});

/* ---------------------------------------------------------------------------
   7. FORMULAIRE DE CONTACT (ouvre l'application mail)
--------------------------------------------------------------------------- */
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim() || "Demande de contact";
  const message = document.getElementById("message").value.trim();

  const body = encodeURIComponent(
    `Bonjour KOUASSI BIGNON,\n\n${message}\n\n— ${name} (${email})`
  );
  window.location.href = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  formNote.textContent = "✅ Merci ! Votre message s'ouvre dans votre application mail.";
  contactForm.reset();
  setTimeout(() => (formNote.textContent = ""), 6000);
});

/* ---------------------------------------------------------------------------
   8. BOUTON RETOUR EN HAUT + ANNÉE DU FOOTER
--------------------------------------------------------------------------- */
const backToTop = document.getElementById("back-to-top");
function toggleBackToTop() {
  backToTop.classList.toggle("show", window.scrollY > 500);
}
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();
