const request = require('supertest');
const db = require('../data/dbConfig');

const server = require('../api/server');

describe('register', () => {

    describe('/ register new user', () => {
        it('should return a 400 status code when credentials are incomplete', () =>{
            let user = {
                username: 'newUser'
            }
            return request(server)
                .post('/api/auth/register')
                .send(user)
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it('should return an OK status code with successful registration', async done => {
            await db('users')
                    .where({username: 'newUser'})
                    .del()
                request(server)
                    .post('/api/auth/register')
                    .send({
                        username: 'newUser',
                        password: 'password'
                  })
                  .end((err, response) => {
                    expect(response.status).toBe(200)
                    done();
                  });
        })

        it('should return JSON with successful registration', async done => {
            await db('users')
                    .where({username: 'newUser'})
                    .del()
                request(server)
                    .post('/api/auth/register')
                    .send({
                        username: 'newUser',
                        password: 'password'
                  })
                  .end((err, response) => {
                    expect(response.type).toBe('application/json')
                    done();
                  });
        })
    })
})

describe('login', () => {

    describe('/ login', () => {
        it('should return a 401 status code when credentials are incorrect', () =>{
            let user = {
                username: 'newUser',
                password: '1234'
            }
            return request(server)
                .post('/api/auth/login')
                .send(user)
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    
        it('should return an OK status code with successful login', async done => {
            await db('users');
                request(server)
                .post('/api/auth/login')
                .send({
                    username: 'user',
                    password: 'password'
                })
                .end((err, response) => {
                    expect(response.status).toBe(200)
                    done();
                });
        })
    
        it('should return JSON with successful login', async done => {
            await db('users')
                    .where({username: 'newUser'})
                    .del()
                request(server)
                    .post('/api/auth/login')
                    .send({
                        username: 'newUser',
                        password: 'password'
                  })
                  .end((err, response) => {
                    expect(response.type).toBe('application/json')
                    done();
                  });
        })
    })
})