const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Garden Book API',
      version: '1.0.0',
      description: 'API for managing plants in the Garden Book application',
    },
    servers: [
      {
        url: 'http://137.184.176.143/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// In-memory database (replace with a real database later)
let plants = [
  { id: 1, name: 'Pothos', scientificName: 'Epipremnum aureum', careLevel: 'EASY', waterFrequency: 7 },
  { id: 2, name: 'Snake Plant', scientificName: 'Sansevieria trifasciata', careLevel: 'EASY', waterFrequency: 14 },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Plant:
 *       type: object
 *       required:
 *         - name
 *         - scientificName
 *         - careLevel
 *         - waterFrequency
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the plant
 *         name:
 *           type: string
 *           description: The name of the plant
 *         scientificName:
 *           type: string
 *           description: The scientific name of the plant
 *         careLevel:
 *           type: string
 *           description: The care level of the plant (EASY, MODERATE, DIFFICULT)
 *         waterFrequency:
 *           type: integer
 *           description: How often the plant needs to be watered (in days)
 */

/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Retrieve a list of plants
 *     description: Retrieve a list of plants from the Garden Book database
 *     responses:
 *       200:
 *         description: A list of plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
apiRouter.get('/plants', (req, res) => {
  res.json(plants);
});

/**
 * @swagger
 * /plants/{id}:
 *   get:
 *     summary: Get a plant by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the plant to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A plant object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
apiRouter.get('/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');
  res.json(plant);
});

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Create a new plant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       201:
 *         description: The created plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 */
apiRouter.post('/plants', (req, res) => {
  const plant = {
    id: plants.length + 1,
    name: req.body.name,
    scientificName: req.body.scientificName,
    careLevel: req.body.careLevel,
    waterFrequency: req.body.waterFrequency
  };
  plants.push(plant);
  res.status(201).json(plant);
});

/**
 * @swagger
 * /plants/{id}:
 *   put:
 *     summary: Update a plant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the plant to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: The updated plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
apiRouter.put('/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');

  plant.name = req.body.name;
  plant.scientificName = req.body.scientificName;
  plant.careLevel = req.body.careLevel;
  plant.waterFrequency = req.body.waterFrequency;

  res.json(plant);
});

/**
 * @swagger
 * /plants/{id}:
 *   delete:
 *     summary: Delete a plant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the plant to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
apiRouter.delete('/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');

  const index = plants.indexOf(plant);
  plants.splice(index, 1);

  res.json(plant);
});

app.listen(port, () => {
  console.log(`Garden Book API running on port ${port}`);
});