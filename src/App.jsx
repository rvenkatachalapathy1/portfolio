import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Mail, ChevronDown, ArrowUpRight, MapPin, Star, Copy, Check, Menu, X } from "lucide-react";

const METRICS = [
  "60x campaign capacity · 2s → 150ms latency",
  "Tens of millions of gift card records tracked",
  "15 to 20% fewer failed redemptions",
  "Hundreds of thousands saved yearly, vendor retired",
  "10M+ codes generated / year",
  "3 teams built on the Transaction Limits API",
  "200,000+ loan applications processed",
  "$1B+ in cumulative loan decisions reconciled",
];

const JOBS = [
  {
    version: "v5.0.0",
    tag: "current release",
    role: "Senior Software Engineer",
    org: "eBay Inc.",
    dates: "Oct 2022 — Present",
    changes: [
      { kind: "Shipped", text: "Full lifecycle API suite (create, activate, deactivate, reverse, link, search) for a distributed gift card platform scaled to tens of millions of records and thousands of calls per hour, meeting strict latency and availability SLAs across checkout, search, and support teams." },
      { kind: "Shipped", text: "Card type specific transaction limits system after spotting a fraud gap where retail and store credit cards shared one limits engine. Added daily and monthly controls, multi currency support, and a feature flagged rollout that stopped a meaningful chunk of daily fraud and protected substantial annual revenue." },
      { kind: "Improved", text: "Campaign data platform by migrating off a table constrained store, expanding capacity 60x to 1.5M items and cutting end to end latency from 2s to 150ms with batching and caching, unlocking a major incremental revenue opportunity." },
      { kind: "Added", text: "Account level data linking at the persistence layer to neutralize bot driven code abuse across millions of gift card codes, cutting failed redemptions by 15 to 20 percent." },
      { kind: "Shipped", text: "Cryptographically secure in house batch code generation service in Java, producing millions of codes a year and retiring a third party vendor worth hundreds of thousands annually." },
      { kind: "Added", text: "Real time Transaction Limits API adopted by three downstream teams, surfacing live credit limit status and enabling proactive fraud detection across distributed financial services." },
      { kind: "Shipped", text: "AI powered GitHub Actions agent that scans every pull request and flags misplaced QA configuration before merge, wiping out a recurring class of production deployment failures." },
      { kind: "Shipped", text: "Java microservices for eBay Seller Capital covering KYC identity verification, underwriting data flows, multi currency repayment processing, and payout disbursement for 200,000+ loan applications, owned end to end with minimal oversight." },
      { kind: "Added", text: "Java based financial reconciliation logic resolving discrepancies between internal eBay systems and two third party lender platforms, keeping 10,000 to 15,000 daily repayment transactions consistent underneath $1B+ in cumulative loan decisions." },
    ],
  },
  {
    version: "v4.0.0",
    role: "Software Engineer",
    org: "AlphaFlow",
    dates: "Feb 2022 — Sep 2022",
    changes: [
      { kind: "Shipped", text: "Go backend microservices handling 70,000+ requests/day for a high traffic platform." },
      { kind: "Added", text: "REST APIs designed with Python, unit testing, and debugging to ingest data running through the dashboard." },
      { kind: "Improved", text: "Managed and supported a large PostgreSQL database with over 100TB of data, including backups, restores, and monitoring." },
      { kind: "Added", text: "Integrated tools like DataDog and Mixpanel for logging, metrics, and tracing using GoLang." },
      { kind: "Improved", text: "Identified tracking errors between the app and analytics property, saving the company $1500 monthly in lost revenue." },
    ],
  },
  {
    version: "v3.0.0",
    role: "Software Engineering Intern",
    org: "Kineviz",
    dates: "Aug 2021 — Dec 2021",
    changes: [
      { kind: "Shipped", text: "New insights and patterns regarding public sentiment to COVID-19 vaccine using the Twitter COVID dataset." },
      { kind: "Added", text: "Visualization of sentiment analysis results using GraphXR platform to enable data modeling and analysis." },
      { kind: "Added", text: "Visualization of high dimensional and connected data, querying from PostgreSQL, along with designing a graph data model." },
    ],
  },
  {
    version: "v2.0.0",
    role: "Full Stack Engineer Intern",
    org: "Whiznook",
    dates: "Jan 2021 — May 2021",
    changes: [
      { kind: "Shipped", text: "Highly interactive and customized UIs using Vue.js and Node.js to improve component load time for an average user by two minutes." },
      { kind: "Improved", text: "REST APIs to query large user data from GraphQL for both internal and external use, reducing time to ship new front-end features by 15% in the business release." },
      { kind: "Added", text: "Data visualizations with d3.js using responsive graphs for web pages to help end users analyze results." },
    ],
  },
  {
    version: "v1.0.0",
    role: "Software Engineer",
    org: "Tech Mahindra Ltd.",
    dates: "Nov 2014 — Jul 2019",
    changes: [
      { kind: "Shipped", text: "Part of the product development team responsible for API design and development of RESTful services for shipping the enterprise product in the business release." },
      { kind: "Improved", text: "Built web services with Python that were used by the customer-facing app to improve the time on the page for the average user by 2 minutes." },
      { kind: "Added", text: "Designed a keyword driven approach to reduce the time taken for debugging and to write test cases by 60%." },
      { kind: "Added", text: "Developed a Python based library to read Webservice data from a RESTful API and perform automation on the same." },
      { kind: "Improved", text: "Used MySQL to store and perform automation operations on the RESTful data, improving effectiveness by 20%." },
      { kind: "Added", text: "Designed backend libraries to automate mobile apps and Perfecto mobile cloud to help clients leverage the benefits of automation on the cloud." },
    ],
  },
];

