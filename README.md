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
$ git clone git@github.com:AllenLi0110/simple-bluesky-backend.git
```

2. Navigate into the project folder:

```
$ cd simple-bluesky-backend
```

3. Install dependencies:

```
$ npm install
```

4. Start RabbitMQ, Grafana, and Prometheus using Docker:

```
$ docker-compose up -d

[+] Running 3/3
 ✔ Container prometheus  Start...
 ✔ Container rabbitmq    Start...
 ✔ Container grafana     Start...
```

5. Start the services:

### API Server

```
$ npm run dev
```

The application will be available at http://localhost:8080.

Queue Service:

```
$ SERVICE_TYPE=queue-service npm run dev
```

The RabbitMQ management: http://localhost:15672 (admin/admin).
The grafana: http://localhost:3000 (admin/admin).
The Prometheus: http://localhost:9090

The queue service will start and connect to RabbitMQ automatically. You should see the following messages:

```
Start Queue Service
Successfully connected to RabbitMQ
Notification consumer started successfully
```
