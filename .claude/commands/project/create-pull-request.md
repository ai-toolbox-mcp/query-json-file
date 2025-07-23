Create a pull request for the current branch following the project's PR template

1. **Branch Analysis**: Run git status and git branch to confirm current branch and ensure it's not main
2. **Change Summary**: Run git diff main...HEAD to see all changes since branching from main
3. **Commit History**: Run git log main..HEAD --oneline to understand the full commit history for this branch
4. **Remote Check**: Verify if the branch exists on remote and push if needed with git push -u origin <branch-name>
5. **Template Application**: Use the pull request template at `.claude/templates/pull-request.md` to structure the PR description
6. **Title Generation**: Create a PR title following the format: `{{TYPE}}({{SCOPE}}): {{BRIEF_DESCRIPTION}}`
7. **Description Generation**: Generate a comprehensive PR description including:
   - **Summary**: Brief overview with bullet points of key changes
   - **Motivation**: Why this change was necessary
   - **Changes Made**: Detailed breakdown by package/area
   - **Testing**: Checklist of testing completed
   - **Breaking Changes**: Note any breaking changes and migration guide
   - **Dependencies**: Document any dependency changes
   - **Performance Impact**: Note any performance considerations
8. **Automated Checklists**: Pre-populate relevant sections from the template:
   - Code quality checklist
   - Testing requirements
   - Documentation updates
   - Security considerations
9. **PR Creation**: Use GitHub CLI (gh pr create) to create the PR with the generated title and description
10. **Verification**: Display the PR URL for review

Important considerations for this project:

- Ensure the branch is pushed to remote before creating PR
- Follow the conventional commit title format for PR titles
- Include comprehensive testing checklists (unit tests, type checking, linting, integration tests)
- Reference related issues if applicable
- Consider the impact on MCP server functionality
- Note any changes to dependencies or project structure
- Include performance benchmarks if significant changes were made
- Ensure security considerations are addressed for any new functionality

After PR creation, the command should output the PR URL and remind about manual testing requirements like MCP Inspector and Claude Desktop integration testing.
