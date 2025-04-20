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
|  ├── queues
|  ├── repositories
|  ├── requests
|  ├── responses
|  ├── types
|  ├── utils
|  ├── validators
|  |  └── resources
|  |  └── schemas
|  └── queue-server.ts
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

4. Start RabbitMQ using Docker:

```
docker compose up -d rabbitmq
```

5. Start the services:

API Server:

```
npm run dev
```

Queue Service:

```
SERVICE_TYPE=queue-service npm run dev
```

The application will be available at http://localhost:8080, and RabbitMQ management interface at http://localhost:15672 (admin/admin).

## Running the Services

### API Server

```bash
npm run dev
```

### Queue Service

```bash
SERVICE_TYPE=queue-service npm run dev
```

The queue service will start and connect to RabbitMQ automatically. You should see the following messages:

```
Start Queue Service
Successfully connected to RabbitMQ
Notification consumer started successfully
```
