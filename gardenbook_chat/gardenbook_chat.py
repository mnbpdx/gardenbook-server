import asyncio
import sys
import os
from getpass import getpass
from typing import List
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# LangChain imports
from langchain_core.messages import HumanMessage, AIMessage
from langchain_anthropic import ChatAnthropic
from langchain_ollama import ChatOllama

# LangGraph imports
from langgraph.prebuilt import create_react_agent
from langgraph.graph import END

# MCP Adapter imports
from langchain_mcp_adapters.client import MultiServerMCPClient

# Default MCP server path
DEFAULT_MCP_SERVER_PATH = "../plants-mcp/garden_mcp.py"

async def main():
    # Check command line arguments
    if len(sys.argv) < 2:
        print("Usage: python gardenbook_chat.py <path_to_garden_mcp.py>")
        sys.exit(1)
    
    # Check for Anthropic API key
    if "ANTHROPIC_API_KEY" not in os.environ:
        os.environ["ANTHROPIC_API_KEY"] = getpass("Enter your Anthropic API key: ")
    
    mcp_server_path = sys.argv[1]
    
    # Set up MCP client with garden server
    async with MultiServerMCPClient(
        {
            "garden": {
                "command": "python",
                "args": [mcp_server_path],
                "transport": "stdio",
            }
        }
    ) as client:
        # Get tools from the MCP server
        tools = client.get_tools()
        
        # Initialize LLM with Claude 3.7
        llm = ChatAnthropic(
            model="claude-3-7-sonnet-latest",
            temperature=0
        )
        
        # Create the agent
        agent = create_react_agent(llm, tools)
        
        # Run the chat loop
        print("\nGarden LangGraph Agent Started!")
        print("Type your messages or 'quit' to exit")
        
        chat_history = []
        
        while True:
            user_input = input("\nYou: ").strip()
            
            if user_input.lower() == 'quit':
                break
            
            # Format messages for the agent
            messages = chat_history + [HumanMessage(content=user_input)]
            
            # Run the agent
            try:
                agent_response = await agent.ainvoke({"messages": messages})
                response_message = agent_response["messages"][-1]
                
                # Print the response
                print(f"\nAssistant: {response_message.content}")
                
                # Add messages to history
                chat_history.append(HumanMessage(content=user_input))
                chat_history.append(AIMessage(content=response_message.content))
            except Exception as e:
                print(f"\nError occurred: {str(e)}")
                
                # Add error message to history so the conversation can continue
                error_message = f"I encountered an error: {str(e)}"
                print(f"\nAssistant: {error_message}")
                chat_history.append(AIMessage(content=error_message))

# Alternative implementation using LangGraph API server approach
@asynccontextmanager
async def make_graph(mcp_server_path=DEFAULT_MCP_SERVER_PATH):
    """Creates a LangGraph agent with MCP tools loaded from the garden server"""
    async with MultiServerMCPClient(
        {
            "garden": {
                "command": "python",
                "args": [mcp_server_path],
                "transport": "stdio",
            }
        }
    ) as client:
        # Get tools from the MCP server
        tools = client.get_tools()
        
        # Initialize LLM with Claude 3.7
        llm = ChatAnthropic(
            model="claude-3-7-sonnet-latest",
            temperature=0
        )
        
        # Create the agent
        agent = create_react_agent(llm, tools)
        yield agent

if __name__ == "__main__":
    # Example of using the LangGraph implementation as a context manager
    async def example_usage():
        async with make_graph("../plants-mcp/garden_mcp.py") as agent:
            # You can now use the agent within this context
            messages = [HumanMessage(content="What plants are in the database?")]
            response = await agent.ainvoke({"messages": messages})
            print(f"\nAssistant: {response['messages'][-1].content}")
    
    # Run either the main implementation or the example
    asyncio.run(main())  # Use this for the interactive chat
    # asyncio.run(example_usage())  # Uncomment this to try the context manager approach 