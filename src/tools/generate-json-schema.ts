import { createSchema } from "genson-js";
import { z } from "zod";

import { MCPError } from "../types/index.js";
import { readJsonFile } from "../utils/index.js";

const toolArgSchema = z.object({
  filePath: z.string().describe("The absolute path to the JSON file"),
});

export const generateJsonSchemaTool = {
  description: "Generate a JSON schema from a JSON file",
  execute: async (args: z.infer<typeof toolArgSchema>) => {
    // Read the JSON data
    const jsonData = await readJsonFile({ filePath: args.filePath });

    // Generate the schema
    try {
      const schema = createSchema(jsonData);

      // Log the schema if debug mode is active
      // if (process.env.DEBUG) {
      console.error(JSON.stringify(schema, null, 2));
      // }

      return JSON.stringify(
        {
          data: schema,
          success: true,
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
  name: "generate-json-schema",
  parameters: toolArgSchema,
};
