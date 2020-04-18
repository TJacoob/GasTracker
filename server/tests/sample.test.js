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
    let auth_token;
    describe('User Creation', () => {
        const user = {
            username: 'tjacob',
            email: 'lorem@tjacob.io',
            password:'123456',
            password_confirm:'123456',
        };
        it('Create User', async done => {
            const res = await request.post('/api/users/create')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(user)
            expect(res.body.success).toBe(true);
            expect(res.body.username).toBe(user.username);
            done()
        })
        it('Create User with same Username but diferent Email', async done => {
            user.email = 'lorem2@tjacob.io';
            const res = await request.post('/api/users/create')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(user)
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe('Username already exists');
            done()
        })
        it('Create User with diferent Username but same Email', async done => {
            user.email = 'lorem@tjacob.io';
            user.username = 'tjacob_alt';
            const res = await request.post('/api/users/create')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(user)
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe('Email already in use');
            done()
        })
    })
    describe('Login, Get and Pollute Profile', () => {
        const login = {
            login: 'tjacob',
            password:'123456',
        };
        let profile;
        it('Login', async done => {
            const res = await request.post('/api/users/login')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(login)
            expect(res.body.success).toBe(true);
            expect(res.body.token).toBeTruthy();
            auth_token = res.body.token;
            done()
        })
        it('Get Own Profile', async done => {
            const res = await request.get('/api/profiles/own/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-access-token', auth_token)
                .send(login)
            expect(res.body.success).toBe(true);
            expect(res.body.profile).toBeTruthy();
            expect(res.body.profile.username).toBe(login.login);
            profile = res.body.profile;
            console.log(profile);
            done()
        })
        it('Edit Profile', async done => {
            profile.name = 'TJacob';
            const res = await request.post('/api/profiles/edit/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-access-token', auth_token)
                .send(profile)
            expect(res.body.success).toBe(true);
            expect(res.body.profile).toBeTruthy();
            expect(res.body.profile.name).toBe(profile.name);
            profile = res.body.profile;
            console.log(profile);
            done()
        })
        it('Try (and fail) to Pollute Profile', async done => {
            let trashProfile = { trash:'Lorem Ipsum' };
            const res = await request.post('/api/profiles/edit/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-access-token', auth_token)
                .send(trashProfile)
            expect(res.body.success).toBe(true);
            expect(res.body.profile).toEqual(profile);
            done()
        })
    })
})
