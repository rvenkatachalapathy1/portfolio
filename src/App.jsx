import React, { useEffect, useRef, useState } from "react";
import { Mail, ChevronDown, ArrowUpRight, MapPin, Star } from "lucide-react";

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
      { kind: "Improved", text: "Query plans on a 100TB+ PostgreSQL dataset — response times cut from seconds to milliseconds." },
      { kind: "Added", text: "Circuit breakers and retry logic across distributed service boundaries." },
      { kind: "Added", text: "Observability stack: metrics, distributed tracing, structured logging, cutting incident detection and response time." },
      { kind: "Added", text: "Automated engineering workflows to raise deployment reliability and speed up developer velocity." },
    ],
  },
  {
    version: "v3.0.0",
    role: "Software Engineering Intern",
    org: "Kineviz",
    dates: "Aug 2021 — Dec 2021",
    changes: [
      { kind: "Shipped", text: "Analytical pipeline processing large scale datasets into spatial layouts, surfacing relational patterns and thematic clusters." },
      { kind: "Added", text: "Custom graph schema for structuring high dimensional connected data." },
    ],
  },
  {
    version: "v2.0.0",
    role: "Full Stack Engineer Intern",
    org: "Whiznook",
    dates: "Jan 2021 — May 2021",
    changes: [
      { kind: "Shipped", text: "REST and GraphQL endpoints with efficient schema design — cut frontend rollout timelines by 15%." },
      { kind: "Improved", text: "Vue.js and Node.js rendering paths — 2 minutes shaved off load time per session." },
    ],
  },
  {
    version: "v1.0.0",
    role: "Software Engineer",
    org: "Tech Mahindra Ltd.",
    dates: "Nov 2014 — Jul 2019",
    changes: [
      { kind: "Shipped", text: "4–8 internal platform APIs in Java, centralizing employee data, credentials, and logging at enterprise scale." },
      { kind: "Added", text: "Automated testing framework on the competency team, cutting time to write test cases by 50% across emerging open source technology delivered for nine clients in different domains." },
      { kind: "Improved", text: "REST derived data pipelines in PostgreSQL — processing efficiency up 20%." },
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

const PROJECTS = [
  {
    name: "Drink Tracker",
    tag: "Vanilla JS · Supabase",
    desc: "Full stack real time drink tracking app for 30+ users — live leaderboard, advanced filtering, Excel export, hosted at zero ongoing cost.",
  },
  {
    name: "Neural Music Generator",
    tag: "Python · RNN",
    desc: "Recurrent neural network trained on piano data to forecast sequential notes, benchmarked against human composed sequences.",
  },
  {
    name: "Housing Market Dashboard",
    tag: "JavaScript · d3.js",
    desc: "Interactive dashboard mapping 15 years of county level Zillow home value data for geographic and temporal analysis.",
  },
];

const GITHUB_PROJECTS = [
  {
    name: "nodejs-expressjs-vue-app",
    lang: "JavaScript",
    desc: "Full stack web app built with Node.js, Express, and Vue.js end to end.",
    url: "https://github.com/rakshithvenkatachalapathy/nodejs-expressjs-vue-app",
  },
  {
    name: "Patient-vue",
    lang: "Vue",
    desc: "Vue.js patient management application prototype.",
    url: "https://github.com/rakshithvenkatachalapathy/Patient-vue",
  },
  {
    name: "CloneTwitter",
    lang: "Ruby",
    desc: "Twitter clone built in Ruby on Rails — feed, posts, and user interactions.",
    url: "https://github.com/rakshithvenkatachalapathy/CloneTwitter",
  },
  {
    name: "vue-app-employee-search",
    lang: "Vue",
    desc: "Employee search web app built with Vue.js.",
    url: "https://github.com/rakshithvenkatachalapathy/vue-app-employee-search",
  },
  {
    name: "Shopping-Cart-application-Vue.js",
    lang: "Vue",
    desc: "Shopping cart app supporting add/remove from cart plus review creation and display.",
    url: "https://github.com/rakshithvenkatachalapathy/Shopping-Cart-application-Vue.js",
  },
  {
    name: "TreekHacks-Hackathon",
    lang: "Next.js",
    desc: "Hackathon app built in Next.js.",
    url: "https://github.com/rakshithvenkatachalapathy/TreekHacks-Hackathon",
    starred: true,
  },
  {
    name: "ARM-Emulation-C",
    lang: "C",
    desc: "ARM processor emulator written in C.",
    url: "https://github.com/rakshithvenkatachalapathy/ARM-Emulation-C",
  },
  {
    name: "Property-Permits-using-Pandas",
    lang: "Jupyter Notebook",
    desc: "Exploratory data analysis on a San Francisco property permits dataset — pre-processing and linear correlation across fields.",
    url: "https://github.com/rakshithvenkatachalapathy/Property-Permits-using-Pandas",
  },
  {
    name: "D3.js Visualization Series",
    lang: "JavaScript",
    desc: "Line charts, parallel coordinates, scatter plot matrices, force displacement graphs, and choropleth maps — a set of d3.js chart types built from scratch.",
    url: "https://github.com/rakshithvenkatachalapathy/D3-Projects",
  },
];

const ML_PROJECTS = [
  {
    name: "Toll Payment Method Predictor",
    stack: "Python · scikit-learn",
    desc: "Classification pipeline predicting whether NYS Thruway motorists paid by cash or E-ZPass — label encoded vehicle class and entry/exit points, engineered date features, and benchmarked models on a real toll transaction dataset.",
    url: "https://github.com/rvenkatachalapathy1/toll-payment--predictor",
  },
  {
    name: "Forest Cover Type Classification",
    stack: "Python · scikit-learn · XGBoost · Graphviz",
    desc: "Compared six tree based classifiers — Decision Tree, ExtraTrees, RandomForest, XGBoost, AdaBoost, and Bagging — across 581,000+ rows of soil and terrain data, using feature importance to prune 55 inputs while holding 93%+ accuracy, with tree structure visualized via Graphviz.",
    url: "https://github.com/rvenkatachalapathy1/forest-cover-classification",
  },
  {
    name: "Consumer Complaint Classifier",
    stack: "Python · TensorFlow · Keras (LSTM)",
    desc: "LSTM text classifier routing 555,000+ CFPB consumer complaint narratives into 11 product categories, backed by a full preprocessing pipeline — tokenization, sequence padding, stopword and special character removal.",
    url: "https://github.com/rvenkatachalapathy1/consumer-complaint-classifer",
  },
  {
    name: "Speech Based Gender Classification",
    stack: "Python · TensorFlow · Librosa",
    desc: "Extracted MFCC audio features directly from raw speech recordings with Librosa and trained a deep neural network to classify speaker gender from voice alone.",
    url: "https://github.com/rvenkatachalapathy1/speech-gender-classification",
  },
  {
    name: "Political Tweet Sentiment Classifier",
    stack: "Python · scikit-learn",
    desc: "Logistic regression over bag of words tweet features, tuned with grid search cross validation — surfaced a real overfitting gap between cross validation score and held out test performance worth digging into.",
    url: "https://github.com/rvenkatachalapathy1/political-tweet-classifier",
  },
  {
    name: "Breast Cancer Diagnosis via PCA",
    stack: "Python · scikit-learn",
    desc: "Applied principal component analysis to the Wisconsin Diagnostic Breast Cancer dataset, reducing a 30+ feature diagnostic panel down to the components that best separate benign from malignant tumors.",
    url: "https://github.com/rvenkatachalapathy1/pca-brest-cancer-diagnosis",
  },
  {
    name: "Hierarchical Clustering & Dendrograms",
    stack: "Python · SciPy",
    desc: "Agglomerative hierarchical clustering with Ward linkage on both a toy coordinate set and a 2,000 record 1990 U.S. Census sample, visualizing cluster structure through dendrograms.",
    url: "https://github.com/rvenkatachalapathy1/hierarchical-clustering",
  },
  {
    name: "Diabetes Risk Prediction",
    stack: "Python · scikit-learn",
    desc: "Deep neural network classifier over the Pima Indians Diabetes dataset, using stratified shuffle splitting to preserve class balance across train and test sets.",
    url: "https://github.com/rvenkatachalapathy1/diabetes-risk-dnn",
  },
  {
    name: "Fuel Efficiency Prediction",
    stack: "Python · pandas · scikit-learn",
    desc: "Correlation and multicollinearity analysis on the Auto MPG dataset (weight, displacement, horsepower) feeding an Elastic Net regression model for predicting fuel economy.",
    url: "https://github.com/rvenkatachalapathy1/fuel-efficiency-elastic-net",
  },
  {
    name: "Regularized Regression Comparison",
    stack: "Python · scikit-learn",
    desc: "Ridge and Lasso regression benchmarked against a plain linear baseline on the mtcars dataset, tuning regularization strength with grid search to reduce mean squared error.",
    url: "https://github.com/rvenkatachalapathy1/ridge-lasso-regression",
  },
];

const NAV = [
  { id: "top", label: "Intro" },
  { id: "log", label: "Career Log" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "ml", label: "ML Projects" },
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

function ChangeTag({ kind }) {
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
}

function JobEntry({ job, isOpen, onToggle }) {
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
}

export default function Portfolio() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [openJobs, setOpenJobs] = useState({ "v5.0.0": true });

  const toggleJob = (version) =>
    setOpenJobs((prev) => ({ ...prev, [version]: !prev[version] }));

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="portfolio-root">
      <style>{`
        .portfolio-root {
          --bg: #0E1226;
          --bg-panel: #161B33;
          --bg-panel-2: #1B2140;
          --border: rgba(255,255,255,0.08);
          --text: #F5F3EE;
          --text-muted: #8B93AE;
          --accent-amber: #FFB100;
          --accent-teal: #37D6C4;
          --accent-amber-dim: rgba(255,177,0,0.14);
          --accent-teal-dim: rgba(55,214,196,0.14);

          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .portfolio-root * { box-sizing: border-box; }
        .portfolio-root ::selection { background: var(--accent-amber); color: #0E1226; }
        .portfolio-root a { color: inherit; }
        .portfolio-root button { font-family: inherit; cursor: pointer; }
        .portfolio-root :focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 3px; }

        .bg-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        .nav {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 6vw;
          background: rgba(14,18,38,0.82);
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
        @media (max-width: 720px) { .nav-links { display: none; } }

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
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .project-card:hover { border-color: var(--accent-teal); transform: translateY(-3px); }
        .project-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin: 0 0 10px; }
        .project-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--accent-teal);
          display: inline-block; margin-bottom: 14px;
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

        .contact-section { padding-bottom: 120px; }
        .contact-box {
          background: linear-gradient(135deg, var(--bg-panel-2), var(--bg-panel));
          border: 1px solid var(--border); border-radius: 20px; padding: 56px 6vw;
          display: flex; flex-direction: column; align-items: flex-start; gap: 22px;
        }
        .contact-box h2 {
          font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 4vw, 42px); margin: 0; max-width: 16ch;
        }
        .contact-box h2 em { font-style: normal; color: var(--accent-amber); }
        .contact-links { display: flex; gap: 14px; flex-wrap: wrap; }
        .contact-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 10px;
          font-size: 14px; font-weight: 600; border: 1px solid var(--border); text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .contact-btn.primary { background: var(--accent-amber); color: #0E1226; border-color: var(--accent-amber); }
        .contact-btn.primary:hover { background: #ffc433; }
        .contact-btn:not(.primary):hover { border-color: var(--accent-teal); color: var(--accent-teal); }

        footer { text-align: center; padding: 28px 6vw 40px; color: var(--text-muted); font-size: 12px; font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="bg-grid" />

      <nav className="nav">
        <div className="nav-brand">
          RAKSHITH<span>.</span>V
        </div>
        <div className="nav-links">
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
      </nav>

      <section className="hero" id="top">
        <div className="hero-eyebrow">
          <span className="dot" /> 
        </div>
        <h1>
          Systems that move money. <em>Reliably.</em>
        </h1>
        <p className="lede">
          Senior Software Engineer with 5+ years owning payment and fraud prevention systems end to end 
          from spec to production scale. I turn ambiguous risk, compliance, and product requirements into
          reusable APIs other teams build on, and I'm AI native in daily engineering workflows.
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
          {JOBS.map((job) => (
            <JobEntry
              key={job.version}
              job={job}
              isOpen={!!openJobs[job.version]}
              onToggle={() => toggleJob(job.version)}
            />
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
          {STACK.map((s) => (
            <div className="stack-row" key={s.key}>
              <span className="stack-key">{s.key}:</span>
              <span className="stack-value">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2>Side Projects</h2>
          <p>Built outside of work, shipped for real users.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.name}>
              <h3>{p.name}</h3>
              <span className="project-tag">{p.tag}</span>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="github">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2>GitHub Projects</h2>
          <p>Pulled straight from the repo list — full stack apps, data work, and systems experiments.</p>
        </div>
        <div className="projects-grid github-grid">
          {GITHUB_PROJECTS.map((p) => (
            <a className="project-card github-card" key={p.name} href={p.url} target="_blank" rel="noreferrer">
              <div className="github-card-head">
                <h3>{p.name}</h3>
                <ArrowUpRight size={16} className="github-card-arrow" />
              </div>
              <span className="project-tag">
                {p.lang}
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

      <section id="ml">
        <div className="section-head">
          <span className="section-num">05</span>
          <h2>ML &amp; Data Science Projects</h2>
          <p>Coursework and independent modeling work, each with a linked repo.</p>
        </div>
        <div className="projects-grid ml-grid">
          {ML_PROJECTS.map((p) => (
            <a className="project-card ml-card" key={p.name} href={p.url} target="_blank" rel="noreferrer">
              <div className="github-card-head">
                <h3>{p.name}</h3>
                <ArrowUpRight size={16} className="github-card-arrow" />
              </div>
              <span className="project-tag">{p.stack}</span>
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
            <a
              className="contact-btn"
              href="https://linkedin.com/in/rakshith-venkat/"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn <ArrowUpRight size={14} />
            </a>
            <a
              className="contact-btn"
              href="https://github.com/rakshithvenkatachalapathy"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <footer>206 539 7984 · San Francisco, CA · v5.0.0 — currently shipping</footer>
    </div>
  );
}
