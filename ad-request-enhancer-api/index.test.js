/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const { app } = require('./index');
const constants = require('./config').constants;

/**
 * INTEGRATION TESTS For the ad request enhancer API
 */

/**
 * Sending an ad request with an correct JSON body
 * Must return 200 status
 */
let healthyAddRequestMock = {
    "site": {
        "id": "foo123",
        "page": "http://www.foo.com/why-foo"
    },
    "device": {
        "ip": "69.250.196.118"
    },
    "user": {
        "id": "9cb89r"
    }
};


/**
 * Sending an ad request with missing site.id which is required
 * Must return 403 validation error
 */
let addRequestMissingSiteIdMock = {
    "site": {
        "page": "http://www.foo.com/why-foo"
    },
    "device": {
        "ip": "69.250.196.118"
    },
    "user": {
        "id": "9cb89r"
    }
};


/**
 * Sending an ad request with Missing site key-value object
 * ie: site:{}
 * Must return error status 500 - Internal Server Error
 */
let invalidAddRequestMock = {
    "device": {
        "ip": "69.250.196.118"
    },
    "user": {
        "id": "9cb89r"
    }
};

/**
 * Sending an ad request with a NON US IP
 * Must return 403 validation error
 */
let addRequestNotUSIP = {
    "site": {
        "id": "foo123",
        "page": "http://www.foo.com/why-foo"
    },
    "device": {
        "ip": "200.122.123.124"
    },
    "user": {
        "id": "9cb89r"
    }
};

describe('Integration tests - Advertisement Request Enhancer API', () => {
    it('Should send an ad request with correct body and receives correct enhanced ad response', (done) => {

        let body = healthyAddRequestMock;

        request(app)
            .post('/ad/dispatch')
            .send(body)
            .expect(200)
            .expect((res) => {
                // Expect 'site' key to exist
                expect(res.body.site).to.exist;
                const site = res.body.site;
                expect(site.id).to.exist;// (since required)
                expect(site.id).to.equal(body.site.id);
                expect(site.page).to.exist;// (since required)
                expect(site.page).to.equal(body.site.page);

                // Expect 'device' key to exist
                expect(res.body.device).to.exist;
                const device = res.body.device;
                expect(device.ip).to.exist;// (since required)
                expect(device.ip).to.equal(body.device.ip);

                // Expect 'publisher' key to exist
                expect(res.body.site.publisher).to.exist;
                const publisher = res.body.site.publisher;
                expect(publisher.id).to.exist;// (since required)
            })
            .end((err, res) => {
                if (err) { return done(err); }
                done()
            });
    });

    it('Should send an ad request body missing required site.id and returns validation error with 403 status', (done) => {

        let body = addRequestMissingSiteIdMock;

        request(app)
            .post('/ad/dispatch')
            .send(body)
            .expect(403)
            .expect((res) => {
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal(`${constants.REQUEST} Validation Error`);
            })
            .end((err, res) => {
                if (err) { return done(err); }
                done()
            });
    });

    it('Should send an invalid ad request missing "site" from it and returns 500 error status', (done) => {

        let body = invalidAddRequestMock;

        request(app)
            .post('/ad/dispatch')
            .send(body)
            .expect(500)
            .expect((res) => {
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal("An error occured - make sure your request is not malformed");
            })
            .end((err, res) => {
                if (err) { return done(err); }
                done()
            });
    });

    it('Should send an ad request with a non US IP and returns 403 validation error status', (done) => {

        let body = addRequestNotUSIP;

        request(app)
            .post('/ad/dispatch')
            .send(body)
            .expect(403)
            .expect((res) => {
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal(`${constants.REQUEST} Validation Error`);
            })
            .end((err, res) => {
                if (err) { return done(err); }
                done()
            });
    });
});
