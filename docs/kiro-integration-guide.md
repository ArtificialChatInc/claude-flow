# Kiro IDE + Claude Flow Integration Guide

This guide shows how to integrate Claude Flow's AI orchestration capabilities with Kiro IDE for enhanced development workflows.

## Overview

Kiro IDE can leverage Claude Flow's 22+ specialized agents and 100+ MCP tools through seamless integration, providing:

- Multi-agent coordination within your IDE
- Persistent memory across development sessions
- Intelligent code generation and review
- Performance optimization through swarm intelligence

## Prerequisites

- Kiro IDE installed
- Claude Flow v2.0.0-alpha.108 or later
- Node.js 18+ for MCP server functionality

## Quick Start

### 1. Install Claude Flow Globally
```bash
npm install -g claude-flow@alpha
```

### 2. Initialize Claude Flow
```bash
# In your project directory
npx claude-flow@alpha init
```

### 3. Configure Kiro MCP Integration
Create `.kiro/settings/mcp.json`:
```json
{
  "mcpServers": {
    "claude-flow": {
      "command": "npx",
      "args": ["claude-flow@alpha", "mcp", "start"],
      "disabled": false,
      "autoApprove": [
        "swarm_init",
        "agent_spawn",
        "memory_store",
        "memory_retrieve"
      ]
    }
  }
}
```

## Available Agents

### Core Development Agents
- **coder**: Code generation and implementation
- **reviewer**: Code quality analysis and review
- **tester**: Test creation and execution
- **planner**: Project planning and task breakdown

### Coordination Agents
- **hierarchical-coordinator**: Top-down task coordination
- **mesh-coordinator**: Peer-to-peer agent coordination
- **adaptive-coordinator**: Dynamic coordination strategies

### Performance Agents
- **perf-analyzer**: Performance analysis and optimization
- **task-orchestrator**: Complex workflow management

## Usage Patterns

### Multi-Agent Code Review
```bash
npx claude-flow@alpha swarm "Review this API for security and performance" --claude
```

### Coordinated Testing
```bash
npx claude-flow@alpha hive-mind spawn "Create comprehensive test suite" --claude
```

### Documentation Generation
```bash
npx claude-flow@alpha swarm "Generate API documentation and setup guides" --claude
```

## Best Practices

1. **Use Global Setup**: Install Claude Flow globally for consistency across projects
2. **Leverage Persistent Memory**: Agents learn from your project patterns over time
3. **Coordinate Complex Tasks**: Use swarm intelligence for multi-file operations
4. **Auto-Approve Common Tools**: Streamline workflow with pre-approved MCP tools

## Troubleshooting

See [troubleshooting-kiro-claude-flow.md](troubleshooting-kiro-claude-flow.md) for common issues and solutions.

## Next Steps

- Explore advanced agent coordination patterns
- Set up project-specific agent configurations
- Integrate with CI/CD pipelines using Claude Flow automation