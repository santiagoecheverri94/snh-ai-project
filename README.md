# snh-ai-project
Technical Assessment Project for SNH AI Interview

## File Structure


```
tree-api-assessment/
│
├── client/                 # Vue.js frontend (SPA)
│   └── ...                 
├── src/                    # Backend TypeScript
│   ├── server.ts           # Express HTTP server
│   ├── db.ts               # SQLite connection/utilities
│   ├── routes/             # API endpoint definitions
│   │   └── tree.ts
│   └── services/
│       └── treeService.ts  # Raw SQL queries & logic
├── tests/
│   └── tree.test.ts        # API tests
├── tree-api.db             # SQLite database file (created/managed by app)
├── package.json
├── tsconfig.json
├── README.md
└──
```
