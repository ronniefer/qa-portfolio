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

describe('Determine Grid Region - Happy Path/s', function() {
    let regions = [
        { lat: 30.230, long: -97.731, abbrev: 'ERCOT_AUSTIN',      id: 255, name: 'ERCOT Austin'},
        { lat: 35.294, long:-120.652, abbrev: 'CAISO_NORTH',       id: 231, name: 'California ISO Northern'},
        { lat: 35.772, long: -78.616, abbrev: 'CPLE',              id: 197, name: 'Duke Energy Progress East'},
        { lat: 39.752, long: -86.080, abbrev: 'MISO_INDIANAPOLIS', id: 252, name: 'MISO Indianapolis'},
        { lat: 45.520, long: -73.575, abbrev: 'HQ',                id: 227, name: 'Hydro Quebec'},
        { lat: 44.541, long:-100.371, abbrev: 'SPP_SIOUX',         id: 274, name: 'SPP Sioux Falls '},
        { lat: 40.414, long:  -3.692, abbrev: 'ES',                id: 152, name: 'Spain'},
        { lat: 48.860, long:   2.294, abbrev: 'FR',                id: 136, name: 'France'}
    ];

    regions.forEach ( location => {
        it(`For ${location['name']}`, function(done) {
            request(url)
            .get('/ba-from-loc')
            //.auth(token, { type: 'bearer' })
            .set('Authorization', 'Bearer ' + token)
            .query({ 'latitude' : location['lat'], 'longitude' : location['long']})
            .end(function(err, res){
                expect(res.status).to.equal(200);
                expect(res.body.abbrev).to.equal(location['abbrev']);
                expect(res.body.id).to.equal(location['id']);
                expect(res.body.name).to.equal(location['name']);
                
                //console.log(JSON.stringify(res.request));
                //console.log(JSON.stringify(res.body));
                
                done();
            });
        });
    });
});
