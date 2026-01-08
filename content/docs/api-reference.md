---
title: 'API Reference'
description: 'Complete API documentation for Self AI'
date: '2024-01-01'
---

# API Reference

Complete reference for all Self AI APIs and methods.

## Core API

### Initialize Self AI

```javascript
import { SelfAI } from 'self-ai';

const ai = new SelfAI(config);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | string | Yes | Your Self AI API key |
| `environment` | string | No | 'production' or 'development' |
| `timeout` | number | No | Request timeout in ms (default: 30000) |
| `retries` | number | No | Number of retry attempts (default: 3) |

### Query Method

Ask questions and get intelligent responses.

```javascript
const response = await ai.query({
  question: 'What is machine learning?',
  context: 'technical',
  maxTokens: 500
});
```

**Parameters:**

- `question` (string, required): The question to ask
- `context` (string, optional): Context for the question
- `maxTokens` (number, optional): Maximum response length
- `temperature` (number, optional): Creativity level (0-1)

**Returns:**

```javascript
{
  answer: string,
  confidence: number,
  sources: string[],
  tokens: number
}
```

## Database API

### Connect Database

```javascript
import { DatabaseConnector } from 'self-ai';

const db = new DatabaseConnector({
  type: 'postgresql', // or 'mysql', 'mongodb', 'sqlite'
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'username',
  password: 'password'
});

const ai = new SelfAI({ 
  apiKey: 'your-key',
  database: db 
});
```

### Query Database

Use natural language to query your database:

```javascript
const result = await ai.queryDatabase(
  'Show me all customers who made purchases last month'
);

console.log(result.data);    // Query results
console.log(result.sql);     // Generated SQL
console.log(result.count);   // Number of rows
```

### Schema Analysis

Analyze your database schema:

```javascript
const schema = await ai.analyzeSchema();

console.log(schema.tables);      // All tables
console.log(schema.relationships); // Foreign keys
console.log(schema.suggestions);  // Optimization tips
```

## Agent Skills API

### Register Agent Skill

```javascript
import { AgentSkill } from 'self-ai';

const skill = new AgentSkill({
  name: 'data-processor',
  description: 'Process and analyze data files',
  apiKey: 'your-key'
});
```

### Define Skill Actions

```javascript
await skill.defineAction({
  name: 'processData',
  description: 'Process uploaded data files',
  parameters: {
    format: 'csv',
    validation: true
  },
  handler: async (data) => {
    // Custom processing logic
    return processedData;
  }
});
```

### Execute Agent Skill

```javascript
const result = await skill.execute({
  action: 'processData',
  input: {
    file: 'data.csv',
    options: {
      validate: true,
      format: 'json'
    }
  }
});

console.log(result.status);
console.log(result.output);
console.log(result.metadata);
```

## Advanced Features

### Batch Processing

Process multiple queries efficiently:

```javascript
const queries = [
  'Question 1',
  'Question 2',
  'Question 3'
];

const results = await ai.batchQuery(queries);
```

### Streaming Responses

Get real-time streaming responses:

```javascript
const stream = ai.queryStream({
  question: 'Explain quantum computing'
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

### Custom Models

Use custom fine-tuned models:

```javascript
const ai = new SelfAI({
  apiKey: 'your-key',
  model: 'custom-model-id'
});
```

## Error Handling

```javascript
try {
  const response = await ai.query({ question: 'test' });
} catch (error) {
  if (error.code === 'RATE_LIMIT') {
    console.log('Rate limit exceeded');
  } else if (error.code === 'INVALID_KEY') {
    console.log('Invalid API key');
  } else {
    console.log('Error:', error.message);
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `RATE_LIMIT` | Too many requests |
| `INVALID_KEY` | Invalid API key |
| `TIMEOUT` | Request timeout |
| `NETWORK_ERROR` | Connection failed |
| `INVALID_PARAMS` | Invalid parameters |

## Rate Limits

| Plan | Requests/minute | Requests/day |
|------|----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 600 | 50,000 |
| Enterprise | Unlimited | Unlimited |

---

**Next Steps:**
- [Tutorials](/docs/tutorials) - Practical examples
- [Best Practices](/docs/best-practices) - Optimization tips
- [Database Integration](/docs/database-integration) - Database guides
