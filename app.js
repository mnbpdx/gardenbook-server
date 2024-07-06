const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database (replace with a real database later)
let plants = [
  { id: 1, name: 'Pothos', scientificName: 'Epipremnum aureum', careLevel: 'EASY', waterFrequency: 7 },
  { id: 2, name: 'Snake Plant', scientificName: 'Sansevieria trifasciata', careLevel: 'EASY', waterFrequency: 14 },
];

// Routes
app.get('/api/plants', (req, res) => {
  res.json(plants);
});

app.get('/api/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');
  res.json(plant);
});

app.post('/api/plants', (req, res) => {
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

app.put('/api/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');

  plant.name = req.body.name;
  plant.scientificName = req.body.scientificName;
  plant.careLevel = req.body.careLevel;
  plant.waterFrequency = req.body.waterFrequency;

  res.json(plant);
});

app.delete('/api/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('Plant not found');

  const index = plants.indexOf(plant);
  plants.splice(index, 1);

  res.json(plant);
});

app.listen(port, () => {
  console.log(`Garden Book API running on port ${port}`);
});
