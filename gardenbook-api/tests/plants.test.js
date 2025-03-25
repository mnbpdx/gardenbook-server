const request = require('supertest');
const app = require('../src/app');

describe('Plants API', () => {
  describe('GET /api/plants', () => {
    it('should return all plants', async () => {
      const res = await request(app).get('/api/plants');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/plants/:id', () => {
    it('should return a plant by id', async () => {
      const res = await request(app).get('/api/plants/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('scientificName');
    });

    it('should return 404 if plant not found', async () => {
      const res = await request(app).get('/api/plants/999');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /api/plants', () => {
    it('should create a new plant', async () => {
      const newPlant = {
        name: 'Monstera',
        scientificName: 'Monstera deliciosa',
        careLevel: 'MODERATE',
        waterFrequency: 7
      };
      
      const res = await request(app)
        .post('/api/plants')
        .send(newPlant);
        
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(newPlant.name);
      expect(res.body.scientificName).toEqual(newPlant.scientificName);
    });
  });

  describe('PUT /api/plants/:id', () => {
    it('should update an existing plant', async () => {
      const updatedPlant = {
        name: 'Updated Plant',
        scientificName: 'Updated Scientific Name',
        careLevel: 'DIFFICULT',
        waterFrequency: 3
      };
      
      const res = await request(app)
        .put('/api/plants/1')
        .send(updatedPlant);
        
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body.name).toEqual(updatedPlant.name);
      expect(res.body.scientificName).toEqual(updatedPlant.scientificName);
    });

    it('should return 404 if plant not found', async () => {
      const res = await request(app)
        .put('/api/plants/999')
        .send({
          name: 'Test',
          scientificName: 'Test',
          careLevel: 'EASY',
          waterFrequency: 7
        });
        
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /api/plants/:id', () => {
    it('should delete a plant', async () => {
      // First create a plant to delete
      const newPlant = {
        name: 'Plant to Delete',
        scientificName: 'Delete me',
        careLevel: 'EASY',
        waterFrequency: 7
      };
      
      const createRes = await request(app)
        .post('/api/plants')
        .send(newPlant);
        
      const plantId = createRes.body.id;
      
      // Now delete it
      const res = await request(app).delete(`/api/plants/${plantId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', plantId);
      
      // Verify it's gone
      const checkRes = await request(app).get(`/api/plants/${plantId}`);
      expect(checkRes.statusCode).toEqual(404);
    });

    it('should return 404 if plant not found', async () => {
      const res = await request(app).delete('/api/plants/999');
      expect(res.statusCode).toEqual(404);
    });
  });
}); 