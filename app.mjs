import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import loadCharacterData from './scripts/loadCharacterData.mjs';
import setupSwagger from './swagger.mjs';
import apiRoutes from './routes/index.mjs';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const USER_NAME = process.env.MONGODB_USERNAME;

app.use(cors());
app.use(express.json());

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
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB with Mongoose');
}).catch(err => {
  console.error('Error connecting to MongoDB with Mongoose:', err);
});

(async () => {
  const characterData = await loadCharacterData();
  app.locals.characterData = characterData;

  app.use('/api', apiRoutes);

  app.get('/', (req, res) => {
    res.send('Quest! Fight! Gold!');
  });

  setupSwagger(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
  });
})();

export { app as server };
