# Gardenbook Server

A comprehensive server-side solution for managing plants and providing a conversational interface for a garden management application.

## Project Overview

The Gardenbook Server is composed of several microservices and components that work together:

1. **plants-mcp**: An MCP (Model-Controller-Presenter) server that provides plant management functionality
2. **gardenbook-api**: A REST API for plant CRUD operations
3. **gardenbook_chat**: A LangGraph agent-based chat interface powered by Claude 3.7 Sonnet
4. **gardenbook_chat_api**: A FastAPI server that provides REST API access to the chat functionality

## Architecture

```
┌───────────────┐     ┌───────────────┐
│ Client        ├─────► gardenbook-api│◄──┐
│ Applications  │     └───────┬───────┘   │
└───────────────┘             │           │
                              ▼           │
┌───────────────┐     ┌───────────────┐  │
│ Client        ├─────► chat_api      ├──┘
│ Applications  │     └───────┬───────┘
└───────────────┘             │
                              ▼
                     ┌───────────────┐     ┌───────────────┐
                     │ gardenbook_chat├─────► plants-mcp   │
                     │ (LangGraph)   │     │ (MCP Server)  │
                     └───────────────┘     └───────────────┘
```

## Components

### plants-mcp

A FastMCP server that provides plant management functionality. It serves as the data access layer for Garden Book.

Features:
- CRUD operations for plants
- MongoDB backend

See [plants-mcp/README.md](plants-mcp/README.md) for more details.

### gardenbook-api

A REST API for managing plants directly. It provides a traditional API interface for client applications.

Features:
- CRUD operations for plants
- Swagger API documentation
- MongoDB integration

See [gardenbook-api/README.md](gardenbook-api/README.md) for more details.

### gardenbook_chat

A LangGraph agent-based chat interface for the Garden Book application. It enables natural language interaction with the plant data.

Features:
- Interfaces with plants-mcp using MultiServerMCPClient
- Powered by Claude 3.7 Sonnet
- Conversational access to plant management

See [gardenbook_chat/README.md](gardenbook_chat/README.md) for more details.

### gardenbook_chat_api

A FastAPI server that provides REST API access to the chat functionality.

Features:
- REST API for the gardenbook_chat functionality
- FastAPI with automatic OpenAPI documentation

See [gardenbook_chat_api/README.md](gardenbook_chat_api/README.md) for more details.

## Getting Started

Each component has its own setup instructions in its respective README. Generally, you'll need:

1. Python 3.11+ for the Python components
2. Node.js 14+ for the gardenbook-api
3. MongoDB (local or remote)
4. Anthropic API key for the chat components

## Development Environment

For Python components:
```bash
cd component_directory
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

For Node.js components:
```bash
cd component_directory
npm install
```

## Testing

Each component has its own test suite. See the individual README files for details on running tests. 