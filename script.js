// ======================
// THEME TOGGLE
// ======================
const toggleButton = document.getElementById("theme-toggle");
const toggleLabel = document.querySelector(".toggle-label");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    toggleLabel.textContent = "Light";
  } else {
    body.classList.remove("dark");
    toggleLabel.textContent = "Dark";
  }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("dark");
}

toggleButton.addEventListener("click", () => {
  const isDark = body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});


// ======================
// CODE TAB SWITCHING
// ======================
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".code-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  const savedConsent = localStorage.getItem("site_consent_choice");

  function hideBanner() {
    banner.classList.add("hidden");
  }

  function showBanner() {
    banner.classList.remove("hidden");
  }

  function grantConsent() {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    localStorage.setItem("site_consent_choice", "accepted");
    hideBanner();
  }

  function denyConsent() {
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    localStorage.setItem("site_consent_choice", "rejected");
    hideBanner();
  }

  if (!savedConsent) {
    showBanner();
  } else if (savedConsent === "accepted") {
    grantConsent();
  } else {
    denyConsent();
  }

  acceptBtn.addEventListener("click", grantConsent);
  rejectBtn.addEventListener("click", denyConsent);

// ======================
// TYPING EFFECT (profile.js)
// ======================
const codeElement = document.getElementById("typed-code");

const profileLines = [
  '<div class="code-line"><span class="kw">const</span> <span class="var">profile</span> = <span class="bracket">{</span></div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">name</span>: <span class="str">"Savannah Drake"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">major</span>: <span class="str">"Data & Decisions Sciences"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">track</span>: <span class="str">"Informatics"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">graduation</span>: <span class="str">"May 2027"</span>,</div>',
  '<div class="code-line"></div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">interests</span>: <span class="bracket">[</span></div>',
  '<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"data analysis"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"machine learning"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"geospatial analysis"</span>,</div>',
  '<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"software design"</span></div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="bracket">]</span>,</div>',
  '<div class="code-line"></div>',
  '<div class="code-line">&nbsp;&nbsp;<span class="prop">building</span>: <span class="str">"AI-powered, data-driven products and decision tools"</span></div>',
  '<div class="code-line"><span class="bracket">}</span>;</div>'
];

let lineIndex = 0;

function typeLine() {
  if (lineIndex < profileLines.length) {
    codeElement.innerHTML += profileLines[lineIndex];
    lineIndex++;
    setTimeout(typeLine, 120);
  }
}

typeLine();


// ======================
// EXPANDABLE PROJECT CARDS
// ======================
const expandableCards = document.querySelectorAll(".expandable");

