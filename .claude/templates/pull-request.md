# Pull Request Template

## Title Format

```
{{TYPE}}({{SCOPE}}): {{BRIEF_DESCRIPTION}}
```

## Description Template

### Summary

Brief overview of what this PR accomplishes.

- **{{CHANGE_1}}**: {{CHANGE_1_DESCRIPTION}}
- **{{CHANGE_2}}**: {{CHANGE_2_DESCRIPTION}}
- **{{CHANGE_3}}**: {{CHANGE_3_DESCRIPTION}}

### Motivation

Why was this change necessary? What problem does it solve?

{{MOTIVATION_DETAILS}}

### Changes Made

Detailed list of changes:

- Change detail 1
- Change detail 2
- Change detail 3

### Testing

How was this change tested?

- [ ] Unit tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm run typecheck`)
- [ ] Linting passes (`pnpm run lint`)
- [ ] Manual testing completed
- [ ] Integration tests pass
- [ ] Performance impact assessed

### Breaking Changes

{{#if HAS_BREAKING_CHANGES}}
⚠️ **BREAKING CHANGES**

- {{BREAKING_CHANGE_1}}
- {{BREAKING_CHANGE_2}}

**Migration Guide:**
{{MIGRATION_INSTRUCTIONS}}
{{/if}}

{{#unless HAS_BREAKING_CHANGES}}
✅ No breaking changes
{{/unless}}

### Dependencies

{{#if DEPENDENCY_CHANGES}}
Dependencies modified:

- {{DEPENDENCY_1}}: {{OLD_VERSION}} → {{NEW_VERSION}}
- {{DEPENDENCY_2}}: {{OLD_VERSION}} → {{NEW_VERSION}}
  {{/if}}

{{#unless DEPENDENCY_CHANGES}}
No dependency changes
{{/unless}}

### Documentation

- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Examples updated if needed
- [ ] Comments added for complex code

### Security Considerations

{{#if SECURITY_IMPACT}}
Security impact:

- {{SECURITY_CONSIDERATION_1}}
- {{SECURITY_CONSIDERATION_2}}
  {{/if}}

{{#unless SECURITY_IMPACT}}
No security impact
{{/unless}}

### Performance Impact

{{#if PERFORMANCE_IMPACT}}
Performance changes:

- {{PERFORMANCE_CHANGE_1}}
- {{PERFORMANCE_CHANGE_2}}

Benchmarks:

- {{BENCHMARK_1}}: {{BEFORE}} → {{AFTER}}
  {{/if}}

{{#unless PERFORMANCE_IMPACT}}
No significant performance impact
{{/unless}}

## Test Plan

### Automated Tests

- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Edge cases covered
- [ ] Error scenarios tested

### Manual Testing

- [ ] {{MANUAL_TEST_1}}
- [ ] {{MANUAL_TEST_2}}
- [ ] {{MANUAL_TEST_3}}

### Integration Testing

- [ ] MCP Inspector testing completed
- [ ] Claude Desktop integration verified
- [ ] Server functions correctly with MCP clients

## Review Checklist

### Code Quality

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Error handling is comprehensive
- [ ] No hardcoded values or secrets
- [ ] Comments explain complex logic

### Architecture

- [ ] Changes align with project architecture
- [ ] Proper separation of concerns
- [ ] Reusable components extracted where appropriate
- [ ] Dependencies are justified

### Documentation

- [ ] Public APIs are documented
- [ ] Complex algorithms explained
- [ ] Examples provided where helpful
- [ ] README updates if needed

## Deployment Notes

{{#if DEPLOYMENT_NOTES}}
Special deployment considerations:

- {{DEPLOYMENT_NOTE_1}}
- {{DEPLOYMENT_NOTE_2}}
  {{/if}}

{{#unless DEPLOYMENT_NOTES}}
Standard deployment process applies
{{/unless}}

## Related Issues

{{#if RELATED_ISSUES}}

- Closes #{{ISSUE_NUMBER}}
- Related to #{{ISSUE_NUMBER}}
  {{/if}}

## Future Work

{{#if FUTURE_WORK}}
Follow-up tasks:

- {{FUTURE_TASK_1}}
- {{FUTURE_TASK_2}}
  {{/if}}

---

## Example PRs

### Feature Addition

```
feat(json-utils): add JSONPath array slicing support

## Summary
- **JSONPath Enhancement**: Add support for array slicing syntax (e.g., $.array[1:3])
- **Memory Optimization**: Implement streaming approach for large arrays
- **Validation**: Add comprehensive input validation for slice operations

## Motivation
Users need to extract subsets of large arrays without loading entire result sets into memory. Current implementation loads all matching elements before applying limits.

## Changes Made

- Add slice parsing to JSONPath validator
- Implement streaming slice operations in queryJSON
- Add comprehensive error handling for invalid slice syntax
- Update TypeScript types for slice parameters
- Update tool schema to support slice parameters
- Add examples in tool descriptions
- Update error messages for slice-related failures

## Testing
- [x] Unit tests pass
- [x] Type checking passes
- [x] Manual testing with 50MB JSON files
- [x] Integration tests with MCP Inspector
- [x] Performance benchmarks completed

## Performance Impact
Performance improvements:
- Memory usage: 200MB → 50MB for large array operations
- Query time: 2.5s → 0.8s for slice operations

Benchmarks:
- Large array slicing: 2500ms → 800ms
- Memory peak: 200MB → 50MB
```

### Bug Fix

```
fix(json-utils-mcp): handle malformed JSON gracefully

## Summary
- **Error Handling**: Improve JSON parsing error responses
- **Consistency**: Standardize error format across all tools
- **Validation**: Add input validation before processing

## Motivation
Server crashes when receiving invalid JSON input, providing poor user experience and no debugging information.

## Changes Made

- Add try-catch wrapper around all JSON.parse calls
- Return structured error responses with parsing details
- Add input validation middleware
- Update tool schemas with validation rules

## Testing
- [x] Unit tests for malformed input scenarios
- [x] Integration tests with various invalid JSON formats
- [x] Error message clarity verified
- [x] No server crashes under test conditions

## Breaking Changes
✅ No breaking changes

## Security Considerations
Security improvements:
- Input validation prevents potential parsing exploits
- Error messages don't expose internal system details
```