const STACK = [
  { key: "languages", value: "Java, Python, Go, JavaScript, TypeScript" },
  { key: "frontend", value: "Angular, Vue.js, Node.js, d3.js" },
  { key: "data", value: "PostgreSQL, MySQL, MongoDB, REST, GraphQL" },
  { key: "infra", value: "AWS, Kubernetes, Kafka, Docker, Jenkins, GitHub Actions" },
  { key: "ai_tools", value: "Claude Code, Cline, MCP servers" },
];

const DOMAINS = [
  "Payment Processing",
  "Seller Financing",
  "Gift Card Platform",
  "API Development",
  "Game Development",
  "Visualization Dashboard",
  "Grafana",
  "Jenkins",
  "Selenium Automation",
  "Observability",
  "Fraud Prevention",
  "Distributed Systems",
  "Batch Processing",
  "AI Workflows",
  "Software Architecture & System Design",
  "Object-Oriented Programming (OOP)",
  "Version Control & Quality Assurance",
  "Agile & Scrum Methodologies",
  "Data Structures & Algorithms",
  "Requirement Analysis & Technical Specification",
  "Automation & Backend Testing Frameworks",
  "DevOps & CI/CD Best Practices",
  "Technical Documentation & Writing",
  "Problem Solving & Issue Resolution",
];

