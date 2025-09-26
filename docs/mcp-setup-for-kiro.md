# MCP Server Setup for Kiro IDE

This guide covers the Model Context Protocol (MCP) server configuration for integrating Claude Flow with Kiro IDE.

## MCP Configuration Overview

Kiro IDE uses MCP servers to communicate with Claude Flow's agent orchestration system. Proper configuration ensures seamless integration and optimal performance.

## Configuration Files

### Workspace-Level Configuration
Create `.kiro/settings/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "claude-flow": {
      "command": "npx",
      "args": ["claude-flow@alpha", "mcp", "start"],
      "env": {
        "CLAUDE_FLOW_PROJECT": "your-project-name",
        "CLAUDE_FLOW_MODE": "development"
      },
      "disabled": false,
      "autoApprove": [
        "swarm_init",
        "agent_spawn",
        "memory_store",
        "memory_retrieve",
        "task_orchestrate"
      ],
      "disabledTools": []
    },
    "ruv-swarm": {
      "command": "npx",
      "args": ["ruv-swarm@latest", "mcp", "start"],
      "disabled": false,
      "autoApprove": [
        "swarm_coordinate",
        "neural_train",
        "pattern_learn"
      ]
    }
  }
}
```

### User-Level Configuration (Optional)
Global configuration at `~/.kiro/settings/mcp.json` for cross-project settings.

## Auto-Approved Tools

### Core Orchestration Tools
- `swarm_init` - Initialize swarm coordination
- `agent_spawn` - Spawn specialized agents
- `task_orchestrate` - Orchestrate complex workflows

### Memory Management
- `memory_store` - Store persistent memories
- `memory_retrieve` - Retrieve stored memories
- `collective_memory` - Access shared knowledge

### Swarm Intelligence
- `swarm_coordinate` - Coordinate swarm behavior
- `neural_train` - Train neural models
- `pattern_learn` - Learn from data patterns

## Environment Variables

### Project-Specific Variables
```bash
CLAUDE_FLOW_PROJECT=your-project-name
CLAUDE_FLOW_MODE=development
RUV_SWARM_MODE=kiro-integration
```

### Performance Tuning
```bash
CLAUDE_FLOW_MAX_AGENTS=10
CLAUDE_FLOW_MEMORY_LIMIT=512MB
CLAUDE_FLOW_LOG_LEVEL=INFO
```

## Server Health Verification

### Check MCP Server Status
```bash
# Verify Claude Flow MCP server
npx claude-flow@alpha mcp status

# Test connection
npx claude-flow@alpha mcp test
```

### Common Connection Issues
1. **Port Conflicts**: Ensure no other services use MCP ports
2. **Permission Issues**: Check file permissions for config files
3. **Version Mismatches**: Ensure compatible Claude Flow version

## Security Considerations

### Tool Approval Strategy
- **Auto-approve**: Common, safe operations
- **Manual approval**: Potentially destructive operations
- **Disabled**: Tools not needed for your workflow

### Environment Isolation
- Use project-specific environment variables
- Isolate sensitive configurations
- Regular security audits of approved tools

## Performance Optimization

### Connection Pooling
Configure connection limits for optimal performance:
```json
{
  "connectionPool": {
    "maxConnections": 5,
    "timeout": 30000,
    "retryAttempts": 3
  }
}
```

### Logging Configuration
```json
{
  "logging": {
    "level": "INFO",
    "file": ".kiro/logs/mcp.log",
    "maxSize": "10MB"
  }
}
```

## Troubleshooting

### Connection Failures
1. Check MCP server is running
2. Verify configuration syntax
3. Review environment variables
4. Check network connectivity

### Performance Issues
1. Monitor connection pool usage
2. Review auto-approved tool list
3. Check system resource usage
4. Optimize environment variables

## Advanced Configuration

### Custom Tool Filters
```json
{
  "toolFilters": {
    "include": ["swarm_*", "agent_*", "memory_*"],
    "exclude": ["debug_*", "experimental_*"]
  }
}
```

### Conditional Server Loading
```json
{
  "conditionalServers": {
    "development": ["claude-flow", "ruv-swarm"],
    "production": ["claude-flow"],
    "testing": ["claude-flow"]
  }
}
```