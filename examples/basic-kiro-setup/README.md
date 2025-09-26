# Basic Kiro + Claude Flow Setup

This example demonstrates the minimal configuration needed to integrate Claude Flow with Kiro IDE.

## Files

- `.kiro/settings/mcp.json` - MCP server configuration for Claude Flow integration

## Setup

1. Copy the `.kiro` directory to your project root
2. Install Claude Flow globally:
   ```bash
   npm install -g claude-flow@alpha
   ```
3. Initialize Claude Flow in your project:
   ```bash
   npx claude-flow@alpha init
   ```
4. Restart Kiro IDE to load the new MCP configuration

## Usage

Once configured, you can use Claude Flow agents directly in Kiro:

- Multi-agent code review
- Coordinated testing
- Documentation generation
- Performance optimization

## Next Steps

See the [Kiro Integration Guide](../../docs/kiro-integration-guide.md) for advanced configuration options.