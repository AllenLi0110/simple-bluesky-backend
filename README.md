# simple-bluesky-backend

A simple backend application for interacting with Bluesky, a decentralized social network protocol. This project provides a clean and user-friendly interface for managing posts, follows, and user interactions.

## Folder Structure

```
// simple-bluesky-backend
├── .github
|  └── workflows
├── .projen
├── src
|  ├── apps
|  ├── collections
|  ├── definitions
|  ├── exceptions
|  ├── helpers
|  ├── middlewares
|  ├── models
|  ├── repositories
|  ├── requests
|  ├── responses
|  ├── types
|  ├── utils
|  ├── validators
|  |  └── resources
|  |  └── schemas
|  └── api-server.ts
|  └── error-handler.ts
|  └── index.ts
├── .prettierrc
├── .projenrc.ts
├── esbuild.mjs
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```
git clone git@github.com:AllenLi0110/simple-bluesky-backend.git
```

2. Navigate into the project folder:

```
cd simple-bluesky-backend
```

3. Install dependencies:

```
npm install
```

4. Run the development server:

```
npm run dev
```

5. Open the app in your browser at http://localhost:8080.
