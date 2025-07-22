# Examples Directory

This directory contains JSON schemas and tools for generating test data for the MCP JSON Query server.

## Structure

```
examples/
├── README.md           # This file
├── schemas/           # JSON Schema definitions
│   └── complex.json   # Complex nested schema example
└── json_files/        # Generated JSON test data (not in git)
    └── *.json         # Auto-generated test files
```

## JSON Schemas

The `schemas/` directory contains JSON Schema files that define the structure of test data. These schemas are used to automatically generate large datasets for testing JSONPath queries.

### Available Schemas

- **`simple.json`** - A simple flat schema representing user profiles with basic properties (name, email, age, etc.) and a tags array. Perfect for testing basic JSONPath queries.

- **`medium.json`** - A medium complexity schema with 2-3 levels of nesting, representing an e-commerce system with users, profiles, contact information, preferences, and order history. Good for testing intermediate JSONPath queries.

- **`complex.json`** - A complex nested schema with arrays and objects 4 levels deep, representing a social media-like structure with categories, posts, comments, and replies. Ideal for testing advanced JSONPath expressions.

## Generating Test Data

Test data is generated using the `scripts/generate-test-data.js` script, which uses `json-schema-faker` to create realistic sample data based on the JSON schemas.

### Prerequisites

Make sure you have the required dependencies installed:

```bash
pnpm install
```

### Running the Generator

```bash
# Generate test data from all schemas
node scripts/generate-test-data.js
```

The script will:

- Read all `.json` files from the `schemas/` directory
- Generate sample data for each schema using faker.js for realistic content
- Save the generated files to `json_files/` with a `-sample.json` suffix
- Create the `json_files/` directory if it doesn't exist

### Generated Files

Generated JSON files follow this naming pattern:

- `schemas/simple.json` → `json_files/simple-sample.json`
- `schemas/medium.json` → `json_files/medium-sample.json`
- `schemas/complex.json` → `json_files/complex-sample.json`

## Adding New Schemas

To add a new JSON schema for test data generation:

1. **Create the schema file** in the `schemas/` directory:

   ```bash
   touch examples/schemas/my-new-schema.json
   ```

2. **Define your JSON Schema** with the following considerations:
   - Use `minItems` and `maxItems` to control array sizes
   - Use `minLength` and `maxLength` for string lengths
   - Include `faker` properties for realistic data generation
   - Consider the nesting depth to avoid performance issues

3. **Example schema structure**:

   ```json
   {
     "type": "object",
     "properties": {
       "name": {
         "type": "string",
         "faker": "person.fullName"
       },
       "email": {
         "type": "string",
         "faker": "internet.email"
       },
       "posts": {
         "type": "array",
         "minItems": 5,
         "maxItems": 20,
         "items": {
           "type": "object",
           "properties": {
             "title": { "faker": "lorem.sentence" },
             "content": { "faker": "lorem.paragraphs" }
           }
         }
       }
     },
     "required": ["name", "email", "posts"]
   }
   ```

4. **Generate the test data**:
   ```bash
   node scripts/generate-test-data.js
   ```

## Faker.js Integration

The generator uses faker.js to create realistic test data. You can use any faker method in your schemas:

- `faker.person.fullName()` → `"faker": "person.fullName"`
- `faker.internet.email()` → `"faker": "internet.email"`
- `faker.lorem.paragraph()` → `"faker": "lorem.paragraph"`
- `faker.commerce.department()` → `"faker": "commerce.department"`

See the [faker.js documentation](https://fakerjs.dev/) for all available methods.

## Important Notes

- **Generated files are not in git**: The `json_files/` directory is gitignored because generated datasets can be extremely large (MB to GB)
- **Performance considerations**: Large schemas with deep nesting and high `minItems` values can take significant time to generate
- **File sizes**: Generated files can become very large depending on your schema constraints
- **Realistic data**: The generator creates realistic-looking data perfect for testing JSONPath queries

## Testing JSONPath Queries

Once you have generated test data, you can use it with the MCP server to test various JSONPath queries:

```bash
# Example JSONPath queries on generated data

# Simple schema queries
$[?(@.age > 30)]                    # Users over 30
$..tags[*]                          # All tags
$[?(@.isActive == true)].name       # Names of active users

# Medium schema queries
$.users[?(@.contact.address.country == 'United States')]  # US users
$.users[*].orders[?(@.status == 'delivered')]             # Delivered orders
$.users[*].preferences.notifications                      # All notification settings

# Complex schema queries
$..[?(@.category == 'technology')]                        # Technology posts
$..posts[*].comments[?(@.replies.length > 5)]            # Comments with many replies
$..replies[?(@.likes.length > 10)].author                # Popular reply authors
```

The complex nested structure allows testing of sophisticated JSONPath expressions across multiple levels of data.
