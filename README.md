# Query JSON File MCP Server

A Model Context Protocol server that provides JSON file querying and schema generation capabilities. This server enables LLMs to perform JSONPath queries on JSON files and generate JSON schemas for structure analysis.

The server is built using FastMCP and provides efficient JSON file operations with proper error handling and type safety.

### Available Tools

- `query-json-file` - Performs JSONPath queries on JSON files
    - `filePath` (string, required): The absolute path to the JSON file
    - `query` (string, required): JSONPath query string (e.g., `$.key` or `$[*].name`)

- `generate-json-schema` - Generates JSON schemas from JSON files using the genson-js library
    - `filePath` (string, required): The absolute path to the JSON file

## Installation

### Using npm

```bash
npm install -g @ai-toolbox-mcp/query-json-file
```

### Using npx (no installation)

```bash
npx @ai-toolbox-mcp/query-json-file
```

## Usage

### Command Line

```bash
# Start with stdio transport (default)
query-json-file

# Start with HTTP transport
query-json-file --transport http --port 3000
```

### Command Line Options

- `-t, --transport <type>`: Transport type: 'stdio' or 'http' (default: stdio)
- `-p, --port <number>`: Port for HTTP transport (default: 3000)
- `-h, --host <string>`: Host for HTTP transport (default: localhost)
- `--help`: Show help message

## Configuration

### Configure for Claude.app

Add to your Claude settings:

```json
{
  "mcpServers": {
    "query-json-file": {
      "command": "npx",
      "args": [
        "-y",
        "@ai-toolbox-mcp/query-json-file"
      ]
    }
  }
}
```

### Configure for VS Code

Add the following to your VS Code settings or `.vscode/mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "query-json-file": {
        "command": "npx",
        "args": [
          "-y",
          "@ai-toolbox-mcp/query-json-file"
        ]
      }
    }
  }
}
```

### HTTP Transport Configuration

For HTTP transport:

```json
{
  "mcp": {
    "servers": {
      "query-json-file": {
        "command": "npx",
        "args": [
          "-y",
          "@ai-toolbox-mcp/query-json-file",
          "--transport", "http",
          "--port", "3000"
        ]
      }
    }
  }
}
```

## Examples

### JSONPath Query Examples

- `$.store.book[*].author` - Get all book authors
- `$..price` - Get all prices in the document
- `$.store.book[?(@.price < 10)]` - Get books with price less than 10
- `$.store.book[-1:]` - Get the last book
- `$.store.book[0,1]` - Get first two books

### Schema Generation

The `generate-json-schema` tool analyzes the structure of JSON files and generates corresponding JSON schemas, useful for:
- Understanding large JSON file structures
- Validating other JSON files against the schema
- API documentation generation

## Error Handling

The server includes comprehensive error handling for:
- File not found errors
- Permission denied errors
- Invalid JSON format errors
- JSONPath query syntax errors
- Schema generation errors

All errors are returned as structured JSON responses with appropriate error codes and messages.

## Contributing

We encourage contributions to help expand and improve the Query JSON File MCP server. Whether you want to add new tools, enhance existing functionality, or improve documentation, your input is valuable.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development setup, workflow, and guidelines.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
