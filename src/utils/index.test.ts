import fs from "fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";

import { readJsonFile } from "./index.js";

// Mock fs/promises
vi.mock("fs/promises");

const mockFs = vi.mocked(fs);

describe("readJsonFile", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should read and parse valid JSON file successfully", async () => {
    const testData = { active: true, age: 30, name: "John" };
    const jsonString = JSON.stringify(testData);

    mockFs.readFile.mockResolvedValue(jsonString);

    const result = await readJsonFile({ filePath: "test.json" });

    expect(mockFs.readFile).toHaveBeenCalledWith("test.json", "utf8");
    expect(result).toEqual(testData);
  });

  it("should read and parse complex nested JSON structure", async () => {
    const complexData = {
      metadata: {
        lastUpdated: "2023-01-01",
        version: "1.0",
      },
      posts: [{ content: "Content 1", id: 1, title: "Post 1", user_id: 1 }],
      users: [
        { email: "john@example.com", id: 1, name: "John Doe" },
        { email: "jane@example.com", id: 2, name: "Jane Doe" },
      ],
    };
    const jsonString = JSON.stringify(complexData);

    mockFs.readFile.mockResolvedValue(jsonString);

    const result = await readJsonFile({ filePath: "complex.json" });

    expect(result).toEqual(complexData);
  });

  it("should handle empty JSON object", async () => {
    mockFs.readFile.mockResolvedValue("{}");

    const result = await readJsonFile({ filePath: "empty.json" });

    expect(result).toEqual({});
  });

  it("should handle JSON array", async () => {
    const arrayData = [1, 2, 3, "test", { key: "value" }];
    mockFs.readFile.mockResolvedValue(JSON.stringify(arrayData));

    const result = await readJsonFile({ filePath: "array.json" });

    expect(result).toEqual(arrayData);
  });

  it("should handle JSON with null values", async () => {
    const dataWithNull = { active: true, age: null, name: "John" };
    mockFs.readFile.mockResolvedValue(JSON.stringify(dataWithNull));

    const result = await readJsonFile({ filePath: "null.json" });

    expect(result).toEqual(dataWithNull);
  });

  it("should throw error for invalid JSON format", async () => {
    const invalidJson = '{ name: "John", age: 30 }'; // Missing quotes around property name
    mockFs.readFile.mockResolvedValue(invalidJson);

    await expect(readJsonFile({ filePath: "invalid.json" })).rejects.toThrow(
      "Invalid JSON format in file: invalid.json",
    );
  });

  it("should throw error for malformed JSON", async () => {
    const malformedJson = '{ "name": "John", "age": }';
    mockFs.readFile.mockResolvedValue(malformedJson);

    await expect(readJsonFile({ filePath: "malformed.json" })).rejects.toThrow(
      "Invalid JSON format in file: malformed.json",
    );
  });

  it("should throw specific error when file is not found", async () => {
    const fileNotFoundError = new Error("File not found") as {
      code: string;
    } & Error;
    fileNotFoundError.code = "ENOENT";
    mockFs.readFile.mockRejectedValue(fileNotFoundError);

    await expect(
      readJsonFile({ filePath: "nonexistent.json" }),
    ).rejects.toThrow("File not found: nonexistent.json");
  });

  it("should throw specific error for permission denied", async () => {
    const permissionError = new Error("Permission denied") as {
      code: string;
    } & Error;
    permissionError.code = "EACCES";
    mockFs.readFile.mockRejectedValue(permissionError);

    await expect(readJsonFile({ filePath: "protected.json" })).rejects.toThrow(
      "Permission denied reading file: protected.json",
    );
  });

  it("should throw generic error for other file system errors", async () => {
    const fsError = new Error("Disk full") as { code: string } & Error;
    fsError.code = "ENOSPC";
    mockFs.readFile.mockRejectedValue(fsError);

    await expect(readJsonFile({ filePath: "test.json" })).rejects.toThrow(
      "Error reading file test.json: Disk full",
    );
  });

  it("should handle unknown error types", async () => {
    const unknownError = "string error";
    mockFs.readFile.mockRejectedValue(unknownError);

    await expect(readJsonFile({ filePath: "test.json" })).rejects.toThrow(
      "Unknown error reading file: test.json",
    );
  });

  it("should work with absolute file paths", async () => {
    const testData = { test: "value" };
    mockFs.readFile.mockResolvedValue(JSON.stringify(testData));

    const result = await readJsonFile({
      filePath: "/absolute/path/to/file.json",
    });

    expect(mockFs.readFile).toHaveBeenCalledWith(
      "/absolute/path/to/file.json",
      "utf8",
    );
    expect(result).toEqual(testData);
  });

  it("should work with relative file paths", async () => {
    const testData = { test: "value" };
    mockFs.readFile.mockResolvedValue(JSON.stringify(testData));

    const result = await readJsonFile({ filePath: "./relative/path.json" });

    expect(mockFs.readFile).toHaveBeenCalledWith(
      "./relative/path.json",
      "utf8",
    );
    expect(result).toEqual(testData);
  });

  it("should preserve type information with generic type parameter", async () => {
    interface User {
      email: string;
      id: number;
      name: string;
    }

    const userData: User = {
      email: "john@example.com",
      id: 1,
      name: "John Doe",
    };
    mockFs.readFile.mockResolvedValue(JSON.stringify(userData));

    const result = await readJsonFile<User>({ filePath: "user.json" });

    expect(result).toEqual(userData);
    expect(typeof result.id).toBe("number");
    expect(typeof result.name).toBe("string");
    expect(typeof result.email).toBe("string");
  });

  it("should handle JSON with special characters", async () => {
    const dataWithSpecialChars = {
      backslashes: "C:\\Windows\\Path",
      message: "Hello \"world\" with 'quotes' and\\nnewlines",
      unicode: "🚀 Unicode test",
    };
    mockFs.readFile.mockResolvedValue(JSON.stringify(dataWithSpecialChars));

    const result = await readJsonFile({ filePath: "special.json" });

    expect(result).toEqual(dataWithSpecialChars);
  });

  it("should handle large JSON files", async () => {
    // Create a large array to simulate a big JSON file
    const largeArray = Array.from({ length: 1000 }, (_, i) => ({
      data: `Some data for user ${i}`,
      id: i,
      name: `User ${i}`,
    }));

    mockFs.readFile.mockResolvedValue(JSON.stringify(largeArray));

    const result = await readJsonFile({ filePath: "large.json" });

    expect(result).toEqual(largeArray);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1000);
  });

  it("should handle JSON with deeply nested structures", async () => {
    const deeplyNested = {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                array: [1, 2, { nested: "object" }],
                value: "deep value",
              },
            },
          },
        },
      },
    };

    mockFs.readFile.mockResolvedValue(JSON.stringify(deeplyNested));

    const result = await readJsonFile<typeof deeplyNested>({
      filePath: "deep.json",
    });

    expect(result).toEqual(deeplyNested);
    expect(result.level1.level2.level3.level4.level5.value).toBe("deep value");
  });
});
