# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- Do not mention CLAUDE when committing code or writing code. You are a silent pair programmer.

## Project Overview

This is an MCP (Model Context Protocol) server for querying JSON files using JSONPath syntax. The server is built using FastMCP and provides two main tools:

- `query_json_file` - Perform JSONPath queries on a JSON file
- `generate_json_schema` - Generate JSON Schema from a JSON file

## Commands

**Build:**

```bash
pnpm run build
```

**Development:**

```bash
# Start with stdio transport (default)
pnpm run dev

# Start with HTTP transport
pnpm run dev:http
```

**Testing:**

```bash
# Run tests once
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

**Linting and Formatting:**

```bash
# Check formatting and linting
pnpm run lint

# Auto-fix formatting and linting
pnpm run format
```

**MCP Inspector Tools:**

```bash
# Inspect the MCP server (FastMCP inspector)
pnpm run inspect

# Alternative MCP inspector
pnpm run inspect2
```

## Architecture

The server uses a modular structure:

- **Entry Point**: `src/server.ts` - Main server setup with argument parsing and FastMCP initialization
- **Tools**: `src/tools/` - Individual MCP tools (query-json-file.ts, generate-json-schema.ts)
- **Utils**: `src/utils/index.ts` - Shared utilities, primarily the `readJsonFile` function
- **Types**: `src/types/index.ts` - TypeScript interfaces and custom error classes

The server supports both stdio and HTTP transports and uses Zod for schema validation. Error handling is centralized through a custom MCPError class.

## Key Dependencies

- **fastmcp**: MCP server framework
- **jsonpath-plus**: JSONPath query execution
- **load-json-file**: JSON file loading utility
- **genson-js**: JSON schema generation
- **zod**: Runtime type validation

## Development Notes

The codebase uses TypeScript with ES modules, pnpm for package management, and follows a strict linting configuration with Prettier formatting and ESLint rules including perfectionist plugin for alphabetical ordering.
