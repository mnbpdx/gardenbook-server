# Garden Book API

A REST API for managing plants in the Garden Book application.

## Features

- CRUD operations for plants
- Swagger API documentation
- In-memory data store (can be replaced with a real database)

## Getting Started

### Prerequisites

- Node.js >= 14
- npm >= 6

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd gardenbook-api
npm install
```

### Running the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

### Running tests

```bash
npm test
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Project Structure

```
gardenbook-api/
├── src/
│   ├── models/       - Data models
│   ├── routes/       - API routes
│   ├── app.js        - Express application setup
│   └── index.js      - Application entry point
├── tests/            - API tests
├── package.json      - Dependencies and scripts
└── README.md         - Project documentation
```

## Future Improvements

- Add authentication and authorization
- Replace in-memory storage with a real database
- Add validation middleware
- Add environment configuration 