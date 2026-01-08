---
title: 'Getting Started with Self AI'
description: 'Quick start guide to integrate Self AI into your projects'
date: '2024-01-01'
---

# Getting Started with Self AI

Welcome to Self AI! This guide will help you get up and running in minutes.

## Installation

Install Self AI using npm or yarn:

```bash
npm install self-ai
# or
yarn add self-ai
```

## Quick Start

Here's a simple example to get you started:

```javascript
import { SelfAI } from 'self-ai';

// Initialize Self AI
const ai = new SelfAI({
  apiKey: 'your-api-key-here',
  environment: 'production'
});

// Make your first query
async function askQuestion() {
  const response = await ai.query({
    question: 'What is the weather today?',
    context: 'user-context'
  });
  
  console.log(response.answer);
}

askQuestion();
```

## Configuration

Configure Self AI with your preferences:

```javascript
const config = {
  apiKey: process.env.SELF_AI_API_KEY,
  timeout: 30000,
  retries: 3,
  debug: true
};

const ai = new SelfAI(config);
```

## Database Integration

Connect Self AI to your database:

```javascript
import { SelfAI, DatabaseConnector } from 'self-ai';

const db = new DatabaseConnector({
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'user',
  password: 'password'
});

const ai = new SelfAI({
  apiKey: 'your-api-key',
  database: db
});

// Now you can query your database with natural language
const result = await ai.queryDatabase('Show me all users who signed up last week');
console.log(result);
```

## Next Steps

- [API Reference](/docs/api-reference) - Detailed API documentation
- [Tutorials](/docs/tutorials) - Step-by-step tutorials
- [Database Integration](/docs/database-integration) - Advanced database features
- [Agent Skills](/docs/agent-skills) - Extend AI with custom workflows and automation

## Need Help?

- 💬 Join our [Discord Community](https://discord.gg/selfai)
- 📧 Email us at support@selfai.cc
- 🐛 Report issues on [GitHub](https://github.com/selfai)

---

**Next:** Learn about [API Reference](/docs/api-reference) to explore all available features.
