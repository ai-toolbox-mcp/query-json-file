import fs from "fs/promises";

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
