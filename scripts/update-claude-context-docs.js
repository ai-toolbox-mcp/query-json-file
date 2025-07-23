#!/usr/bin/env node

import https from "https";
import fs from "fs";
import { URL } from "url";
import path from "path";

function downloadToFile(url, filePath) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const parsedUrl = new URL(url);

  const request = https.get(parsedUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Request Failed. Status Code: ${response.statusCode}`);
      response.resume(); // Consume response data to free up memory
      return;
    }

    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);

    fileStream.on("finish", () => {
      fileStream.close();
      console.log(`Downloaded to ${filePath}`);
    });
  });

  request.on("error", (err) => {
    console.error(`Request error: ${err.message}`);
  });
}

console.log("Syncing Claude context files");

downloadToFile(
  "https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/refs/heads/main/README.md",
  "./.claude/context/imported/typescript-sdk.md",
);

downloadToFile(
  "https://modelcontextprotocol.io/llms-full.txt",
  "./.claude/context/imported/llm-docs.md",
);

downloadToFile(
  "https://raw.githubusercontent.com/anthropics/dxt/refs/heads/main/README.md",
  "./.claude/context/imported/dtx-readme.md",
);

downloadToFile(
  "https://raw.githubusercontent.com/anthropics/dxt/refs/heads/main/MANIFEST.md",
  "./.claude/context/imported/dtx-manifest.md",
);

downloadToFile(
  "https://raw.githubusercontent.com/punkpeye/fastmcp/refs/heads/main/README.md",
  "./.claude/context/imported/fastmcp-readme.md",
);
