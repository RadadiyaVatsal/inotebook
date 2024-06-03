const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3020;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Change to your client URL
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization,auth-token', // Allowed headers
};
app.use(cors(corsOptions));

// Available routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes'));

async function startServer() {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB successfully');

    app.listen(port, () => {
      console.log(`iNotebook backend listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
}

startServer();
