# Release Guide

This document outlines the release strategy and instructions for the JSON Query MCP Server.

## Release Strategy Overview

This project uses a **manual release workflow** that provides full control over versioning and release timing while automating the build and distribution process.

### Key Features

- 🎯 **Manual Control**: You decide when to release, not automated commit analysis
- 📦 **Multi-Format Distribution**: Creates DXT files for Claude Desktop and npm packages
- 📝 **Flexible Changelog**: Supports both manual CHANGELOG.md entries and auto-generated release notes
- 🚀 **Dual Registry Publishing**: Publishes to both npmjs.org and GitHub npm registry
- ✅ **Quality Gates**: Runs tests and linting before releasing
- 🏷️ **Semantic Versioning**: Follows semver with patch/minor/major releases

## Release Workflow

### 1. **Manual Release Process**

The release process is initiated by running the `release.sh` script:

```bash
# Patch release (1.0.0 → 1.0.1) - for bug fixes
./scripts/release.sh patch

# Minor release (1.0.0 → 1.1.0) - for new features
./scripts/release.sh minor

# Major release (1.0.0 → 2.0.0) - for breaking changes
./scripts/release.sh major

# Alternative using npm scripts
pnpm run release        # defaults to patch
```

### 2. **What Happens During Release**

The `release.sh` script performs these steps:

1. **Pre-flight Checks**
   - Ensures you're on the main branch
   - Checks for uncommitted changes
   - Prompts for changelog updates

2. **Quality Assurance**
   - Pulls latest changes from origin
   - Runs `pnpm run quality` (linting, formatting, type checking)
   - Builds the project with `pnpm run build`

3. **Version Management**
   - Bumps version in `package.json`
   - Creates DXT package to verify build
   - Commits version change

4. **Release Trigger**
   - Creates and pushes git tag (e.g., `v1.2.3`)
   - Tag push triggers GitHub Actions workflow

### 3. **Automated GitHub Actions Workflow**

Once the tag is pushed, the GitHub Actions workflow automatically:

1. **Build & Test**
   - Checks out code and installs dependencies
   - Runs quality checks and builds project
   - Creates DXT and npm packages

2. **Release Notes Generation**
   - Uses manual CHANGELOG.md entries if available
   - Falls back to auto-generated notes from git commits
   - Creates formatted release notes

3. **Asset Creation**
   - Builds `.dxt` file for Claude Desktop installation
   - Creates `.tgz` file for npm installation
   - Attaches both files to GitHub release

4. **Registry Publishing**
   - Publishes to npmjs.org (public npm registry)
   - Publishes to GitHub npm registry
   - Both publications are optional and won't fail the release

## Changelog Management

### Manual Changelog (Recommended)

Use the changelog helper script to maintain structured release notes:

```bash
# Add entries to the [Unreleased] section
./scripts/changelog.sh add added "New JSONPath caching feature"
./scripts/changelog.sh add fixed "Handle malformed JSON files gracefully"
./scripts/changelog.sh add changed "Updated error messages for clarity"

# Prepare changelog for release (converts [Unreleased] to version)
./scripts/changelog.sh prepare 1.2.0
```

### Entry Types

- `added` - New features
- `changed` - Changes in existing functionality
- `deprecated` - Soon-to-be removed features
- `removed` - Removed features
- `fixed` - Bug fixes
- `security` - Security fixes

### Automatic Changelog

If no manual CHANGELOG.md exists or the [Unreleased] section is empty, the workflow will auto-generate release notes from git commit messages.

## Distribution Channels

After a successful release, the package is available through multiple channels:

### 1. **GitHub Releases**

- **URL**: `https://github.com/ai-toolbox-mcp/query-json-file/releases`
- **Files**:
  - `@ai-toolbox-mcp-query-json-file-X.Y.Z.dxt` - Claude Desktop extension
  - `@ai-toolbox-mcp-query-json-file-X.Y.Z.tgz` - npm package

### 2. **NPM Registry (npmjs.org)**

```bash
# Install from public npm registry
npm install @ai-toolbox-mcp/query-json-file

# Or with pnpm
pnpm add @ai-toolbox-mcp/query-json-file
```

### 3. **GitHub NPM Registry**

```bash
# Install from GitHub registry
npm install @ai-toolbox-mcp/query-json-file --registry=https://npm.pkg.github.com
```

## Setup Requirements

### Repository Secrets

The following secrets must be configured in GitHub repository settings:

- `NPM_TOKEN` - Token for publishing to npmjs.org
  - Create at: https://npmjs.com → Account → Access Tokens
  - Type: "Automation" token
- `TOKEN` - GitHub token for releases and GitHub registry
  - Usually auto-provided as `GITHUB_TOKEN`
  - May need custom token for enhanced permissions

### Development Dependencies

Ensure these tools are available:

- **Node.js** >= 20.0.0
- **pnpm** 10.13.1
- **dxt** CLI tool for creating Claude Desktop extensions

## Best Practices

### Before Releasing

1. **Update Documentation**: Ensure README and docs reflect new changes
2. **Update Changelog**: Add entries to CHANGELOG.md using the helper script
3. **Test Locally**: Run `pnpm test` and `pnpm run quality`
4. **Verify DXT**: Test `pnpm run dxt:pack` works correctly

### Version Selection

Follow semantic versioning:

- **Patch** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes, API changes

### Release Timing

- Release during business hours for better support
- Avoid releasing on Fridays or before holidays
- Test in development/staging environment first

## Troubleshooting

### Common Issues

**Release script fails with "uncommitted changes"**

```bash
git status
git add . && git commit -m "Prepare for release"
```

**DXT package creation fails**

```bash
pnpm run dxt:validate  # Check manifest.json
pnpm run build         # Ensure dist/ exists
```

**GitHub Actions workflow fails**

- Check repository secrets are configured
- Verify permissions in workflow file
- Review GitHub Actions logs for specific errors

**NPM publish fails**

- Verify `NPM_TOKEN` secret is valid
- Check package name isn't already taken
- Ensure version number is higher than published version

### Manual Recovery

If a release partially fails, you can:

1. **Delete the git tag** and retry:

```bash
git tag -d v1.2.3
git push origin :refs/tags/v1.2.3
```

2. **Manually trigger workflow** using GitHub web interface
3. **Create release manually** through GitHub releases page

## Alternative Release Methods

### GitHub Web Interface

You can also create releases through GitHub's web interface:

1. Go to repository → Releases → "Create a new release"
2. Choose or create a tag (e.g., `v1.2.3`)
3. Add release notes
4. Publish release

The workflow will still run and create the packages automatically.

### Manual Workflow Dispatch

The release workflow can be triggered manually:

1. Go to Actions → "Create Release" workflow
2. Click "Run workflow"
3. Enter version and prerelease options
4. Run the workflow

This bypasses the `release.sh` script but still creates all packages and distributions.
