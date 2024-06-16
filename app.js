const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load character data
const loadCharacterData = require('./scripts/loadCharacterData');
const characterData = loadCharacterData();

// Store character data in app locals for access in routes
app.locals.characterData = characterData;

// Import routes
const apiRoutes = require('./routes');

// Use routes
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
