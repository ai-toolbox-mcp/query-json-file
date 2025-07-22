import fs from "fs/promises";
import { z } from "zod";

export const readJsonFile = async <T = unknown>({
  filePath,
}: {
  filePath: string;
}): Promise<T> => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedJsonObject = JSON.parse(data) as T;
    return parsedJsonObject;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON format in file: ${filePath}`);
    } else if (error instanceof Error) {
      // Handle file system errors (file not found, permission issues, etc.)
      if ("code" in error && error.code === "ENOENT") {
        throw new Error(`File not found: ${filePath}`);
      }
      if ("code" in error && error.code === "EACCES") {
        throw new Error(`Permission denied reading file: ${filePath}`);
      }
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
    throw new Error(`Unknown error reading file: ${filePath}`);
  }
};

/**
 * Type-safe JSON file reader with runtime validation using Zod
 * @param filePath - Path to the JSON file
 * @param schema - Zod schema to validate against
 * @returns Parsed and validated JSON data
 */
export const readJsonFileWithValidation = async <T>({
  filePath,
  schema,
}: {
  filePath: string;
  schema: z.ZodSchema<T>;
}): Promise<T> => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedJsonObject = JSON.parse(data);

    // Runtime validation with Zod
    const validatedData = schema.parse(parsedJsonObject);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `JSON validation failed for file ${filePath}: ${error.message}`,
      );
    }
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON format in file: ${filePath}`);
    } else if (error instanceof Error) {
      // Handle file system errors (file not found, permission issues, etc.)
      if ("code" in error && error.code === "ENOENT") {
        throw new Error(`File not found: ${filePath}`);
      }
      if ("code" in error && error.code === "EACCES") {
        throw new Error(`Permission denied reading file: ${filePath}`);
      }
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
    throw new Error(`Unknown error reading file: ${filePath}`);
  }
};
