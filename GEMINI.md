# Project: Nini's Blog & AI Task Manager

This workspace contains a dual-purpose project: a personal technical blog built with Hexo and an experimental AI-driven Task Management System.

## 📁 Project Structure

- **Hexo Blog (Root):** A personal portfolio and blog site.
  - `_config.yml`: Global Hexo configuration.
  - `source/`: Contains blog posts (Markdown) and site assets.
  - `themes/Chic/`: The active Hexo theme ("Chic").
- **AI Task Manager (`TEST/AI_Task_Manager/`):** A full-stack application for intelligent scheduling.
  - `backend/`: FastAPI service with AI and Google Calendar integration.
  - `frontend/`: React/TypeScript web application.

---

## 🚀 Hexo Blog (Nini's Blog)

**Author:** HsingYin Hsieh (Nini)
**Purpose:** Technical portfolio and blog sharing insights on AI, web development, and career growth.

### Key Technologies
- **Hexo (v8.1.1):** Static site generator.
- **Chic Theme:** A clean, elegant theme for Hexo.
- **MathJax:** Supported for mathematical notation.

### Commands
- `npm run server`: Start local development server.
- `npm run build`: Generate static files.
- `npm run clean`: Clean generated files and cache.
- `npm run deploy`: Deploy to GitHub Pages.

---

## 🤖 AI Task Manager (TaskFlow AI)

**Purpose:** An "AI Project Manager" that schedules tasks using DeepSeek AI and respects Google Calendar constraints.

### Architecture & Tech Stack
- **Backend:**
  - **Framework:** FastAPI (Python 3.10+).
  - **Database:** PostgreSQL (SQLAlchemy ORM).
  - **AI Engine:** DeepSeek-V3 (via OpenAI SDK compatibility).
  - **Integrations:** Google Calendar API (OAuth 2.0).
- **Frontend:**
  - **Framework:** React 19 (TypeScript).
  - **Styling:** Tailwind CSS v4.
  - **Visuals:** Chart.js, Lucide-React.

### Core Features
1. **AI Daily Scheduler:** Dynamic time-blocking based on available hours and task priorities.
2. **Context-Aware Scheduling:** Automatically avoids conflicts with Google Calendar events.
3. **AI Task Parsing:** natural language input for quick task creation.
4. **Interactive Dashboard:** Visual analytics for task distribution and progress.

### Commands
- **Backend:**
  ```bash
  cd TEST/AI_Task_Manager/backend
  pip install -r requirements.txt
  python main.py
  ```
- **Frontend:**
  ```bash
  cd TEST/AI_Task_Manager/frontend
  npm install
  npm run dev
  ```

---

## 🛠️ Development Conventions

- **Blog Posts:** Located in `source/_posts/`. Use standard Hexo Front-matter.
- **Sub-project Isolation:** `TEST/AI_Task_Manager` is a standalone project; do not mix its dependencies with the root `package.json`.
- **Environment Variables:** `TEST/AI_Task_Manager/backend/.env` is required for AI and Google API integration.
- **AI Model:** Defaults to DeepSeek-V3. Ensure `DEEPSEEK_API_KEY` is configured in the backend environment.
