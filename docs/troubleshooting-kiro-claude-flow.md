# Troubleshooting Kiro + Claude Flow Integration

Common issues and solutions for Kiro IDE and Claude Flow integration.

## Installation Issues

### Claude Flow Not Found
**Problem**: `npx claude-flow@alpha` command not found

**Solutions**:
```bash
# Install globally
npm install -g claude-flow@alpha

# Verify installation
npx claude-flow@alpha --version

# Clear npm cache if needed
npm cache clean --force
```

### MCP Server Connection Failed
**Problem**: Kiro can't connect to Claude Flow MCP server

**Solutions**:
1. **Check server status**:
   ```bash
   npx claude-flow@alpha mcp status
   ```

2. **Restart MCP server**:
   ```bash
   npx claude-flow@alpha mcp restart
   ```

3. **Verify configuration**:
   - Check `.kiro/settings/mcp.json` syntax
   - Ensure correct command paths
   - Verify environment variables

## Configuration Issues

### Auto-Approval Not Working
**Problem**: Tools require manual approval despite configuration

**Solutions**:
1. **Check tool names** in `autoApprove` array:
   ```json
   "autoApprove": [
     "swarm_init",
     "agent_spawn",
     "memory_store"
   ]
   ```

2. **Restart Kiro** after configuration changes

3. **Verify MCP server restart**:
   ```bash
   npx claude-flow@alpha mcp restart
   ```

### Environment Variables Not Loading
**Problem**: Project-specific environment variables not recognized

**Solutions**:
1. **Check environment syntax**:
   ```json
   "env": {
     "CLAUDE_FLOW_PROJECT": "project-name",
     "CLAUDE_FLOW_MODE": "development"
   }
   ```

2. **Restart MCP servers** after env changes

3. **Verify environment loading**:
   ```bash
   echo $CLAUDE_FLOW_PROJECT
   ```

## Performance Issues

### Slow Agent Response Times
**Problem**: Claude Flow agents respond slowly

**Solutions**:
1. **Check system resources**:
   ```bash
   # Monitor CPU and memory
   top -p $(pgrep -f claude-flow)
   ```

2. **Optimize agent count**:
   ```bash
   export CLAUDE_FLOW_MAX_AGENTS=5
   ```

3. **Clear memory databases**:
   ```bash
   npx claude-flow@alpha memory clear --confirm
   ```

### High Memory Usage
**Problem**: Claude Flow consuming excessive memory

**Solutions**:
1. **Set memory limits**:
   ```bash
   export CLAUDE_FLOW_MEMORY_LIMIT=512MB
   ```

2. **Optimize swarm size**:
   ```bash
   npx claude-flow@alpha swarm config --max-agents 3
   ```

3. **Regular cleanup**:
   ```bash
   npx claude-flow@alpha cleanup --old-sessions
   ```

## Agent Coordination Issues

### Agents Not Spawning
**Problem**: `agent_spawn` tool fails

**Solutions**:
1. **Check hive-mind status**:
   ```bash
   npx claude-flow@alpha hive-mind status
   ```

2. **Initialize hive-mind**:
   ```bash
   npx claude-flow@alpha hive-mind init
   ```

3. **Verify agent availability**:
   ```bash
   npx claude-flow@alpha agent list
   ```

### Swarm Coordination Failures
**Problem**: Swarm commands timeout or fail

**Solutions**:
1. **Check swarm status**:
   ```bash
   npx claude-flow@alpha swarm status
   ```

2. **Restart coordination**:
   ```bash
   npx claude-flow@alpha swarm restart
   ```

3. **Reduce complexity**:
   - Break large tasks into smaller ones
   - Use fewer agents per swarm
   - Simplify coordination patterns

## Memory and Persistence Issues

### Memory Not Persisting
**Problem**: Agent memories lost between sessions

**Solutions**:
1. **Check memory database**:
   ```bash
   npx claude-flow@alpha memory status
   ```

2. **Verify database permissions**:
   ```bash
   ls -la .swarm/memory.db
   chmod 644 .swarm/memory.db
   ```

3. **Backup and restore**:
   ```bash
   npx claude-flow@alpha memory backup
   npx claude-flow@alpha memory restore backup.db
   ```

### Database Corruption
**Problem**: SQLite database errors

**Solutions**:
1. **Check database integrity**:
   ```bash
   sqlite3 .swarm/memory.db "PRAGMA integrity_check;"
   ```

2. **Rebuild database**:
   ```bash
   npx claude-flow@alpha memory rebuild --confirm
   ```

3. **Restore from backup**:
   ```bash
   npx claude-flow@alpha memory restore --latest
   ```

## Network and Connectivity Issues

### MCP Connection Timeouts
**Problem**: MCP server connections timeout

**Solutions**:
1. **Increase timeout values**:
   ```json
   {
     "connectionPool": {
       "timeout": 60000,
       "retryAttempts": 5
     }
   }
   ```

2. **Check network connectivity**:
   ```bash
   ping localhost
   netstat -an | grep LISTEN
   ```

3. **Firewall configuration**:
   - Ensure MCP ports are open
   - Check antivirus software
   - Verify local network settings

## Logging and Debugging

### Enable Debug Logging
```bash
export CLAUDE_FLOW_LOG_LEVEL=DEBUG
export KIRO_MCP_DEBUG=true
```

### Check Log Files
```bash
# Claude Flow logs
tail -f ~/.claude-flow-data/logs/claude-flow.log

# Kiro MCP logs
tail -f .kiro/logs/mcp.log
```

### Verbose Output
```bash
npx claude-flow@alpha swarm "task" --verbose --debug
```

## Getting Help

### Community Resources
- GitHub Issues: https://github.com/ruvnet/claude-flow/issues
- Discord Community: https://discord.agentics.org
- Documentation: https://github.com/ruvnet/claude-flow/docs

### Diagnostic Information
When reporting issues, include:
```bash
# System information
npx claude-flow@alpha --version
node --version
npm --version

# Configuration
cat .kiro/settings/mcp.json

# Recent logs
tail -50 ~/.claude-flow-data/logs/claude-flow.log
```