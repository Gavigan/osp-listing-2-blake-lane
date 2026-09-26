const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const progress = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeMenu() {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

let frame = 0;
function updateScroll() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = pageHeight > 0 ? Math.min((window.scrollY / pageHeight) * 100, 100) : 0;
  progress.style.setProperty("--progress", `${percent}%`);
  header.classList.toggle("scrolled", window.scrollY > 28);

  if (!reduceMotion) {
    document.querySelectorAll("[data-parallax]").forEach((element) => {
      const rect = element.parentElement.getBoundingClientRect();
      const speed = Number(element.dataset.speed || 0.08);
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      element.style.setProperty("--offset", `${offset}px`);
    });
  }
  frame = 0;
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateScroll);
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
updateScroll();

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const planModal = document.querySelector("#plan-modal");
const planModalImage = planModal.querySelector("[data-plan-modal-image]");
const planModalLabel = planModal.querySelector("[data-plan-modal-label]");
const planModalTitle = planModal.querySelector("[data-plan-modal-title]");
const planClose = planModal.querySelector("[data-plan-close]");

function closePlan() {
  if (typeof planModal.close === "function" && planModal.open) {
    planModal.close();
  } else {
    planModal.removeAttribute("open");
  }
}

document.querySelectorAll("[data-plan-src]").forEach((button) => {
  button.addEventListener("click", () => {
    planModalImage.src = button.dataset.planSrc;
    planModalImage.alt = button.dataset.planAlt;
    planModalLabel.textContent = button.dataset.planLabel;
    planModalTitle.textContent = button.dataset.planTitle;

    if (typeof planModal.showModal === "function") {
      planModal.showModal();
    } else {
      planModal.setAttribute("open", "");
    }
  });
});

planClose.addEventListener("click", closePlan);
planModal.addEventListener("click", (event) => {
  if (event.target === planModal) closePlan();
});

const conciergeTopics = [
  {
    keywords: ["overview", "home", "house", "bedroom", "bath", "square", "size", "layout", "plan"],
    answer: "The Hancock is currently presented with four bedrooms, 3.5 baths, approximately 3,476 conditioned square feet and approximately 4,650 square feet under roof. The garage is the only enclosed unconditioned portion; covered porches are included under roof but not in conditioned living area. The primarily one-level layout includes a private primary wing, generous guest rooms and a conditioned upper suite with a full bath. Current plans and purchase documents control final dimensions."
  },
  {
    keywords: ["ceiling", "height", "grand room", "architecture", "vault", "window", "fireplace"],
    answer: "The home is designed around exceptional scale: 12-foot main-level walls, approximately 14-foot-6-inch Grand Room walls and a vaulted peak of roughly 22 feet per the current listing; approved plans control final dimensions. Tall windows, transoms, a paneled vaulted ceiling, tailored millwork and a full-height masonry hearth complete the composition."
  },
  {
    keywords: ["bull point", "community", "amenity", "amenities", "boat", "clubhouse", "pool", "tennis", "pickleball", "river"],
    answer: "Bull Point is an approximately 700-acre gated waterfront community with six miles of tidal river frontage, a private boat landing and docks, a 6,500-square-foot clubhouse and fitness center, Junior Olympic pool, hot tub, tennis and pickleball courts, Magnolia Island pavilion, trails and a 20-acre bird sanctuary."
  },
  {
    keywords: ["selection", "finish", "floor", "cabinet", "counter", "appliance", "kitchen", "bath", "tile", "lighting"],
    answer: "The current preliminary collection pairs wide-plank white oak, Champagne perimeter cabinetry, a natural-oak island, brushed-gold hardware, ZLINE Autograph appliances, Calacatta quartz, touchless vanity faucets, Delta brushed-gold primary-bath systems, ZLINE matte-black guest-bath systems, coastal-blue tile accents, statement lighting and copper gas lanterns. Availability and approved project documents control final selections."
  },
  {
    keywords: ["price", "cost", "available", "availability", "listing", "zillow", "offer"],
    answer: "2 Blake Lane is under contract, confirmed by the owner September 26, 2026. The previous asking price was $1,350,000, not a reported contract price. Contact Stacey or Billy for project information or other HG Group opportunities."
  },
  {
    keywords: ["construction", "completion", "complete", "finish", "timeline", "when", "rough", "change", "personalize", "instagram", "facebook", "progress", "update"],
    answer: "Owner update, September 26, 2026: drywall is in progress. Contact the project team for the current completion schedule and any proposed changes. Follow @bullpointsc on Instagram or Facebook for current jobsite photos and videos."
  },
  {
    keywords: ["hg group", "old south", "osp", "builder", "broker", "other", "team", "company"],
    answer: "HG Group Signature Homes brings together development, construction and project leadership, while Old South Properties guides the real-estate presentation and buyer experience. Use the Old South Properties link below to explore the broader team and other opportunities."
  }
];

const conciergeLauncher = document.querySelector(".concierge-launcher");
const conciergePanel = document.querySelector("#property-concierge");
const conciergeClose = conciergePanel.querySelector("[data-concierge-close]");
const conciergeBody = conciergePanel.querySelector(".concierge-body");
const conciergeForm = conciergePanel.querySelector(".concierge-form");
const conciergeInput = conciergePanel.querySelector("#concierge-question");

function setConcierge(open) {
  conciergeLauncher.classList.toggle("open", open);
  conciergePanel.classList.toggle("open", open);
  conciergeLauncher.setAttribute("aria-expanded", String(open));
  conciergePanel.setAttribute("aria-hidden", String(!open));
  if (open) window.setTimeout(() => conciergeInput.focus(), 220);
}

function appendConciergeMessage(role, text) {
  const message = document.createElement("p");
  message.className = `concierge-message ${role}`;
  message.textContent = text;
  conciergeBody.appendChild(message);
  conciergeBody.scrollTop = conciergeBody.scrollHeight;
}

function answerConcierge(question) {
  const normalized = question.toLowerCase();
  const topic = conciergeTopics.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );
  return topic?.answer || "I can help with the home, floor plan, architecture, selections, Bull Point amenities, pricing, construction timing and the HG Group or Old South Properties team. For a contract, availability or project-specific decision, please text Stacey or Billy directly.";
}

function askConcierge(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  appendConciergeMessage("user", cleanQuestion);
  appendConciergeMessage("assistant", answerConcierge(cleanQuestion));
  conciergeInput.value = "";
}

conciergeLauncher.addEventListener("click", () => setConcierge(true));
conciergeClose.addEventListener("click", () => setConcierge(false));
conciergePanel.querySelectorAll(".concierge-topics button").forEach((button) => {
  button.addEventListener("click", () => askConcierge(button.textContent));
});
conciergeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askConcierge(conciergeInput.value);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setConcierge(false);
});
