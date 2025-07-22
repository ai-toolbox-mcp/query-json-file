import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as utils from "../utils/index.js";
import { queryJsonFileTool } from "./query-json-file.js";

const testData = {
  posts: [
    { content: "Content 1", id: 1, title: "Post 1", user_id: 1 },
    { content: "Content 2", id: 2, title: "Post 2", user_id: 2 },
    { content: "Content 3", id: 3, title: "Post 3", user_id: 1 },
  ],
  users: [
    { email: "john@example.com", id: 1, name: "John Doe" },
    { email: "jane@example.com", id: 2, name: "Jane Doe" },
  ],
};

describe("queryJsonFileTool", () => {
  beforeEach(() => {
    // Mock readJsonFile to return testData
    vi.spyOn(utils, "readJsonFile").mockResolvedValue(testData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should query a simple path and return the correct structure", async () => {
    const result = await queryJsonFileTool.execute({
      filePath: "test.json",
      query: "$.users[0].name",
    });

    const parsed = JSON.parse(result);
    expect(parsed).toEqual({
      count: 1,
      data: ["John Doe"],
      error: null,
      query: "$.users[0].name",
      status: "success",
    });
  });

  it("should query multiple items and return correct count", async () => {
    const result = await queryJsonFileTool.execute({
      filePath: "test.json",
      query: "$.posts[*].title",
    });

    const parsed = JSON.parse(result);
    expect(parsed.count).toBe(3);
    expect(parsed.data).toEqual(["Post 1", "Post 2", "Post 3"]);
    expect(parsed.status).toBe("success");
  });

  it("should handle queries that return no results", async () => {
    const result = await queryJsonFileTool.execute({
      filePath: "test.json",
      query: "$.nonexistent",
    });

    const parsed = JSON.parse(result);
    expect(parsed.count).toBe(0);
    expect(parsed.data).toEqual([]);
    expect(parsed.status).toBe("success");
  });

  it("should filter posts by user_id", async () => {
    const result = await queryJsonFileTool.execute({
      filePath: "test.json",
      query: "$.posts[?(@.user_id == 1)].title",
    });

    const parsed = JSON.parse(result);
    expect(parsed.count).toBe(2);
    expect(parsed.data).toEqual(["Post 1", "Post 3"]);
    expect(parsed.status).toBe("success");
  });

  it("should return user emails", async () => {
    const result = await queryJsonFileTool.execute({
      filePath: "test.json",
      query: "$.users[*].email",
    });

    const parsed = JSON.parse(result);
    expect(parsed.count).toBe(2);
    expect(parsed.data).toEqual(["john@example.com", "jane@example.com"]);
    expect(parsed.status).toBe("success");
  });

  it("should call readJsonFile with the correct filePath", async () => {
    await queryJsonFileTool.execute({
      filePath: "/path/to/test.json",
      query: "$.users",
    });

    expect(utils.readJsonFile).toHaveBeenCalledWith({
      filePath: "/path/to/test.json",
    });
  });
});