const ALL_PROJECTS = [
  {
    name: "React Portfolio",
    tag: "React · Vite",
    desc: "Personal portfolio website built with React and Vite, featuring a changelog style career log, tech stack showcase, and project gallery with filtering.",
    url: "https://github.com/rvenkatachalapathy1/portfolio",
    category: "side",
  },
  {
    name: "Tracking Vaccine Hesitancy",
    tag: "Observable · Data Visualization",
    desc: "Interactive visualization tracking vaccine hesitancy trends across different time periods and geospatial locations.",
    url: "https://observablehq.com/@5d57245f79dd37fb/tracking-vaccine-hesitancy",
    category: "side",
  },
  {
    name: "Drink Tracker",
    tag: "Vanilla JS · Supabase",
    desc: "Full stack real time drink tracking app for 30+ users — live leaderboard, advanced filtering, Excel export, hosted at zero ongoing cost.",
    url: "https://rvenkatachalapathy1.github.io/neverrunning/",
    category: "side",
  },
  {
    name: "Neural Music Generator",
    tag: "Python · RNN",
    desc: "Recurrent neural network trained on piano data to forecast sequential notes, benchmarked against human composed sequences.",
    category: "side",
  },
  {
    name: "Housing Market Dashboard",
    tag: "JavaScript · d3.js",
    desc: "Interactive dashboard mapping 15 years of county level Zillow home value data for geographic and temporal analysis.",
    url: "https://github.com/rakshithvenkatachalapathy/DataVisulization_FinalProject",
    category: "side",
  },
  {
    name: "nodejs-expressjs-vue-app",
    tag: "JavaScript",
    desc: "Full stack web app built with Node.js, Express, and Vue.js end to end.",
    url: "https://github.com/rakshithvenkatachalapathy/nodejs-expressjs-vue-app",
    category: "github",
  },
  {
    name: "Patient-vue",
    tag: "Vue",
    desc: "Vue.js patient management application prototype.",
    url: "https://github.com/rakshithvenkatachalapathy/Patient-vue",
    category: "github",
  },
  {
    name: "CloneTwitter",
    tag: "Ruby",
    desc: "Twitter clone built in Ruby on Rails — feed, posts, and user interactions.",
    url: "https://github.com/rakshithvenkatachalapathy/CloneTwitter",
    category: "github",
  },
  {
    name: "vue-app-employee-search",
    tag: "Vue",
    desc: "Employee search web app built with Vue.js.",
    url: "https://github.com/rakshithvenkatachalapathy/vue-app-employee-search",
    category: "github",
  },
  {
    name: "Shopping-Cart-application-Vue.js",
    tag: "Vue",
    desc: "Shopping cart app supporting add/remove from cart plus review creation and display.",
    url: "https://github.com/rakshithvenkatachalapathy/Shopping-Cart-application-Vue.js",
    category: "github",
  },
  {
    name: "TreekHacks-Hackathon",
    tag: "Next.js",
    desc: "Hackathon app built in Next.js.",
    url: "https://github.com/rakshithvenkatachalapathy/TreekHacks-Hackathon",
    category: "github",
    starred: true,
  },
  {
    name: "ARM-Emulation-C",
    tag: "C",
    desc: "ARM processor emulator written in C.",
    url: "https://github.com/rakshithvenkatachalapathy/ARM-Emulation-C",
    category: "github",
  },
  {
    name: "Property-Permits-using-Pandas",
    tag: "Jupyter Notebook",
    desc: "Exploratory data analysis on a San Francisco property permits dataset — pre-processing and linear correlation across fields.",
    url: "https://github.com/rakshithvenkatachalapathy/Property-Permits-using-Pandas",
    category: "github",
  },
  {
    name: "Line Charts",
    tag: "JavaScript · d3.js",
    desc: "Interactive line chart visualization built with D3.js for temporal data analysis.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A5",
    category: "visualization",
  },
  {
    name: "Parallel Coordinates",
    tag: "JavaScript · d3.js",
    desc: "Multivariate data visualization using parallel coordinates plot built with D3.js.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A6",
    category: "visualization",
  },
  {
    name: "Scatter Plot Matrix",
    tag: "JavaScript · d3.js",
    desc: "Scatter plot matrix for exploring relationships between multiple variables using D3.js.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A7",
    category: "visualization",
  },
  {
    name: "Force Displacement Graph",
    tag: "JavaScript · d3.js",
    desc: "Force-directed graph visualization showing node relationships and network structures with D3.js.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A8",
    category: "visualization",
  },
  {
    name: "Choropleth Maps",
    tag: "JavaScript · d3.js",
    desc: "Geographic data visualization using choropleth maps built with D3.js for spatial analysis.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A9",
    category: "visualization",
  },
  {
    name: "Advanced Visualization",
    tag: "JavaScript · d3.js",
    desc: "Advanced D3.js visualization techniques and custom chart implementations.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects/tree/main/A10",
    category: "visualization",
  },
  {
    name: "Toll Payment Method Predictor",
    tag: "Python · scikit-learn",
    desc: "Classification pipeline predicting whether NYS Thruway motorists paid by cash or E-ZPass — label encoded vehicle class and entry/exit points, engineered date features, and benchmarked models on a real toll transaction dataset.",
    url: "https://github.com/rvenkatachalapathy1/toll-payment--predictor",
    category: "ml",
  },
  {
    name: "Forest Cover Type Classification",
    tag: "Python · scikit-learn · XGBoost · Graphviz",
    desc: "Compared six tree based classifiers — Decision Tree, ExtraTrees, RandomForest, XGBoost, AdaBoost, and Bagging — across 581,000+ rows of soil and terrain data, using feature importance to prune 55 inputs while holding 93%+ accuracy, with tree structure visualized via Graphviz.",
    url: "https://github.com/rvenkatachalapathy1/forest-cover-classification",
    category: "ml",
  },
  {
    name: "Consumer Complaint Classifier",
    tag: "Python · TensorFlow · Keras (LSTM)",
    desc: "LSTM text classifier routing 555,000+ CFPB consumer complaint narratives into 11 product categories, backed by a full preprocessing pipeline — tokenization, sequence padding, stopword and special character removal.",
    url: "https://github.com/rvenkatachalapathy1/consumer-complaint-classifer",
    category: "ml",
  },
  {
    name: "Speech Based Gender Classification",
    tag: "Python · TensorFlow · Librosa",
    desc: "Extracted MFCC audio features directly from raw speech recordings with Librosa and trained a deep neural network to classify speaker gender from voice alone.",
    url: "https://github.com/rvenkatachalapathy1/speech-gender-classification",
    category: "ml",
  },
  {
    name: "Political Tweet Sentiment Classifier",
    tag: "Python · scikit-learn",
    desc: "Logistic regression over bag of words tweet features, tuned with grid search cross validation — surfaced a real overfitting gap between cross validation score and held out test performance worth digging into.",
    url: "https://github.com/rvenkatachalapathy1/political-tweet-classifier",
    category: "ml",
  },
  {
    name: "Breast Cancer Diagnosis via PCA",
    tag: "Python · scikit-learn",
    desc: "Applied principal component analysis to the Wisconsin Diagnostic Breast Cancer dataset, reducing a 30+ feature diagnostic panel down to the components that best separate benign from malignant tumors.",
    url: "https://github.com/rvenkatachalapathy1/pca-brest-cancer-diagnosis",
    category: "ml",
  },
  {
    name: "Hierarchical Clustering & Dendrograms",
    tag: "Python · SciPy",
    desc: "Agglomerative hierarchical clustering with Ward linkage on both a toy coordinate set and a 2,000 record 1990 U.S. Census sample, visualizing cluster structure through dendrograms.",
    url: "https://github.com/rvenkatachalapathy1/hierarchical-clustering",
    category: "ml",
  },
  {
    name: "Diabetes Risk Prediction",
    tag: "Python · scikit-learn",
    desc: "Deep neural network classifier over the Pima Indians Diabetes dataset, using stratified shuffle splitting to preserve class balance across train and test sets.",
    url: "https://github.com/rvenkatachalapathy1/diabetes-risk-dnn",
    category: "ml",
  },
  {
    name: "Fuel Efficiency Prediction",
    tag: "Python · pandas · scikit-learn",
    desc: "Correlation and multicollinearity analysis on the Auto MPG dataset (weight, displacement, horsepower) feeding an Elastic Net regression model for predicting fuel economy.",
    url: "https://github.com/rvenkatachalapathy1/fuel-efficiency-elastic-net",
    category: "ml",
  },
  {
    name: "Regularized Regression Comparison",
    tag: "Python · scikit-learn",
    desc: "Ridge and Lasso regression benchmarked against a plain linear baseline on the mtcars dataset, tuning regularization strength with grid search to reduce mean squared error.",
    url: "https://github.com/rvenkatachalapathy1/ridge-lasso-regression",
    category: "ml",
  },
];

