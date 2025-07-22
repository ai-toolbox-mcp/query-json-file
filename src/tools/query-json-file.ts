import { JSONPath } from "jsonpath-plus";
import { z } from "zod";

import { MCPError } from "../types/index.js";
import { readJsonFile } from "../utils/index.js";

const toolArgSchema = z.object({
  filePath: z.string().describe("The absolute path to the JSON file"),
  query: z
    .string()
    .describe('JSONPath query string (e.g., "$.key" or "$[*].name")'),
});

export const queryJsonFileTool = {
  description: "Perform JSONPath queries on a JSON file",
  execute: async (args: z.infer<typeof toolArgSchema>) => {
    // Read the JSON data
    const { filePath, query } = args;
    const jsonData = await readJsonFile({ filePath: filePath });

    try {
      // Perform JSONPath query - cast to satisfy JSONPath typing requirements
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results = await JSONPath({ json: jsonData as any, path: query });

      return JSON.stringify(
        {
          count: Array.isArray(results)
            ? results.length
            : results !== undefined
              ? 1
              : 0,
          data: results,
          error: null,
          query: query,
          status: "success",
        },
        null,
        2,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      throw new Error(
        JSON.stringify(
          {
            code: error instanceof MCPError ? error.code : "UNKNOWN_ERROR",
            error: errorMessage,
            success: false,
          },
          null,
          2,
        ),
      );
    }
  },
  name: "query-json-file",
  parameters: toolArgSchema,
};
