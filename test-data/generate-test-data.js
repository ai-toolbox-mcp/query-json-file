#!/usr/bin/env node

import jsf from "json-schema-faker";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Extend jsf with faker for more realistic data
jsf.extend("faker", () => faker);

// Configure faker with more conservative settings to prevent infinite loops
jsf.option({
  fillProperties: true,
  alwaysFakeOptionals: true,
  optionalsProbability: 0.8,
  fixedProbabilities: true,
  ignoreMissingRefs: true,
  failOnInvalidTypes: false,
  failOnInvalidFormat: false,
  useDefaultValue: true,
  requiredOnly: false,
  minItems: 3,
  maxItems: 15,
  minLength: 5,
  maxLength: 50,
  random: Math.random,
});

const schemasDir = "./examples/schemas";
const outputDir = "./examples/json_files";

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files in the schemas directory and filter for .json files
const schemaFiles = fs
  .readdirSync(schemasDir)
  .filter((file) => file.endsWith(".json"));

for (const file of schemaFiles) {
  console.log(`Processing ${file}...`);

  try {
    const schemaPath = path.join(schemasDir, file);
    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

    // Generate just one sample to avoid complexity issues
    const sample = jsf.generate(schema);

    const outputFileName = file.replace(".json", "-sample.json");
    const outputPath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputPath, JSON.stringify(sample, null, 2));
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log("Done!");
