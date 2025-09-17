const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory user storage (for demo purposes)
let users = [];
let nextUserId = 1;

// Users endpoints
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required',
      status: 'error'
    });
  }

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      error: 'User with this email already exists',
      status: 'error'
    });
  }

  // Create new user
  const newUser = {
    id: nextUserId++,
    name,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
    status: 'success'
  });
});

app.get('/users', (req, res) => {
  res.json({
    users,
    total: users.length,
    status: 'success'
  });
});

// Hello endpoint
app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, World!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Simple REST API',
    endpoints: ['/hello', '/users'],
    status: 'running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET / - API info`);
  console.log(`   GET /hello - Hello World endpoint`);
  console.log(`   POST /users - Create a new user`);
  console.log(`   GET /users - Get all users`);
});

module.exports = app;