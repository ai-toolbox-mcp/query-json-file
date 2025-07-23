# Claude Code Configuration

This directory contains configuration and context files specifically for Claude Code to better understand and work with this project.

## Directory Structure

```
.claude/
├── README.md                  # This file - explains the .claude directory
├── templates/ # See descriptions below
│   └── pull-request.md
└── context/
    └── imported/              # Remote-maintained documentation
        ├── dtx-manifext.md    # DXT manifest spec (imported)
        ├── dtx-readme.md      # DTX README (imported)
        ├── llm-docs.md        # MCP documentation (imported)
        ├── fastmcp-readme.md  # FastMCP documentation (imported)
        └── typescript-sdk.md  # TypeScript SDK docs (imported)
```

## Context Files Explained

### Imported Documentation (`.claude/context/imported/`)

To import these files, run the following command:

```bash
pnpm run update-mcp-docs
```

These files are fetched from remote sources and maintained by their respective maintainers:

- `dtx-manifest.md` - The JSON schema spec for Claude Desktop Extension manifests
- `dtx-readme.md` - README from the Desktop Extensions repository
- `llm-docs.md` - Official documentation on Model Context Protocols
- `fastmcp-sdk.md` - README from the FastMCP repository
- `typescript-sdk.md` - TypeScript SDK for Model Context Protocol development

**Important**: Do not modify these files directly as they will be overwritten during updates.

### Local Project Context (`.claude/context/local/`)

These files are maintained by this project and provide Claude Code with project-specific knowledge:

- No files exist yet.

### Document Templates (`.claude/templates/`)

Document templates for consistent formatting and structure:

- `mcp-readme.md` - Template for MCP server README files
- `library-readme.md` - Template for library README files
- `commit-message.md` - Commit message format guidelines and examples
- `pull-request.md` - Pull request template with checklists
- `issue-template.md` - Issue templates for bugs, features, and enhancements

#### Implementation Examples

- `examples/database-server.md` - Complete example of a database integration MCP server
- `examples/api-server.md` - Complete example of an API integration MCP server
- `examples/file-server.md` - Complete example of a file system MCP server

## How Claude Code Uses These Files

1. **Automatic Context**: Claude Code reads these files to understand project patterns and conventions
2. **Reference Material**: When generating code, Claude follows the patterns from these documents
3. **Problem Solving**: Troubleshooting guide helps resolve common issues
4. **Code Generation**: Examples provide templates for new server implementations

## Updating Context Files

### Imported Files

- Use the `pnpm update-mcp-docs` script to refresh imported documentation
- Never modify imported files directly

### Local Files

Update local context files when:

- New patterns emerge from development
- Common issues are discovered and resolved
- Coding standards change
- New examples are developed
- Testing approaches evolve

## Best Practices for Claude Code

### When Requesting Help

1. **Be Specific**: Reference exact packages, files, or server names
2. **Mention Workspace**: Use pnpm workspace commands when appropriate
3. **Check Context**: These files contain project-specific information
4. **Incremental Changes**: Request small, focused changes rather than large rewrites
5. **Include Testing**: Always mention if you want tests included

### For MCP Server Development

1. **Follow Patterns**: Use the patterns from `mcp-patterns.md`
2. **Check Examples**: Reference appropriate example files for your use case
3. **Test Thoroughly**: Follow the testing guide for proper validation
4. **Handle Errors**: Implement proper error handling as shown in examples
5. **Security First**: Follow security guidelines from the examples

### For Troubleshooting

1. **Check Troubleshooting Guide**: Review `troubleshooting.md` for common issues
2. **Validate Environment**: Ensure proper setup following project conventions
3. **Test Incrementally**: Use testing patterns to isolate issues
4. **Reference Examples**: Compare with working examples

## Maintenance

This context system is designed to:

- Separate external documentation from project-specific knowledge
- Provide comprehensive guidance for AI-assisted development
- Maintain consistency across the MCP servers monorepo
- Enable rapid development of new servers following established patterns

Regular maintenance should include:

- Updating local context files as the project evolves
- Refreshing imported documentation periodically
- Adding new examples as patterns emerge
- Documenting common issues and solutions
