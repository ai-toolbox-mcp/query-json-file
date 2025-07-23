import { loadJsonFile } from "load-json-file";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { generateJsonSchemaTool } from "./generate-json-schema.js";

// Mock the loadJsonFile module
vi.mock("load-json-file", () => ({
  loadJsonFile: vi.fn(),
}));

const mockLoadJsonFile = vi.mocked(loadJsonFile);

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

const simpleObject = {
  age: 30,
  isActive: true,
  name: "John Doe",
};

const arrayData = [
  { id: 1, value: "first" },
  { id: 2, value: "second" },
];

describe("generateJsonSchemaTool", () => {
  beforeEach(() => {
    // Mock console.error to prevent schema output during tests
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate schema for complex nested object and return correct structure", async () => {
    mockLoadJsonFile.mockResolvedValue(testData);

    const result = await generateJsonSchemaTool.execute({
      filePath: "test.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data).toBeDefined();
    expect(parsed.data.type).toBe("object");
    expect(parsed.data.properties).toBeDefined();
    expect(parsed.data.properties.posts).toBeDefined();
    expect(parsed.data.properties.users).toBeDefined();
    expect(parsed.data.properties.posts.type).toBe("array");
    expect(parsed.data.properties.users.type).toBe("array");
  });

  it("should generate schema for simple object with primitive types", async () => {
    mockLoadJsonFile.mockResolvedValue(simpleObject);

    const result = await generateJsonSchemaTool.execute({
      filePath: "simple.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("object");
    expect(parsed.data.properties.name.type).toBe("string");
    expect(parsed.data.properties.age.type).toBe("integer");
    expect(parsed.data.properties.isActive.type).toBe("boolean");
  });

  it("should generate schema for array data", async () => {
    mockLoadJsonFile.mockResolvedValue(arrayData);

    const result = await generateJsonSchemaTool.execute({
      filePath: "array.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("array");
    expect(parsed.data.items).toBeDefined();
    expect(parsed.data.items.type).toBe("object");
    expect(parsed.data.items.properties.id.type).toBe("integer");
    expect(parsed.data.items.properties.value.type).toBe("string");
  });

  it("should handle nested array items correctly", async () => {
    mockLoadJsonFile.mockResolvedValue(testData);

    const result = await generateJsonSchemaTool.execute({
      filePath: "nested.json",
    });

    const parsed = JSON.parse(result);
    const postsSchema = parsed.data.properties.posts;
    const usersSchema = parsed.data.properties.users;

    expect(postsSchema.items.properties.id.type).toBe("integer");
    expect(postsSchema.items.properties.title.type).toBe("string");
    expect(postsSchema.items.properties.content.type).toBe("string");
    expect(postsSchema.items.properties.user_id.type).toBe("integer");

    expect(usersSchema.items.properties.id.type).toBe("integer");
    expect(usersSchema.items.properties.name.type).toBe("string");
    expect(usersSchema.items.properties.email.type).toBe("string");
  });

  it("should call loadJsonFile with the correct filePath", async () => {
    mockLoadJsonFile.mockResolvedValue(testData);

    await generateJsonSchemaTool.execute({
      filePath: "/path/to/custom.json",
    });

    expect(mockLoadJsonFile).toHaveBeenCalledWith("/path/to/custom.json");
  });

  it("should output schema to console.error during execution", async () => {
    const mockConsoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockLoadJsonFile.mockResolvedValue(simpleObject);

    await generateJsonSchemaTool.execute({
      filePath: "test.json",
    });

    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('"type": "object"'),
    );
  });

  it("should handle empty object", async () => {
    mockLoadJsonFile.mockResolvedValue({});

    const result = await generateJsonSchemaTool.execute({
      filePath: "empty.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("object");
  });

  it("should handle empty array", async () => {
    mockLoadJsonFile.mockResolvedValue([]);

    const result = await generateJsonSchemaTool.execute({
      filePath: "empty-array.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("array");
  });

  it("should handle primitive values", async () => {
    mockLoadJsonFile.mockResolvedValue("simple string");

    const result = await generateJsonSchemaTool.execute({
      filePath: "string.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("string");
  });

  it("should handle null values", async () => {
    mockLoadJsonFile.mockResolvedValue(null);

    const result = await generateJsonSchemaTool.execute({
      filePath: "null.json",
    });

    const parsed = JSON.parse(result);
    expect(parsed.success).toBe(true);
    expect(parsed.data.type).toBe("null");
  });
});
