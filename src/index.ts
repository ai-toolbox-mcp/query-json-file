#!/usr/bin/env node

import { FastMCP } from "fastmcp";

import { generateJsonSchemaTool } from "./tools/generate-json-schema.js";
import { queryJsonFileTool } from "./tools/query-json-file.js";

// Parse command line arguments
function parseArgs(): {
  host: string;
  port: number;
  transport: "httpStream" | "stdio";
} {
  const args = process.argv.slice(2);
  let transport: "httpStream" | "stdio" = "stdio";
  let port = 3000;
  let host = "localhost";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--host":
      case "-h":
        host = args[i + 1];
        i++;
        break;
      case "--port":
      case "-p": {
        const portValue = parseInt(args[i + 1]);
        if (!isNaN(portValue)) {
          port = portValue;
        }
        i++;
        break;
      }
      case "--transport":
      case "-t": {
        const transportValue = args[i + 1];
        if (transportValue === "http" || transportValue === "httpStream") {
          transport = transportValue === "http" ? "httpStream" : "httpStream";
        } else if (transportValue === "stdio") {
          transport = "stdio";
        }
        i++;
        break;
      }
      case "--help":
        console.log(`
Query JSON File MCP Server

Usage:
  query-json-file [options]

Options:
  -t, --transport <type>   Transport type: 'stdio' or 'http' (default: stdio)
  -p, --port <number>      Port for HTTP transport (default: 3000)
  -h, --host <string>      Host for HTTP transport (default: localhost)
  --help                   Show this help message

Examples:
  query-json-file                           # Start with stdio transport
  query-json-file --transport http          # Start with HTTP transport on port 3000
  query-json-file -t http -p 8080           # Start with HTTP transport on port 8080
`);
        process.exit(0);
    }
  }

  return { host, port, transport };
}

// Create the FastMCP server
const server = new FastMCP({
  instructions: [
    "This MCP server provides tools to perform JSONPath-based queries on JSON files.",
    "Use the `query-json-file` tool to perform JSONPath queries on a specific JSON file. Use JSONPath query syntax to specify the query.",
    "Use the `generate-json-schema` tool to generate a JSON schema from a JSON file. This can be used to introspect the structure of the JSON file without reading it. This is useful for large JSON files.",
  ].join("\n\n"),
  name: "query-json-file",
  version: "1.0.0",
});

server.addTool(generateJsonSchemaTool);
server.addTool(queryJsonFileTool);

// Parse arguments and start the server
const { host, port, transport } = parseArgs();

console.error(
  `Starting Query JSON File MCP Server with ${transport} transport...`,
);

if (transport === "httpStream") {
  console.error(`Server will be available at http://${host}:${port}`);
  server.start({
    httpStream: {
      endpoint: "/mcp",
      port,
    },
    transportType: "httpStream",
  });
} else {
  server.start({
    transportType: "stdio",
  });
}
