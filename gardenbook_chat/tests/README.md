# Gardenbook Chat Tests

Unit tests for the gardenbook_chat module.

## Running Tests

Make sure you have the required dependencies installed:

```bash
pip install -r ../requirements.txt
```

Run the tests using pytest:

```bash
pytest
```

Or for more verbose output:

```bash
pytest -v
```

## Test Structure

- `test_gardenbook_chat.py`: Tests for the main functionality in gardenbook_chat.py
  - Tests the `make_graph` function
  - Mocks external dependencies like MultiServerMCPClient and LLM 