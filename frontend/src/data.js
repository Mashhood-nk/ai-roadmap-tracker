export const PHASES = [
  {
    id: "p0",
    label: "Phase 0",
    title: "Foundation",
    weeks: "Weeks 1–2",
    color: "#0D7377",
    lightColor: "#E8F6F7",
    icon: "🏗️",
    sections: [
      {
        id: "p0w1",
        title: "Week 1 — GitHub & Environment",
        tasks: [
          { id: "p0w1t1", text: "Create GitHub profile + write a strong README", note: "Include clinical AI angle, AUC scores, published research" },
          { id: "p0w1t2", text: "Push all existing ML/Python projects with clean READMEs", note: "Trauma ML model, Flask apps, systematic review tools" },
          { id: "p0w1t3", text: "Add AUC scores + results to each project README" },
          { id: "p0w1t4", text: "Install VS Code with Python + Git extensions" },
          { id: "p0w1t5", text: "Set up Conda environment: Python 3.11", note: "conda create -n ai-dev python=3.11" },
          { id: "p0w1t6", text: "Verify Git workflow: commit → push → pull → branch" },
        ]
      },
      {
        id: "p0w2",
        title: "Week 2 — APIs & Tools",
        tasks: [
          { id: "p0w2t1", text: "Sign up for OpenAI API + test chat completion in Python", note: "platform.openai.com" },
          { id: "p0w2t2", text: "Sign up for Anthropic API + test Claude in Python", note: "console.anthropic.com" },
          { id: "p0w2t3", text: "Sign up for HuggingFace + test an inference call", note: "huggingface.co" },
          { id: "p0w2t4", text: "Install LangChain: conda install langchain-community" },
          { id: "p0w2t5", text: "Install FastAPI + uvicorn — run a hello-world endpoint" },
          { id: "p0w2t6", text: "Install Streamlit — run their getting-started demo" },
          { id: "p0w2t7", text: "Watch fast.ai Lesson 1 (~1 hr)", note: "course.fast.ai" },
        ]
      },
      {
        id: "p0del",
        title: "✅ Phase 0 Deliverables",
        isDeliverables: true,
        tasks: [
          { id: "p0d1", text: "GitHub profile LIVE with README and 3+ repos" },
          { id: "p0d2", text: "One existing project has clean README with AUC results" },
          { id: "p0d3", text: "VS Code + Conda + Python 3.11 + Git all working" },
          { id: "p0d4", text: "API keys active: OpenAI + Anthropic + HuggingFace" },
          { id: "p0d5", text: "LangChain, FastAPI, Streamlit installed and tested" },
        ]
      }
    ]
  },
  {
    id: "p1",
    label: "Phase 1",
    title: "Modern AI Tools",
    weeks: "Weeks 3–6",
    color: "#1A6B5A",
    lightColor: "#E8F5F1",
    icon: "🤖",
    sections: [
      {
        id: "p1w3",
        title: "Week 3 — LangChain & API Fundamentals",
        tasks: [
          { id: "p1w3t1", text: "Build first LangChain chain — prompt template for medical text", note: "python.langchain.com — Get started" },
          { id: "p1w3t2", text: "Learn output parsers — extract structured data from LLM responses" },
          { id: "p1w3t3", text: "Stream OpenAI chat completions in Python" },
          { id: "p1w3t4", text: "Stream Anthropic (Claude) responses — compare output quality" },
          { id: "p1w3t5", text: "Daily git commit — build the habit" },
        ]
      },
      {
        id: "p1w4",
        title: "Week 4 — RAG Pipeline",
        tasks: [
          { id: "p1w4t1", text: "Read: what is RAG, chunk → embed → retrieve loop", note: "LangChain RAG tutorial in docs" },
          { id: "p1w4t2", text: "Set up ChromaDB locally — create collection, add text, query", note: "docs.trychroma.com" },
          { id: "p1w4t3", text: "Build basic RAG pipeline: load .txt → embed → query with LLM" },
          { id: "p1w4t4", text: "Write your own RAG summary notes (interview material)" },
          { id: "p1w4t5", text: "Daily git commit" },
        ]
      },
      {
        id: "p1w5",
        title: "Week 5 — Project 0: Clinical RAG Chatbot",
        tasks: [
          { id: "p1w5t1", text: "Download ATLS or WHO trauma guidelines PDF" },
          { id: "p1w5t2", text: "Load PDF with PyPDFLoader → chunk → embed into ChromaDB" },
          { id: "p1w5t3", text: "Wire LLM to answer questions from retrieved chunks with citations" },
          { id: "p1w5t4", text: "Build Streamlit UI — question input + answer + source reference" },
          { id: "p1w5t5", text: "Build FastAPI endpoint: POST /predict wrapping trauma ML model", note: "fastapi.tiangolo.com" },
          { id: "p1w5t6", text: "Daily git commit" },
        ]
      },
      {
        id: "p1w6",
        title: "Week 6 — Deploy & Share",
        tasks: [
          { id: "p1w6t1", text: "Deploy Project 0 to HuggingFace Spaces (free, no credit card)", note: "huggingface.co/spaces — Streamlit type" },
          { id: "p1w6t2", text: "Test the live URL end-to-end" },
          { id: "p1w6t3", text: "Write LinkedIn post about what you built + live link", note: "Tag HuggingFace in the post" },
          { id: "p1w6t4", text: "Daily git commit" },
        ]
      },
      {
        id: "p1del",
        title: "✅ Phase 1 Deliverables",
        isDeliverables: true,
        tasks: [
          { id: "p1d1", text: "LangChain chains and prompt templates built + committed" },
          { id: "p1d2", text: "RAG pipeline working locally with ChromaDB" },
          { id: "p1d3", text: "Project 0: Clinical RAG Chatbot LIVE on HuggingFace Spaces" },
          { id: "p1d4", text: "FastAPI endpoint wrapping one ML model — returns predictions" },
          { id: "p1d5", text: "First LinkedIn post published with live demo link" },
        ]
      }
    ]
  },
  {
    id: "p2",
    label: "Phase 2",
    title: "Portfolio Projects",
    weeks: "Weeks 7–12",
    color: "#2E4057",
    lightColor: "#EEF1F5",
    icon: "🚀",
    sections: [
      {
        id: "p2w7",
        title: "Week 7 — Project 1: Trauma Triage API (Setup)",
        tasks: [
          { id: "p2w7t1", text: "Sign up on PhysioNet.org for MIMIC-IV access", note: "physionet.org — 1–2 days to approve" },
          { id: "p2w7t2", text: "Complete MIMIC-IV ethics training (CITI Program, ~2 hrs)", note: "Required. Add to CV." },
          { id: "p2w7t3", text: "Download MIMIC-IV demo — explore hemodynamic columns" },
          { id: "p2w7t4", text: "Set up FastAPI project structure — routes, schemas, models" },
          { id: "p2w7t5", text: "Load existing trauma ML model and run predictions locally" },
        ]
      },
      {
        id: "p2w8",
        title: "Week 8 — Project 1: Complete",
        tasks: [
          { id: "p2w8t1", text: "Add SHAP explainability — show which features drove the prediction", note: "pip install shap — shap.readthedocs.io" },
          { id: "p2w8t2", text: "Retrain model on MIMIC-IV subset (HR, BP, GCS, etc.)" },
          { id: "p2w8t3", text: "Build Streamlit UI — input form + mortality risk % + SHAP chart" },
          { id: "p2w8t4", text: "Deploy to HuggingFace Spaces" },
          { id: "p2w8t5", text: "Write README: what it does, dataset, model, SHAP, live link" },
        ]
      },
      {
        id: "p2w9",
        title: "Week 9 — Project 2: Abstract Screener (Setup)",
        tasks: [
          { id: "p2w9t1", text: "Download PubMedQA dataset (free, no registration)" },
          { id: "p2w9t2", text: "Build single-abstract mode: paste abstract + PICO → Include/Exclude + reasoning" },
          { id: "p2w9t3", text: "Build Streamlit UI for single-abstract mode" },
          { id: "p2w9t4", text: "Deploy single-abstract mode to HuggingFace Spaces" },
        ]
      },
      {
        id: "p2w10",
        title: "Week 10 — Project 2: Complete + Blog",
        tasks: [
          { id: "p2w10t1", text: "Add batch mode: upload CSV → scored Excel output", note: "Use your own abstract screening workflow as test data" },
          { id: "p2w10t2", text: "Add Excel export with openpyxl — Include/Exclude + reasoning columns" },
          { id: "p2w10t3", text: "Write blog: 'How I automated my systematic review workflow with LLMs'" },
          { id: "p2w10t4", text: "Publish blog on Medium or LinkedIn Articles with live demo link" },
        ]
      },
      {
        id: "p2w11",
        title: "Week 11 — Project 3: PubMed MCP Server (Setup)",
        tasks: [
          { id: "p2w11t1", text: "Read MCP docs: modelcontextprotocol.io", note: "Understand tool/resource/prompt primitives" },
          { id: "p2w11t2", text: "Install Python MCP SDK: pip install mcp" },
          { id: "p2w11t3", text: "Build search_pubmed(query) MCP tool — calls PubMed API", note: "PubMed API: free, no key — eutils.ncbi.nlm.nih.gov" },
          { id: "p2w11t4", text: "Test the tool locally — confirm real PubMed results return" },
        ]
      },
      {
        id: "p2w12",
        title: "Week 12 — Project 3: Complete",
        tasks: [
          { id: "p2w12t1", text: "Add get_abstract(pmid) tool — fetches full abstract for a PMID" },
          { id: "p2w12t2", text: "Add summarise_paper(pmid) tool — fetches + LLM-summarises paper" },
          { id: "p2w12t3", text: "(Bonus) Add one LangGraph agent step — agent decides which tool to call" },
          { id: "p2w12t4", text: "Record a Loom demo video (5–10 min) showing MCP server", note: "loom.com — free tier" },
          { id: "p2w12t5", text: "Write README with tool descriptions + demo link" },
          { id: "p2w12t6", text: "Push to GitHub — your standout 2025–2026 interview project" },
        ]
      },
      {
        id: "p2del",
        title: "✅ Phase 2 Deliverables",
        isDeliverables: true,
        tasks: [
          { id: "p2d1", text: "PhysioNet approved, MIMIC-IV ethics training DONE — on CV" },
          { id: "p2d2", text: "Project 1: Trauma Triage API LIVE on HuggingFace with SHAP" },
          { id: "p2d3", text: "Project 2: Abstract Screener LIVE + batch mode + blog published" },
          { id: "p2d4", text: "Project 3: PubMed MCP Server on GitHub with Loom demo" },
          { id: "p2d5", text: "LangGraph agent concept understood (even 1 step counts)" },
        ]
      }
    ]
  },
  {
    id: "p3",
    label: "Phase 3",
    title: "MLOps + CV",
    weeks: "Weeks 13–18",
    color: "#6B21A8",
    lightColor: "#F5F0FF",
    icon: "⚙️",
    sections: [
      {
        id: "p3w13",
        title: "Week 13 — MLflow Experiment Tracking",
        tasks: [
          { id: "p3w13t1", text: "Install MLflow: conda install mlflow", note: "mlflow.org/docs — quickstart" },
          { id: "p3w13t2", text: "Add MLflow tracking to Project 1 — log accuracy, AUC, hyperparameters" },
          { id: "p3w13t3", text: "Run 3+ experiments with different parameters — compare in MLflow UI" },
          { id: "p3w13t4", text: "Screenshot MLflow dashboard — use in portfolio README" },
        ]
      },
      {
        id: "p3w14",
        title: "Week 14 — Docker Containerisation",
        tasks: [
          { id: "p3w14t1", text: "Install Docker Desktop", note: "docs.docker.com/get-docker" },
          { id: "p3w14t2", text: "Write Dockerfile for Project 1 FastAPI app", note: "FROM python:3.11-slim + COPY + RUN pip install + CMD" },
          { id: "p3w14t3", text: "Build image and run locally: docker build + docker run" },
          { id: "p3w14t4", text: "Write docker-compose.yml for API + Streamlit together" },
          { id: "p3w14t5", text: "Push image to Docker Hub (free account)" },
        ]
      },
      {
        id: "p3w15",
        title: "Week 15 — GitHub Actions CI",
        tasks: [
          { id: "p3w15t1", text: "Learn GitHub Actions basics — .github/workflows/*.yml structure" },
          { id: "p3w15t2", text: "Write CI workflow: on push → install → tests → flake8 lint" },
          { id: "p3w15t3", text: "Add 2+ unit tests to Project 1 (test /predict endpoint)" },
          { id: "p3w15t4", text: "Get green CI badge on your README" },
        ]
      },
      {
        id: "p3w16",
        title: "Week 16 — CV Rewrite",
        tasks: [
          { id: "p3w16t1", text: "New headline: 'Clinical AI Engineer │ LLMs · MCP · Trauma ML │ Python · LangChain · FastAPI'" },
          { id: "p3w16t2", text: "Rewrite summary — lead with AUC scores + deployed apps, not job duties" },
          { id: "p3w16t3", text: "Rewrite every bullet with impact numbers: 'Built X that achieved Y'" },
          { id: "p3w16t4", text: "Add Projects section — all 3 portfolio projects with live links" },
          { id: "p3w16t5", text: "Add MIMIC-IV ethics training and publications prominently" },
          { id: "p3w16t6", text: "Get CV reviewed by peer or mentor" },
        ]
      },
      {
        id: "p3w17",
        title: "Week 17 — LinkedIn Overhaul",
        tasks: [
          { id: "p3w17t1", text: "Update LinkedIn headline to match new CV positioning" },
          { id: "p3w17t2", text: "Rewrite About section — tell the clinical AI specialist story" },
          { id: "p3w17t3", text: "Add Featured section: all 4 projects with screenshots + links" },
          { id: "p3w17t4", text: "Send 10 connection requests to AI/ML people in Qatar + GCC" },
          { id: "p3w17t5", text: "Comment on 5 AI posts for profile visibility" },
        ]
      },
      {
        id: "p3w18",
        title: "Week 18 — Blog Posts",
        tasks: [
          { id: "p3w18t1", text: "Write blog post 1: 'Building a Trauma Triage API with SHAP Explainability'", note: "Medium or LinkedIn Articles" },
          { id: "p3w18t2", text: "Write blog post 2: 'MCP — Why I Built a PubMed Server for Claude'" },
          { id: "p3w18t3", text: "Share both posts on LinkedIn — tag relevant people" },
        ]
      },
      {
        id: "p3del",
        title: "✅ Phase 3 Deliverables",
        isDeliverables: true,
        tasks: [
          { id: "p3d1", text: "MLflow dashboard with 3+ experiment run history" },
          { id: "p3d2", text: "Docker container for one project — runs with docker run" },
          { id: "p3d3", text: "GitHub Actions CI — green badge on at least one repo" },
          { id: "p3d4", text: "CV fully rewritten — clinical AI framing + impact numbers" },
          { id: "p3d5", text: "LinkedIn updated — headline, about, featured projects" },
          { id: "p3d6", text: "2 blog posts published and shared" },
        ]
      }
    ]
  },
  {
    id: "p4",
    label: "Phase 4",
    title: "Job Search",
    weeks: "Weeks 19–24",
    color: "#B45309",
    lightColor: "#FFF8E8",
    icon: "🎯",
    sections: [
      {
        id: "p4w19",
        title: "Week 19 — Launch Job Search",
        tasks: [
          { id: "p4w19t1", text: "Build job tracker spreadsheet: Role, Company, Date, Status, Notes" },
          { id: "p4w19t2", text: "Search LinkedIn Jobs: 'ML Engineer Qatar', 'AI Engineer Remote'" },
          { id: "p4w19t3", text: "Search Naukri Gulf for Qatar/GCC AI roles" },
          { id: "p4w19t4", text: "Search HuggingFace Jobs for remote AI/ML roles" },
          { id: "p4w19t5", text: "Send 10 quality applications this week (tailor each)" },
          { id: "p4w19t6", text: "Check HMC internal job board — domain knowledge is unbeatable here" },
        ]
      },
      {
        id: "p4w20",
        title: "Week 20 — ML Interview Prep",
        tasks: [
          { id: "p4w20t1", text: "Review: bias/variance, overfitting, regularisation", note: "StatQuest on YouTube" },
          { id: "p4w20t2", text: "Review: ROC-AUC, precision/recall, F1, confusion matrix" },
          { id: "p4w20t3", text: "Review: decision trees, random forest, XGBoost, gradient boosting" },
          { id: "p4w20t4", text: "Do 5 LeetCode easy problems (array/string)" },
          { id: "p4w20t5", text: "Continue applying: 2–3 quality jobs/day" },
        ]
      },
      {
        id: "p4w21",
        title: "Week 21 — LLM/GenAI Interview Prep",
        tasks: [
          { id: "p4w21t1", text: "Study: RAG pipeline — chunking, embedding, retrieval, reranking" },
          { id: "p4w21t2", text: "Study: MCP — what it is, why it matters, how your server works" },
          { id: "p4w21t3", text: "Study: function calling vs tool use vs agents" },
          { id: "p4w21t4", text: "Study: embeddings, vector databases, cosine similarity" },
          { id: "p4w21t5", text: "Write notes on 20 key LLM interview questions", note: "huyenchip.com" },
          { id: "p4w21t6", text: "Continue applying: 2–3 quality jobs/day" },
        ]
      },
      {
        id: "p4w22",
        title: "Week 22 — Mock Interviews",
        tasks: [
          { id: "p4w22t1", text: "Record: 'Tell me about a project you built'" },
          { id: "p4w22t2", text: "Record: 'How does RAG work?'" },
          { id: "p4w22t3", text: "Record: 'Explain MCP and why you built a PubMed server'" },
          { id: "p4w22t4", text: "Record STAR behavioural questions" },
          { id: "p4w22t5", text: "Watch recordings — note filler words, pacing, clarity" },
          { id: "p4w22t6", text: "Continue applying: 2–3 quality jobs/day" },
        ]
      },
      {
        id: "p4w23",
        title: "Week 23 — Networking Push",
        tasks: [
          { id: "p4w23t1", text: "Message 5 HMC alumni or colleagues in AI/data roles on LinkedIn" },
          { id: "p4w23t2", text: "Reach out to QCRI contacts" },
          { id: "p4w23t3", text: "Message 2 Qatar Foundation or Sidra Medicine data contacts" },
          { id: "p4w23t4", text: "Follow up on all applications sent 2+ weeks ago" },
          { id: "p4w23t5", text: "Continue applying: 2–3 quality jobs/day" },
        ]
      },
      {
        id: "p4w24",
        title: "Week 24 — Review & Pivot",
        tasks: [
          { id: "p4w24t1", text: "Calculate response rate: applications sent vs interviews booked" },
          { id: "p4w24t2", text: "If rate < 5%, rewrite cold message / cover note strategy" },
          { id: "p4w24t3", text: "If no interviews yet, consider Upwork/Toptal as a freelance bridge" },
          { id: "p4w24t4", text: "Do a full 45-min mock interview (record or with a friend)" },
          { id: "p4w24t5", text: "Keep going. Consistency wins. 🏁" },
        ]
      },
      {
        id: "p4del",
        title: "✅ Phase 4 Deliverables — FINISH LINE",
        isDeliverables: true,
        tasks: [
          { id: "p4d1", text: "Job tracker with 30+ applications logged" },
          { id: "p4d2", text: "ML fundamentals interview notes done" },
          { id: "p4d3", text: "LLM/GenAI interview notes done (20+ questions)" },
          { id: "p4d4", text: "2 mock interviews recorded and reviewed" },
          { id: "p4d5", text: "5+ warm outreach messages sent to real contacts" },
          { id: "p4d6", text: "First interview booked 🎉" },
        ]
      }
    ]
  }
]

export function getAllTaskIds() {
  return PHASES.flatMap(p => p.sections.flatMap(s => s.tasks.map(t => t.id)))
}

export function getTotalTasks() {
  return PHASES.reduce((acc, p) => acc + p.sections.reduce((a, s) => a + s.tasks.length, 0), 0)
}
