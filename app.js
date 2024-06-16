const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 3000;

dotenv.config(); // Load environment variables from .env file
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const USER_NAME = process.env.MONGODB_USERNAME;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB connection
const uri = `mongodb+srv://${USER_NAME}:${MONGODB_PASSWORD}@character-stats.ljnqjb4.mongodb.net/?retryWrites=true&w=majority&appName=character-stats`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();

// Mongoose connection using the same URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB with Mongoose');
}).catch(err => {
  console.error('Error connecting to MongoDB with Mongoose:', err);
});

// Load character data
const loadCharacterData = require('./scripts/loadCharacterData');

(async () => {
  const characterData = await loadCharacterData();

  // Store character data in app locals for access in routes
  app.locals.characterData = characterData;

  // Import routes
  const apiRoutes = require('./routes');
  app.use('/api', apiRoutes);

  // Default message
  app.get('/', (req, res) => {
    res.send('Quest! Fight! Gold!');
  });

  // Import and use Swagger
  const setupSwagger = require('./swagger');
  setupSwagger(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
  });
})();
