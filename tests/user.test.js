/* Author: Ibrahim Khalid
Date: 2020-02-10
Description: Test cases for User */

//Require request, app, user model, and users test data
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')

//Setup Database before each suite test
beforeEach(setupDatabase)

//Signup a new user
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Johnathon Testing',
        email: 'JohnathonTesting@gmail.com',
        password: 'Johnathon@2020'
    }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Johnathon Testing',
            email: 'JohnathonTesting@gmail.com'
        },
        token: user.tokens[0].token
    })

    //User password not stored plain in db
    expect(user.password).not.toBe('Johnathon@2020')
})

//Login User
test('Should Login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

//Login user which does not exist
//Wrong username/password
test('Should not login nonexistent User', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'JohhnyDepp123'
    }).expect(400)
})

//Get profile for Logged In user one
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

//Get Profile for unauthenticated user
test('Should not get profile for unauthenticated user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//Delete user account for authenticated user
test('Should delete account for user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

//Delete user account for unauthenticated user
test('Should not delete account for unauthenticated user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//Upload avatar image
test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

//Update valid user fields
test('Should update valid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'John Testing'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Ibby Testing')
})

//Should not update invalid user fields
test('Should not update invalid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Toronto'
        })
        .expect(400)
})