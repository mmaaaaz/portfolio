---
title: "AskSHU: University RAG Chatbot"
projectId: "project-1"
summary: "A RAG chatbot that makes university information searchable through conversation. Built in two weeks, runs at zero cost."
role: "Solo Developer"
timeline: "2 weeks"
stack: "Cloudflare Workers, D1, Vectorize, Next.js 15, Python, Langchain"
liveUrl: "https://askshu.vercel.app"
images: []
---

## Why I Built This

I've watched people waste 20+ minutes searching university websites for basic information—admission deadlines, fee structures, faculty contacts. The information exists, it's just buried across dozens of pages and PDFs that nobody wants to dig through.

I wanted to see if I could make an entire university website searchable through a simple chat interface. Two weeks later, I had a working prototype.

---

## How It Works

The system is a Retrieval-Augmented Generation (RAG) chatbot. When someone asks a question:

1. The query gets converted to an embedding
2. Vector search finds the 20 most relevant content chunks from the database
3. Those chunks + the question go to Llama 3.3 70B
4. The model generates a response grounded in actual university content

If the answer isn't in the database, the model says so. No hallucinations about fake deadlines.

---

## Tech Stack

I needed this cheap and simple. No budget, no ops overhead.

Cloudflare's edge stack handled everything:

| Layer | Tool | Why |
|-------|------|-----|
| Compute | Workers | No cold starts, runs globally |
| Vector DB | Vectorize | Built-in embeddings |
| Storage | D1 | SQLite, co-located with Workers |
| LLM | Llama 3.3 70B | Free via Workers AI |
| Sessions | KV | Chat history persistence |

Frontend is Next.js 15 on Vercel with streaming responses.

**Total cost: $0.** Workers AI has generous free limits—we're nowhere near hitting them.

---

## The Content Pipeline

RAG is only as good as your content. I built a Python crawler that:

1. Traverses the university site (BFS, respects robots.txt)
2. Converts pages to clean markdown
3. Chunks text recursively (1024 chars, 200-char overlap)

408 pages became 2,500+ searchable chunks. The whole pipeline runs in under 2 hours.

---

## What I Learned

**Chunking matters more than model size.** I tested 3B and 7B models—they worked fine when the retrieved context was good. Bad chunking breaks even the best models.

**Streaming changes perception.** Users don't care about total response time as much as time-to-first-token. Streaming made the whole thing feel instant.

**Edge deployment is underrated.** Sub-400ms TTFB globally. No regional latency surprises.

---

## Results

Students get answers in seconds instead of digging through the website. Staff spend less time answering the same questions. The university has a 24/7 information system that costs nothing to run.

For a two-week project, that's a solid outcome.
