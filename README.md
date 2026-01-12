# 🔍 High-Performance Search Application

A high-performance search application built using **Next.js** and **TailwindCSS**, focused on delivering fast, responsive, and scalable search with optimized API usage and efficient database querying.

---

## 🚀 Features

- ⚡ **Fast Search Experience** with real-time suggestions
- 🧠 **Debouncing & Throttling** to optimize API calls
- 📉 Reduced unnecessary API requests by **~40%**
- 🔎 **Autocomplete & Partial Text Matching**
- 🗄️ Optimized **SQL queries** for performance
- 🎨 Clean, responsive UI using **TailwindCSS**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React
- **Styling:** TailwindCSS
- **Backend:** API Routes (Next.js)
- **Database:** SQL (MySQL / PostgreSQL)
- **Optimization Techniques:** Debouncing, Throttling

---

## ⚙️ Performance Optimizations

### Debouncing
- Delays API calls until the user stops typing
- Prevents unnecessary requests during fast input

### Throttling
- Limits API calls to a fixed interval
- Ensures controlled server load under heavy typing

✅ These techniques reduced API calls by **approximately 40%**, improving both frontend responsiveness and backend stability.

---

## 🗄️ Database Design & Query Optimization

- Implemented **efficient SQL queries** using:
  - `LIKE` with indexed columns
  - Partial text matching for autocomplete
- Optimized queries to minimize full-table scans
- Improved response time for search suggestions
