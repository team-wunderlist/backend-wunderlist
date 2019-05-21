const request = require('supertest');
const db = require('../data/dbConfig');

const server = require('../api/server');

let token;

// beforeAll(async done => {
//     await db('users');
//     request(server)
//       .post('/api/auth/login')
//       .send({
//         username: 'user',
//         password: 'password'
//       })
//       .end((err, response) => {
//         token = response.body.token;
//         done();
//       });
// });

beforeAll(async done => {
    await db('users')
        .where({username: 'user'})
        .del()
    request(server)
        .post('/api/auth/register')
        .send({
            username: 'user',
            password: 'password'
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
});

describe('todos', () => {

    describe('GET / todos', () => {
        it('should require authorization', () => {
            return request(server).get('/api/todos').expect(401);
        })

        it('should return an OK status code with valid login', () => {
            return request(server)
                .get('/api/todos')
                .set('authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })

        it('should return a JSON object (to-do list) with valid login', () => {
            return request(server)
                .get('/api/todos')
                .set('authorization', `${token}`)
                .then(res => {
                    expect(res.type).toBe('application/json');
                })
        })
    })
    
    describe('POST / todos', () => {
        it('should require authorization', () => {
            let todo = {
                item: "to-do item"
            }
            return request(server)
                .post('/api/todos')
                .send(todo)
                .then(res => {
                    expect(res.status).toBe(401);
                })
        })

        // it('should return a status code 400 if item information is missing', () => {
        //     let todo = {
        //         description: 'test to-do item'
        //     }
        //     return request(server)
        //         .post('/api/todos')
        //         .send(todo)
        //         .set('authorization', `Bearer ${token}`)
        //         .then(res => {
        //             expect(res.statusCode).toBe(400);
        //         })
        // })

        // it('should return an OK status code when authorized', () => {
        //     let todo = {
        //         item: 'to-do item'
        //     }
        //     return request(server)
        //         .post('/api/todos')
        //         .set('authorization', `Bearer ${token}`)
        //         .send(todo)
        //         .then(res => {
        //             expect(res.statusCode).toBe(321);
        //         })
        // })
    })
})