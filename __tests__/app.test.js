const mongoose = require('mongoose'); 
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest'); 
const app = require('../lib/models/app.js'); 
const Shareable = require('../lib/models/Shareable'); 

describe('app routes', () => {
    const mongodb = new MongoMemoryServer();
    beforeAll(() => {
        return mongo.getUri()
            .then(uri => mongoose.connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close()
        .then(() => mongodb.stop());
    });

    it('creates a new shareable', () => {
        return request(app)
            .post('/shareables')
            .send({
                artist: 'Ben H', 
                description: 'a great artist', 
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    artist: 'Ben H',
                    description: 'a great artist',
                    views: 0,
                    __v: 0
                });
            });
    });

    it('gets a list of shareables', async () => {
        await Shareable.create({
            artist: 'Ben H',
            description: 'a great artist'
        });

        return request(app)
            .get('/shareables')
            .then(res => {
                expect(res.body).toEqual([{
                    _id: expect.anything(),
                    artist: 'Ben H', 
                    description: 'a great artist',
                    views: 0, 
                    __v: 0
                }]);
            });
    });

    it('gets a shareable by id', async() => {
        const shareable = await Shareable.create({
            artist: 'Ben H',
            description: 'a great artist'
        }); 

        return request(app)
            .get(`/shareables/${shareable._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: shareable.id,
                    artist: expect.anything(), 
                    description: expect.anything(),
                    views: 0, 
                    __v: 0
                });
            });
    });

    it('can update one shareable by id', async() => {
        const shareable = await Shareable.create({
            artist: 'Ben H',
            description: 'a great artist'
        }); 

        const newShareable = {
            artist: 'Breeann B',
            description: 'a great artist'
        };

        return request(app)
            .patch(`/shareables/${shareable._id}`)
            .send(
                { artist: newShareable.artist }, 
                { description: newShareable.description})
            .then(res => {
                expect(res.body).toEqual({
                    _id: shareable.id,
                    artist: 'Breeann B', 
                    description: expect.anything(),
                    views: 0, 
                    __v: 0
                });
            });
    });

    it('can delete one shareable by id', async() => {
        const deletedShareable = await Shareablle.create({
            artist: 'Ben H', 
            description: 'a great artist'

        });

    });

    

});
