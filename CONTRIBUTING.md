# Contributing to Query JSON File MCP Server

We encourage contributions to help expand and improve the Query JSON File MCP server. Whether you want to add new tools, enhance existing functionality, or improve documentation, your input is valuable.

## Development Setup

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
git clone https://github.com/ai-toolbox-mcp/query-json-file.git
cd query-json-file
pnpm install
```

## Development Workflow

### Build

```bash
pnpm run build
```

### Development Mode

```bash
# Start with stdio transport (default)
pnpm run dev

# Start with HTTP transport
pnpm run dev:http
```

### Testing

```bash
# Run tests once
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

### Linting and Formatting

```bash
# Check formatting and linting
pnpm run lint

# Auto-fix formatting and linting
pnpm run format
```

### MCP Inspector Tools

```bash
# Inspect the MCP server (FastMCP inspector)
pnpm run inspect

# Alternative MCP inspector
pnpm run inspect2
```

## Architecture

- **Entry Point**: `src/index.ts` - Main server setup with argument parsing and FastMCP initialization
- **Tools**: `src/tools/` - Individual MCP tools (query-json-file.ts, generate-json-schema.ts)
- **Utils**: `src/utils/index.ts` - Shared utilities, primarily the `readJsonFile` function
- **Types**: `src/types/index.ts` - TypeScript interfaces and custom error classes

The server uses a modular structure with FastMCP framework and supports both stdio and HTTP transports. Error handling is centralized through a custom MCPError class.

### Key Dependencies

- **fastmcp**: MCP server framework
- **jsonpath-plus**: JSONPath query execution
- **genson-js**: JSON schema generation
- **zod**: Runtime type validation

## Debugging

You can use the MCP inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

For development mode:

```bash
npx @modelcontextprotocol/inspector pnpm run dev
```

## Code Style

The codebase uses TypeScript with ES modules, pnpm for package management, and follows a strict linting configuration with Prettier formatting and ESLint rules including perfectionist plugin for alphabetical ordering.

## Testing Guidelines

- Write unit tests for new tools and utilities
- Ensure all tests pass before submitting PR
- Add integration tests for complex functionality
- Test both stdio and HTTP transport modes

## Submitting Changes

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Run tests: `pnpm test`
5. Run linting: `pnpm run lint`
6. Build: `pnpm run build`
7. Commit your changes with a descriptive message
8. Push to your fork and submit a pull request

## Pull Request Guidelines

- Provide a clear description of the changes
- Include relevant tests
- Update documentation if needed
- Ensure all CI checks pass
- Follow the existing code style

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make the Query JSON File MCP server even more powerful and useful.
