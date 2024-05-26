const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 3020;

app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes'));

async function startServer() {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB successfully ');

    app.listen(port, () => {
      console.log(`iNotebook backend listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
}

startServer();
