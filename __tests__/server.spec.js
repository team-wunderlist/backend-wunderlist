const request = require('supertest');

const db = require('../data/dbConfig');

const server = require('../api/server');

describe('server', () => {
    it('should return an OK status code', () => {
        return request(server).get('/').expect(200);
    })
})