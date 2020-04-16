const app = require('../test');
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose');

async function removeAllCollections () {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

async function dropAllCollections () {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
            // Safe to ignore.
            if (error.message === 'ns not found') return

            // This error happens when you use it.todo.
            // Safe to ignore.
            if (error.message.includes('a background operation is currently running')) return

            console.log(error.message)
        }
    }
}

// Disconnect Mongoose
afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
})

afterEach(async () => {
    //removeAllCollections()
})

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1:27017/gastracker_tests'
    await mongoose.connect(url, { useNewUrlParser: true })
})

describe('User Endpoints', () => {
    it('Should save user to database', async done => {
        const res = await request.post('/api/users/create')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                username: 'tjacob',
                email: 'lorem@tjacob.io',
                password:'123456',
                password_confirm:'123456',
            })
        expect(res.body.success).toBe(true);
        done()
    })
})
