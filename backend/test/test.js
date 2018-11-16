var supertest = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = chai.should();

global.expect = chai.expect;
global.app = app;
global.request = supertest(app);
chai.use(chaiHttp);

describe('Test Cases', function () {

    it('Sign Up Test ', function (done) {
        request.post('/signup')
            .send({
                first_name: 'test',
                last_name: 'test',
                email: 'test@gmail.com',
                password: '123',
                is_owner: 'false',
            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Login Test', function (done) {
        request.post('/travelerlogin')
            .send({
                email: 'test@gmail.com',
                password: '123',

            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Get Profile Details', function (done) {
        request.get('/userprofile?email=test@gmail.com')
            .expect(200)
            .end(function (err, res) {
                if(err)done(err);
                chai.assert.equal(res.body.first_name, 'test')
                done()
            });
    });

    it('Update Profile Details', function (done) {
        request.post('/userprofile')
            .send({
                currentUser : 'test@gmail.com',
                fname: 'Akash', 
                lname: 'Thakkar'              
            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Search Properties', function (done) {
        request.post('/searchproperty')
            .send({
                address: 'New York',
                sdate: '2018-11-20',
                edate: '2018-11-25',
                guest: '2'
            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

});
