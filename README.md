# Simple Bluesky Backend

A simple backend application for interacting with Bluesky, a decentralized social network protocol. This project provides a clean and user-friendly interface for managing posts, follows, and user interactions.

A robust backend application for interacting with [Bluesky](https://bsky.app), a decentralized social network protocol built on the AT Protocol. This project provides a comprehensive API and service infrastructure for managing posts, follows, user interactions, and application-specific features.

## 📋 Overview

Simple Bluesky Backend is designed with a microservices architecture, featuring:

- **API Server**: RESTful endpoints for client applications
- **Queue Service**: Background processing and event handling via RabbitMQ
- **Observability Stack**: Complete monitoring with Prometheus, Grafana, Jaeger and Loki
- **TypeScript**: Strongly-typed codebase with comprehensive error handling

## 🗂️ Project Structure

```
simple-bluesky-backend/
├── .github/                 # GitHub configurations and workflows
│   └── workflows/           # CI/CD pipeline configurations
├── .projen/                 # Projen configuration files
├── docker/                  # Docker configuration files
│   ├── grafana/             # Grafana dashboards and provisioning
│   ├── loki/                # Loki logging configuration
│   ├── prometheus/          # Prometheus monitoring configuration
│   └── promtail/            # Promtail log collection configuration
├── src/                     # Source code
│   ├── apps/                # Application modules
│   ├── collections/         # Data collections and schemas
│   ├── definitions/         # Type definitions and constants
│   ├── exceptions/          # Custom exception classes
│   ├── helpers/             # Helper functions
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Data models
│   ├── queues/              # Queue processors and consumers
│   ├── repositories/        # Data access layer
│   ├── requests/            # Request models and validation
│   ├── responses/           # Response models
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── validators/          # Input validation
│   │   ├── resources/       # Validation resources
│   │   └── schemas/         # Validation schemas
│   ├── api-server.ts        # API server entry point
│   ├── queue-server.ts      # Queue service entry point
│   ├── error-handler.ts     # Global error handling
│   └── index.ts             # Main application entry point
├── .prettierrc              # Prettier configuration
├── .projenrc.ts             # Projen project configuration
├── docker-compose.yml       # Docker Compose services definition
├── esbuild.mjs              # ESBuild configuration
├── package.json             # NPM package definition
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker and Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AllenLi0110/simple-bluesky-backend.git
```

2. Navigate to the project directory:

```bash
cd simple-bluesky-backend
```

3. Install dependencies:

```bash
npm install
```

4. Start the infrastructure services using Docker:

```bash
docker-compose up -d
```

This will start:

- RabbitMQ for message queuing
- Jaeger for distributed tracing
- Loki for log aggregation
- Prometheus for metrics collection
- Grafana for visualization
- Promtail for log collection

### Running the Application

#### API Server

Start the API server in development mode:

```bash
npm run dev
```

The API will be available at http://localhost:8080.

#### Queue Service

Start the queue service for background processing:

```bash
SERVICE_TYPE=queue-service npm run dev
```

You should see output similar to:

```
Start Queue Service
Successfully connected to RabbitMQ
Notification consumer started successfully
```

## 📊 Monitoring and Management

- **RabbitMQ Management**: http://localhost:15672 (Username: admin, Password: admin)
- **Grafana Dashboards**: http://localhost:3000 (Username: admin, Password: admin)
- **Prometheus Metrics**: http://localhost:9090
- **Jaeger Tracing UI**: http://localhost:16686

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

## 🛠️ Development

This project uses [Projen](https://github.com/projen/projen) for project configuration and management.

Update project configuration:

```bash
npx projen
```

## 📦 Building for Production

Build a production bundle:

```bash
npm run build
```

Lint the codebase:

```bash
npm run eslint
```
