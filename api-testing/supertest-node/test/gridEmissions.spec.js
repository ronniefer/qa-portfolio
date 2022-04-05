const request = require('supertest');
const expect  = require('chai').expect;

require('dotenv').config()

const url = 'https://api2.watttime.org/v2';

let username = process.env.API_USER
let password = process.env.API_PASS;

let token = '';

before('Obtain authorization', function() {
    it('Responds with bearer token', function(done) {
        request(url)
        .get('/login')
        .auth(username, password)
        .end(function(err, res){
            expect(res.status).to.equal(200);
            token = res.body.token;
            /*
            console.log(JSON.stringify(token));
            console.log(JSON.stringify(res.request));
            console.log(JSON.stringify(res.body));
            */
            done();
        });    
    });
});
