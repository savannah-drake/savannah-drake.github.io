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

const portfolioAnswers = [
  {
    keywords: ["airline", "american airlines", "delay", "flight", "streamlit", "app"],
    answer:
      "My American Airlines Delay Prediction project is a deployed machine learning application that predicts flight delays using operational and route-level data. I focused on turning model outputs into an interactive decision-support tool rather than just static analysis."
  },
  {
    keywords: ["fresh food", "invest atlanta", "food access", "geospatial", "atlanta"],
    answer:
      "My fresh food access project combines geospatial analysis with public data to identify Atlanta census tracts with high need and strong opportunity for food-related investment. It is focused on turning messy place-based data into clearer decisions."
  },
  {
    keywords: ["fifa", "transit", "urban", "gis", "neighborhood"],
    answer:
      "My FIFA 2026 project analyzes transit access and business disinvestment across Atlanta neighborhoods near Mercedes-Benz Stadium. It uses geospatial data to identify areas with high demand but limited access, helping surface potential investment opportunities ahead of a major global event."
  },
  {
    keywords: ["machine learning", "ml", "models", "modeling"],
    answer:
      "My machine learning work includes regression, classification, clustering, and model evaluation. I focus on building models that are not just accurate, but usable—integrating them into tools and interfaces that support real decision-making."
  },
  {
    keywords: ["tools", "skills", "python", "sql", "tech stack"],
    answer:
      "I work most with Python, SQL, R, Java, JavaScript, pandas, scikit-learn, geopandas, Tableau, Power BI, Excel, Git, Snowflake, and Streamlit. My strongest projects usually combine analytics, modeling, visualization, and product thinking."
  },
  {
  keywords: ["sprintwheel", "agile", "project management", "product", "scrum"],
  answer:
    "SprintWheel is a full-stack agile project management platform I built to support sprint planning, backlog organization, and deadline tracking. I focused on making project workflows feel more intuitive and usable, combining product design with backend and frontend engineering."
},
  {
    keywords: ["internship", "career", "roles", "opportunities"],
    answer:
      "I’m interested in AI/ML, data science, and product-focused roles where I can build systems that turn data into better user experiences or more informed decisions. I’m especially drawn to work that sits between analytics, engineering, and product."
  }
];

function getPortfolioResponse(question) {
  const normalizedQuestion = question.toLowerCase().trim();

  if (!normalizedQuestion) {
    return "I can answer questions about my airline app, SprintWheel, geospatial projects, machine learning work, tools, and the kinds of roles I’m targeting. Try asking about a specific project.";
  }

  const match = portfolioAnswers.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "I can answer questions about my airline app, geospatial projects, machine learning work, tools, and the kinds of roles I’m interested in. Try one of the suggested prompts above.";
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

suggestionChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const text = chip.textContent;
    questionInput.value = text;
    responseBox.textContent = getPortfolioResponse(text);
  });
});