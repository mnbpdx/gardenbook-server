# Gardenbook Chat API

A FastAPI server that provides REST API access to the gardenbook_chat functionality.

## Setup

1. Create and activate a virtual environment:
```
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```
uv pip install -r requirements.txt
```

3. Start the server:
```
uvicorn main:app --reload
```

## API Endpoints

- `GET /` - Health check endpoint
- `POST /chat` - Chat endpoint that processes a single request

## Example Usage

### Chat:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What plants are in the database?"}], "mcp_server_path": "../plants-mcp/garden_mcp.py"}'
``` 