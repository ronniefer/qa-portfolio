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

describe('Determine Grid Region - Error Handling', function() {
    let regions = [
        { lat: 0,      long: 0,      status: 404, error: 'Coordinates not found', resplat: '0',      resplong: '0' },
        { lat: 42.372, long: 'null', status: 400, error: 'Invalid coordinates',   resplat: '42.372', resplong: 'null' },
        { lat: 'null', long:-72.519, status: 400, error: 'Invalid coordinates',   resplat: 'null',   resplong: '-72.519' },
        { lat: 'ABC',  long: 'XYZ',  status: 400, error: 'Invalid coordinates',   resplat: 'ABC',    resplong: 'XYZ' }
    ];

    regions.forEach ( location => {
        it(`For ${location['error']}/${location['resplat']}/${location['resplong']}`, function(done) {
            request(url)
            .get('/ba-from-loc')
            //.auth(token, { type: 'bearer' })
            .set('Authorization', 'Bearer ' + token)
            .query({ 'latitude' : location['lat'], 'longitude' : location['long']})
            .end(function(err, res){
                expect(res.status).to.equal(location['status']);
                expect(res.body.error).to.equal(location['error']);
                expect(res.body.latitude).to.equal(location['resplat']);
                expect(res.body.longitude).to.equal(location['resplong']);
                
                //console.log(JSON.stringify(res.request));
                //console.log(JSON.stringify(res.body));
                
                done();
            });
        });
    });
});

describe('Get Real-time Emissions Index - Happy Path/s', function() {
    let regions = [
        { query: 'ba=ISONE_WCMA',                                   ba_out: 'ISONE_WCMA'},
        { query: 'ba=ISONE_WCMA&style=percent',                     ba_out: 'ISONE_WCMA'},
        { query: 'latitude=42.372&longitude=-72.519&style=percent', ba_out: 'ISONE_WCMA'},
        { query: 'latitude=42.372&longitude=-72.519',               ba_out: 'ISONE_WCMA'},
        { query: 'latitude=42.372&longitude=-72.519&style=all',     ba_out: 'ISONE_WCMA'}
    ];

    regions.forEach ( location => {
        it(`For ${location['query']}`, function(done) {
            request(url)
            .get('/index')
            //.auth(token, { type: 'bearer' })
            .set('Authorization', 'Bearer ' + token)
            .query(location['query'])
            .end(function(err, res){
                expect(res.status).to.equal(200);
                expect(res.body.ba).to.equal(location['ba_out']);
                expect(res.body.freq).to.match(/^[0-9]{3}$/);
                expect(res.body.percent).to.match(/^[0-9]{2}$/);
                
                //console.log(JSON.stringify(res.request));
                //console.log(JSON.stringify(res.body));
                
                done();
            });
        });
    });
});

describe('Get Real-time Emissions Index - Error Handling', function() {
    let regions = [
        { query: 'ba=ISONE_WCMA&latitude=42.372&longitude=-72.519', style: 'percent', error_msg: 'must provide ba OR latitude/longitude parameters'},
        { query: 'ba=ISONE_WCMA',                                   style: 'xyz',     error_msg: 'Invalid style requested'},
        { query: 'ba=ISONE_WCMA&latitude=42.372',                   style: 'percent', error_msg: 'must provide ba OR latitude/longitude parameters'},
        { query: 'longitude=-72.519',                               style: 'percent', error_msg: 'must provide ba OR latitude/longitude parameters'},
        { query: 'latitude=0&longitude=0',                          style: 'percent', error_msg: 'Could not locate a balancing authority corresponding to query parameters'},
        { query: 'ba=XYZ',                                          style: 'percent', error_msg: 'You requested data for an unrecognized ba'}
    ];

    regions.forEach ( location => {
        it(`${location['error_msg']}`, function(done) {
            request(url)
            .get('/index')
            //.auth(token, { type: 'bearer' })
            .set('Authorization', 'Bearer ' + token)
            .query(location['query'])
            .query({ 'style' : location['style']})
            .end(function(err, res){
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal('Invalid query parameters');
                expect(res.body.message).to.equal(location['error_msg']);
                
                //console.log(JSON.stringify(res.request));
                //console.log(JSON.stringify(res.body));
                
                done();
            });
        });
    });
});

describe('Check Error Handling for Missing Authorization', function() {
    let regions = [
        { path: 'ba-from-loc', lat: 35.294, long: -120.652,  status: 401, error_msg: 'Authorization Required'},
        { path: 'index',       lat: 35.294, long: -120.652,  status: 401, error_msg: 'Authorization Required'}
    ];

    regions.forEach ( location => {
        it(`${location['error_msg']}`, function(done) {
            request(url)
            .get(`/${location['path']}`)

            .query({ 'latitude' : location['lat'], 'longitude' : location['long']})
            .end(function(err, res){
                expect(res.status).to.equal(location['status']);
                expect(res.text).contains(location['error_msg']);
                expect(res.headers['www-authenticate']).to.equal('Basic realm="login required"');
                
                //console.log(JSON.stringify(res.request));
                //console.log(JSON.stringify(res.body));
                //console.log(res.request);
                
                done();
            });
        });
    });
});
