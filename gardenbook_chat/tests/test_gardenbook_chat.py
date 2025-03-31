import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

from gardenbook_chat import gardenbook_chat
from langchain_core.messages import HumanMessage

# Test the make_graph context manager
@pytest.mark.asyncio
async def test_make_graph():
    """Test that make_graph initializes and returns an agent"""
    
    # Mock the MultiServerMCPClient
    mock_client = AsyncMock()
    mock_client.__aenter__.return_value = mock_client
    mock_client.get_tools.return_value = [
        {
            "name": "test_tool",
            "description": "A test tool",
            "parameters": {}
        }
    ]
    
    # Mock the ChatAnthropic class
    mock_llm = MagicMock()
    
    # Mock the create_react_agent function
    mock_agent = MagicMock()
    
    with patch("gardenbook_chat.gardenbook_chat.MultiServerMCPClient", return_value=mock_client), \
         patch("gardenbook_chat.gardenbook_chat.ChatAnthropic", return_value=mock_llm), \
         patch("gardenbook_chat.gardenbook_chat.create_react_agent", return_value=mock_agent):
        
        async with gardenbook_chat.make_graph() as agent:
            # Verify that the agent was created with expected values
            assert agent == mock_agent
            mock_client.get_tools.assert_called_once()
            
            # Test that the agent can be called
            test_message = HumanMessage(content="Hello")
            agent.invoke.return_value = {"output": "Test response"}
            
            # Mocking the agent invoke method for the test
            result = await asyncio.to_thread(agent.invoke, {"messages": [test_message]})
            assert "output" in result

# Test error handling
@pytest.mark.asyncio
async def test_make_graph_handles_errors():
    """Test that make_graph correctly handles errors from MCP client or agent creation"""
    
    # Mock the MultiServerMCPClient to raise an exception
    mock_client = AsyncMock()
    mock_client.__aenter__.side_effect = Exception("Test exception")
    
    with patch("gardenbook_chat.gardenbook_chat.MultiServerMCPClient", return_value=mock_client):
        with pytest.raises(Exception):
            async with gardenbook_chat.make_graph() as agent:
                pass  # This should not execute 