expandableCards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});
const askBtn = document.getElementById("ask-btn");
const questionInput = document.getElementById("portfolio-question");
const responseBox = document.getElementById("ai-response");
const suggestionChips = document.querySelectorAll(".suggestion-chip");
const suggestions = [
  "Tell me about Savannah’s background",
  "What roles is Savannah a good fit for?",
  "What are Savannah’s strongest technical skills?",
  "Tell me about the airline project",
  "Explain the trend-to-campaign engine",
  "How does Savannah turn data into decisions?",
  "What experience does Savannah have?",
  "Why should a recruiter hire Savannah?"
];
const input = document.getElementById("portfolio-question");
const dropdown = document.getElementById("suggestions-dropdown");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  dropdown.innerHTML = "";

  if (!value) {
    dropdown.classList.add("hidden");
    return;
  }

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(value)
  );

  if (filtered.length === 0) {
    dropdown.classList.add("hidden");
    return;
  }

  filtered.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;

    div.addEventListener("click", () => {
      input.value = suggestion;
      dropdown.classList.add("hidden");
      document.getElementById("ai-response").textContent =
        getPortfolioResponse(suggestion);
    });

    dropdown.appendChild(div);
  });

  dropdown.classList.remove("hidden");
});
const portfolioAnswers = [
  {
    keywords: ["about", "background", "who are you", "savannah"],
    answer:
      "I’m a Data & Decision Sciences (Informatics) student at Emory University focused on building data-driven systems that support real decision-making. My work spans machine learning, geospatial analysis, and full-stack product development, with an emphasis on turning complex data into usable tools and insights."
  },

  {
    keywords: ["airline", "american airlines", "delay", "flight"],
    answer:
      "My American Airlines Delay Prediction project is a machine learning application built on 18,000+ flight records. I engineered features across routes and scheduling conditions, trained models with an AUC around 0.66, and deployed the results in a Streamlit app so users can interactively evaluate delay risk."
  },

  {
    keywords: ["sprintwheel", "agile", "project management", "product"],
    answer:
      "SprintWheel is a full-stack agile project management platform I built using React, TypeScript, FastAPI, and Supabase. It supports sprint planning, backlog organization, and workflow tracking. I focused heavily on usability and designing systems that actually improve how teams execute work."
  },

  {
    keywords: ["fresh food", "invest atlanta", "food access", "lila"],
    answer:
      "My fresh food access project combines geospatial and socioeconomic data to identify high-need Atlanta census tracts with limited access to fresh food. The goal was to support real investment decisions by translating complex spatial data into clear, tract-level insights."
  },

  {
    keywords: ["fifa", "transit", "urban", "gis"],
    answer:
      "My FIFA 2026 project analyzes transit access and business disinvestment near Mercedes-Benz Stadium. I integrated multiple geospatial datasets to identify areas with high demand but limited access, helping surface opportunities for infrastructure and economic investment."
  },

  {
    keywords: ["machine learning", "ml", "models"],
    answer:
      "I’ve worked with regression, classification, clustering, and model evaluation, but I focus on making models usable. That means turning outputs into dashboards, decision tools, or systems that people can actually interact with—not just static results."
  },

  {
    keywords: ["trend", "campaign", "marketing", "recommendation", "love island", "saltair"],
    answer:
      "I’m currently building a Trend-to-Campaign Recommendation Engine that translates real-time cultural signals into marketing strategy. It maps trends from platforms like TikTok and Google Trends to product categories, audiences, and campaign ideas, bridging data analysis with marketing and consumer behavior."
  },

  {
    keywords: ["experience", "work", "job", "internship"],
    answer:
      "I currently work as a Student Technical Support Technician at Emory, where I’ve resolved 150+ technical issues and performed hardware diagnostics. I’m also an AI Fellow, where I work on evaluating and improving large language model outputs. Through the Data Science Club and AI Data Lab, I’ve led and contributed to multiple real-world data projects."
  },

  {
    keywords: ["leadership", "team", "lead"],
    answer:
      "I’ve led data teams through projects like the airline delay analysis, where I guided workflow, analysis direction, and final delivery. I also contribute to operations and DEI initiatives through The Women’s Network, helping manage systems and improve team engagement."
  },

  {
    keywords: ["skills", "tools", "tech stack"],
    answer:
      "I work with Python, SQL, JavaScript, React, TypeScript, FastAPI, Supabase, pandas, scikit-learn, geopandas, Streamlit, Tableau, Power BI, and Snowflake. My projects usually combine analytics, modeling, and product development."
  },

  {
    keywords: ["roles", "career", "fit", "why hire"],
    answer:
      "I’m a strong fit for data analyst, marketing analytics, product analytics, and early-stage data science roles. What differentiates my work is that I don’t just analyze data—I build systems and tools that make insights usable for decision-making."
  },
  {
  keywords: ["recruiter", "hire", "why hire", "stand out", "strong candidate"],
  answer:
    "Savannah stands out because she combines technical skill with applied decision-making. Her projects show experience with machine learning, geospatial analytics, Streamlit dashboards, and full-stack development, while her professional experience adds IT support, AI evaluation, and team leadership. She is strongest in roles where data, product thinking, and business strategy overlap."
  },

  {
    keywords: ["resume", "linkedin", "profile"],
    answer:
      "My resume and LinkedIn highlight a mix of technical depth and applied experience across machine learning, geospatial analytics, and product development. I focus on building systems that connect data to real-world decisions, especially in areas like infrastructure, operations, and consumer behavior."
  }
];
const recruiterModeToggle = document.getElementById("recruiter-mode");

function applyRecruiterMode(answer) {
  const recruiterModeOn = recruiterModeToggle && recruiterModeToggle.checked;

  if (!recruiterModeOn) {
    return answer;
  }

  return `${answer}

Recruiter takeaway: Savannah brings a strong mix of analytics, technical execution, and product thinking. Her experience across machine learning, geospatial analysis, full-stack development, IT support, and AI evaluation shows that she can work with data, build usable tools, communicate insights, and contribute in fast-moving team environments.`;
}
function getPortfolioResponse(question) {
  const normalizedQuestion = question.toLowerCase().trim();

  if (!normalizedQuestion) {
    return applyRecruiterMode(
      "You can ask about my projects, experience, technical skills, leadership, or the types of roles I’m targeting. Try something like 'Tell me about your airline project' or 'What roles are you a good fit for?'"
    );
  }

  const match = portfolioAnswers.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) {
    return applyRecruiterMode(match.answer);
  }

  return applyRecruiterMode(
    "I can answer questions about my projects, experience, skills, and career interests. Try asking about a specific project, my background, or what kinds of roles I’m targeting."
  );
}

if (askBtn && questionInput && responseBox) {
  askBtn.addEventListener("click", () => {
    responseBox.textContent = getPortfolioResponse(questionInput.value);
  });

  questionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      responseBox.textContent = getPortfolioResponse(questionInput.value);
    }
  });
}
document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete-container")) {
    dropdown.classList.add("hidden");
  }
});
suggestionChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const text = chip.textContent;
    questionInput.value = text;
    responseBox.textContent = getPortfolioResponse(text);
  });
});