const NAV = [
  { id: "top", label: "Intro" },
  { id: "log", label: "Career Log" },
  { id: "stack", label: "Stack" },
  { id: "domains", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useScrollReveal(filter) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const els = document.querySelectorAll(".animate-in");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Number(delay));
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filter]);
}

const ChangeTag = React.memo(function ChangeTag({ kind }) {
  const colorMap = {
    Added: "var(--accent-teal)",
    Shipped: "var(--accent-amber)",
    Improved: "var(--accent-teal)",
    Removed: "var(--text-muted)",
  };
  return (
    <span className="change-tag" style={{ color: colorMap[kind] || "var(--text-muted)" }}>
      {kind}
    </span>
  );
});

const JobEntry = React.memo(function JobEntry({ job, isOpen, onToggle }) {
  return (
    <div className="job">
      <button className="job-head" onClick={onToggle} aria-expanded={isOpen}>
        <div className="job-head-left">
          <span className="job-version">{job.version}</span>
          {job.tag && <span className="job-live">{job.tag}</span>}
          <span className="job-role">{job.role}</span>
          <span className="job-org">{job.org}</span>
        </div>
        <div className="job-head-right">
          <span className="job-dates">{job.dates}</span>
          <ChevronDown className={`chev ${isOpen ? "chev-open" : ""}`} size={18} />
        </div>
      </button>
      <div className={`job-body ${isOpen ? "job-body-open" : ""}`}>
        <ul>
          {job.changes.map((c, i) => (
            <li key={i}>
              <ChangeTag kind={c.kind} />
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default function Portfolio() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [openJobs, setOpenJobs] = useState({ "v5.0.0": true });
  const [projectFilter, setProjectFilter] = useState("all");
  const [githubDropdownOpen, setGithubDropdownOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useScrollReveal(projectFilter);

  const filteredProjects = useMemo(
    () => ALL_PROJECTS.filter((p) => projectFilter === "all" || p.category === projectFilter),
    [projectFilter]
  );

  const toggleJob = useCallback((version) =>
    setOpenJobs((prev) => ({ ...prev, [version]: !prev[version] })), []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setProjectFilter(filter);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("rakshithvenkat11@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setGithubDropdownOpen(false);
    if (githubDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [githubDropdownOpen]);

  return (
    <div className="portfolio-root">
      <style>{`
        .portfolio-root {
          /* Color Scheme: Lime Green */
          --bg: #F8FBF6;
          --bg-panel: #FFFFFF;
          --bg-panel-2: #E8F5D4;
          --border: rgba(0,0,0,0.06);
          --text: #1F3D1A;
          --text-muted: #6B8A4A;
          --accent-amber: #F4D03F;
          --accent-teal: #84CC16;
          --accent-amber-dim: rgba(244,208,63,0.15);
          --accent-teal-dim: rgba(132,204,22,0.15);

          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .portfolio-root * { box-sizing: border-box; }
        .portfolio-root ::selection { background: var(--accent-amber); color: #FFFFFF; }
        .portfolio-root a { color: inherit; }
        .portfolio-root button { font-family: inherit; cursor: pointer; }
        .portfolio-root :focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 3px; }

        .bg-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%);
        }
        .bg-gradient {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 20% 40%, var(--accent-teal-dim) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, var(--accent-amber-dim) 0%, transparent 50%);
          opacity: 0.6;
        }

        .nav {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 6vw;
          background: rgba(241,245,249,0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 17px; letter-spacing: 0.02em;
        }
        .nav-brand span { color: var(--accent-amber); }
        .nav-links { display: flex; gap: 28px; }
        .nav-link {
          background: none; border: none; color: var(--text-muted);
          font-size: 13px; font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em; padding: 4px 0; border-bottom: 2px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link.active { color: var(--accent-teal); border-color: var(--accent-teal); }
        .nav-linkedin {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .nav-linkedin:hover {
          color: var(--accent-teal);
          border-color: var(--accent-teal);
          transform: translateY(-2px);
        }
        .nav-hamburger { display: none; }
        @media (max-width: 720px) { 
          .nav-hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: 1px solid var(--border);
            color: var(--text);
            width: 36px;
            height: 36px;
            border-radius: 8px;
            padding: 0;
            transition: all 0.2s ease;
          }
          .nav-hamburger:hover { color: var(--accent-teal); border-color: var(--accent-teal); }
          .nav-links {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            gap: 0;
            background: rgba(241,245,249,0.97);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            padding: 8px 6vw;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s ease;
          }
          .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .nav-link {
            font-size: 14px;
            padding: 12px 0;
            border-bottom: 1px solid var(--border);
            text-align: left;
            width: 100%;
          }
          .nav-link:last-child { border-bottom: none; }
          .nav-linkedin { display: none; }
        }

        section { position: relative; z-index: 1; padding: 90px 6vw; }

        .hero { padding-top: 100px; padding-bottom: 60px; }
        .hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--accent-teal);
          display: flex; align-items: center; gap: 8px; margin-bottom: 22px;
        }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-teal); box-shadow: 0 0 10px var(--accent-teal); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .hero h1 {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700;
          font-size: clamp(38px, 6vw, 74px); line-height: 1.04; letter-spacing: -0.02em;
          max-width: 15ch; margin: 0 0 24px;
        }
        .hero h1 em { font-style: normal; color: var(--accent-amber); }
        .hero p.lede {
          max-width: 62ch; font-size: 18px; line-height: 1.65; color: var(--text-muted); margin-bottom: 34px;
        }
        .hero-meta { display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: var(--text-muted); }
        .hero-meta span { display: flex; align-items: center; gap: 6px; }


        .ticker-wrap {
          margin-top: 56px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 18px 0; overflow: hidden; white-space: nowrap;
        }
        .ticker-track { display: inline-flex; gap: 48px; animation: scroll-left 32s linear infinite; }
        .ticker-track span {
          font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: var(--text);
          display: inline-flex; align-items: center; gap: 10px;
        }
        .ticker-track span::before { content: '▲'; color: var(--accent-amber); font-size: 10px; }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }

        .section-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 44px; }
        .section-num { font-family: 'IBM Plex Mono', monospace; color: var(--accent-amber); font-size: 14px; }
        .section-head h2 {
          font-family: 'Space Grotesk', sans-serif; font-size: clamp(24px, 3vw, 32px);
          font-weight: 600; margin: 0;
        }
        .section-head p { color: var(--text-muted); font-size: 14px; margin: 0 0 0 auto; max-width: 34ch; text-align: right; }
        @media (max-width: 720px) { .section-head { flex-wrap: wrap; } .section-head p { text-align: left; margin-left: 0; } }

        .log-list { display: flex; flex-direction: column; gap: 14px; }
        .job { background: var(--bg-panel); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .job-head {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 22px; background: none; border: none; color: var(--text); text-align: left;
        }
        .job-head-left { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .job-version { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--accent-teal); }
        .job-live {
          font-family: 'IBM Plex Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          background: var(--accent-amber-dim); color: var(--accent-amber); padding: 3px 8px; border-radius: 20px;
        }
        .job-role { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; }
        .job-org { color: var(--text-muted); font-size: 14px; }
        .job-head-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .job-dates { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--text-muted); white-space: nowrap; }
        .chev { color: var(--text-muted); transition: transform 0.25s ease; }
        .chev-open { transform: rotate(180deg); color: var(--accent-teal); }

        .job-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .job-body-open { max-height: 900px; }
        .job-body ul { list-style: none; margin: 0; padding: 0 22px 22px; display: flex; flex-direction: column; gap: 12px; }
        .job-body li { display: flex; gap: 12px; font-size: 14.5px; line-height: 1.55; color: var(--text); }
        .job-body li span:last-child { flex: 1; }
        .change-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.05em; flex-shrink: 0; width: 68px;
        }

        .stack-panel {
          background: var(--bg-panel); border: 1px solid var(--border); border-radius: 14px;
          padding: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 14px;
        }
        .stack-row {
          display: flex; gap: 18px; padding: 14px 16px; border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .stack-row:last-child { border-bottom: none; }
        .stack-key { color: var(--accent-amber); min-width: 110px; }
        .stack-value { color: var(--text-muted); flex: 1; }

        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 900px) { .projects-grid { grid-template-columns: 1fr; } }
        .project-card {
          background: var(--bg-panel); border: 1px solid var(--border); border-radius: 14px; padding: 26px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent-teal), var(--accent-amber));
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover::before { transform: scaleX(1); }
        .project-card:hover { 
          border-color: var(--accent-teal); 
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .project-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin: 0 0 10px; }
        .project-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--accent-teal);
          display: inline-block; margin-bottom: 14px;
          background: var(--accent-teal-dim);
          padding: 4px 10px;
          border-radius: 6px;
        }
        .project-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin: 0; }

        .github-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .github-grid { grid-template-columns: 1fr; } }
        .github-card { display: block; text-decoration: none; color: var(--text); }
        .github-card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
        .github-card-head h3 { margin: 0; }
        .github-card-arrow { color: var(--text-muted); transition: color 0.2s ease, transform 0.2s ease; flex-shrink: 0; }
        .github-card:hover .github-card-arrow { color: var(--accent-amber); transform: translate(2px, -2px); }
        .github-star { display: inline-flex; align-items: center; gap: 3px; color: var(--accent-amber); margin-left: 8px; }

        .ml-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .ml-grid { grid-template-columns: 1fr; } }
        .ml-card { display: block; text-decoration: none; color: var(--text); }

        .domains-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .domain-pill {
          background: var(--bg-panel-2); border: 1px solid var(--border); border-radius: 20px;
          padding: 6px 14px; font-size: 13px; font-family: 'IBM Plex Mono', monospace;
          color: var(--text-muted); white-space: nowrap;
        }

        .contact-section { padding-bottom: 120px; }
        .contact-box {
          background: linear-gradient(135deg, var(--bg-panel-2) 0%, var(--bg-panel) 100%);
          border: 1px solid var(--border); border-radius: 20px; padding: 56px 6vw;
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 22px;
          position: relative;
        }
        .contact-box::before {
          content: '';
          position: absolute;
          top: -50%; right: -10%;
          width: 300px; height: 300px;
          background: radial-gradient(circle, var(--accent-teal-dim) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .contact-box h2 {
          font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 4vw, 42px); margin: 0; max-width: 16ch;
          position: relative; z-index: 1;
        }
        .contact-box h2 em { font-style: normal; color: var(--accent-amber); }
        .contact-links { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; }
        @media (max-width: 640px) {
          .contact-links { flex-direction: column; align-items: stretch; }
          .contact-links > * { width: 100%; }
          .contact-links .github-dropdown { width: 100%; }
          .contact-links .github-dropdown > button { width: 100%; }
        }
        .contact-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 10px;
          font-size: 14px; font-weight: 600; border: 1px solid var(--border); text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .contact-btn:hover::before { width: 200px; height: 200px; }
        .contact-btn.primary { background: var(--accent-amber); color: #FFFFFF; border-color: var(--accent-amber); }
        .contact-btn.primary:hover { 
          background: #b45309;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(217,119,6,0.25);
        }
        .contact-btn:not(.primary):hover { 
          border-color: var(--accent-teal); 
          color: var(--accent-teal);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(13,148,136,0.15);
        }
        .copy-btn.copied {
          background: var(--accent-teal);
          color: #FFFFFF;
          border-color: var(--accent-teal);
        }
        .copy-btn.copied:hover {
          background: #6B9E12;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(132,204,22,0.25);
        }

        .github-dropdown { position: relative; }
        .github-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 6px;
          min-width: 180px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 100;
          animation: dropdownFade 0.2s ease;
        }
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .github-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 6px;
          color: var(--text);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .github-dropdown-item:hover {
          background: var(--bg-panel-2);
          color: var(--accent-teal);
        }

        .project-filters { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
        .filter-btn {
          background: var(--bg-panel); border: 1px solid var(--border); border-radius: 8px;
          padding: 8px 16px; font-size: 13px; font-family: 'IBM Plex Mono', monospace;
          color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
        }
        .filter-btn:hover { border-color: var(--accent-teal); color: var(--text); }
        .filter-btn.active { background: var(--accent-teal); color: #FFFFFF; border-color: var(--accent-teal); }

        footer { 
          text-align: center; 
          padding: 28px 6vw 40px; 
          color: var(--text-muted); 
          font-size: 12px; 
          font-family: 'IBM Plex Mono', monospace;
          position: relative;
          z-index: 1;
        }

        .animate-in { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .animate-in.visible { opacity: 1; transform: translateY(0); }
        .project-card.animate-in { transition: opacity 0.15s ease, transform 0.15s ease; }
        @media (prefers-reduced-motion: reduce) { .animate-in { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <div className="bg-grid" />
      <div className="bg-gradient" />

      <nav className="nav">
        <div className="nav-brand">
          RAKSHITH<span>.</span>VENKATACHALAPATHY
        </div>
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-link ${active === n.id ? "active" : ""}`}
              onClick={() => scrollTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
        <a
          className="nav-linkedin"
          href="https://linkedin.com/in/rakshith-venkat/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-eyebrow">
          <span className="dot" /> 
        </div>
        <h1>
           Reliable systems, <em>end to end.</em>
        </h1>
        <p className="lede">
          I'm a Senior Software Engineer who has spent 5+ years designing and scaling backend services and microservices, from gift card and seller financing platforms to fraud prevention and campaign infrastructure, owning them from spec through production. My work becomes the foundation other teams build on, and I build it with AI native tools daily.
        </p>
        <div className="hero-meta">
          <span><MapPin size={14} /> San Francisco, CA</span>
          
          <span>Java · Go · Python · Distributed Systems</span>
        </div>

        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...METRICS, ...METRICS].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="log">
        <div className="section-head">
          <span className="section-num">01</span>
          <h2>Career Log</h2>
          <p>Every role, read as a release — tap a version to expand the changelog.</p>
        </div>
        <div className="log-list">
          {JOBS.map((job, i) => (
            <div className="animate-in" key={job.version} data-delay={i * 80}>
              <JobEntry
                job={job}
                isOpen={!!openJobs[job.version]}
                onToggle={() => toggleJob(job.version)}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="stack">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2>Stack</h2>
          <p>The dependencies I reach for daily, in production.</p>
        </div>
        <div className="stack-panel">
          {STACK.map((s, i) => (
            <div className="stack-row animate-in" key={s.key} data-delay={i * 60}>
              <span className="stack-key">{s.key}:</span>
              <span className="stack-value">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="domains">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2>Expertise</h2>
          <p>Domains and practices I've worked in, end to end.</p>
        </div>
        <div className="domains-grid">
          {DOMAINS.map((d, i) => (
            <span className="domain-pill animate-in" key={d} data-delay={i * 30}>{d}</span>
          ))}
        </div>
      </section>

      <section id="projects">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2>Projects</h2>
          <p>A selection of side projects, visualizations, GitHub repos, and ML work.</p>
        </div>
        <div className="project-filters">
          {["all", "visualization", "ml"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${projectFilter === f ? "active" : ""}`}
              onClick={() => handleFilterChange(f)}
            >
              {f === "all" ? "All" : f === "visualization" ? "Visualization" : "ML & Data"}
            </button>
          ))}
        </div>
        <div className="projects-grid" key={projectFilter}>
          {filteredProjects.map((p) => (
            <a className="project-card animate-in" key={p.name} href={p.url || "#"} target="_blank" rel="noreferrer">
              <div className="github-card-head">
                <h3>{p.name}</h3>
                <ArrowUpRight size={16} className="github-card-arrow" />
              </div>
              <span className="project-tag">
                {p.tag}
                {p.starred && (
                  <span className="github-star">
                    <Star size={11} fill="currentColor" /> 1
                  </span>
                )}
              </span>
              <p>{p.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-box">
          <h2>
            Building something that moves money, data, or trust at scale? <em>Let's talk.</em>
          </h2>
          <div className="contact-links">
            <a className="contact-btn primary" href="mailto:rakshithvenkat11@gmail.com">
              <Mail size={16} /> Email me
            </a>
            <button className={`contact-btn copy-btn ${copiedEmail ? "copied" : ""}`} onClick={handleCopyEmail}>
              {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
              {copiedEmail ? "Copied!" : "Copy email"}
            </button>
            <a
              className="contact-btn"
              href="https://linkedin.com/in/rakshith-venkat/"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn <ArrowUpRight size={14} />
            </a>
            <div className="github-dropdown">
              <button
                className="contact-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setGithubDropdownOpen(!githubDropdownOpen);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub <ArrowUpRight size={14} />
              </button>
              {githubDropdownOpen && (
                <div className="github-dropdown-menu">
                  <a
                    href="https://github.com/rvenkatachalapathy1"
                    target="_blank"
                    rel="noreferrer"
                    className="github-dropdown-item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub Profile
                  </a>
                  <a
                    href="https://github.com/rvenkatachalapathy1/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="github-dropdown-item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    Portfolio Repo
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer> San Francisco, CA · v5.0.0 — currently shipping</footer>
    </div>
  );
}
