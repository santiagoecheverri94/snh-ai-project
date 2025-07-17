# Tree API Technical Assessment — Project Overview

**Live Demo:**  
A demo UI is hosted at: [https://santiago-snh-ai.up.railway.app/](https://santiago-snh-ai.up.railway.app/)

Live API Demo can be accessed at (GET and POST supported):

- [https://santiago-snh-ai.up.railway.app/api/tree](https://santiago-snh-ai.up.railway.app/api/tree)

---

## Project Summary

This project implements a production-grade HTTP API for managing tree data structures, including:

- `GET /api/tree` — Returns an array of all trees (with nested children)
- `POST /api/tree` — Creates a new node and attaches it to the specified parent

**A simple Vue.js UI** is provided as a bonus for interactive testing and demonstration.

---

## Testing Approach

- **Automated Testing:**  
  The project uses a single dedicated test file with [Jest](https://jestjs.io/) to verify all API logic.
- **Isolation:**  
  All tests mock the database using an in-memory SQLite instance for full isolation and repeatability.  
- **Behavior:**  
  Tests validate both success and error scenarios (e.g., correct creation, tree structure, invalid inputs).

---

## Persistence Approach

- **Tech:**  
  Persistence is handled with SQLite using the `better-sqlite3` driver.
- **Rationale:**  
  - **Why not NoSQL:**  
    SQL is ideal for representing parent-child relationships. NoSQL would complicate tree mutations.
  - **Why not a `.json` file:**  
    Using `.json` is not robust or scalable for production APIs, especially for data integrity, concurrent writes, and query performance.

---

## Build & Run Instructions

**Prerequisite:**  
Node.js 24.4.0 installed

**Steps:**
1. git clone https://github.com/santiagoecheverri94/snh-ai-project.git
1. cd snh-ai-project
1. npm install
1. npm run build
1. npm run start

---

## API Endpoints

- The Bonus UI is now accessible on `http://localhost:3000/`
- The API endpoints are accessible on:

| Method | Endpoint        | Description                                  |
|--------|----------------|----------------------------------------------|
| GET    | `http://localhost:3000/api/tree`    | Get all tree nodes with nested children      |
| POST   | `http://localhost:3000/api/tree`    | Add a new node (with label + parentId)       |

---

**Thank you for reviewing this challenge!**
