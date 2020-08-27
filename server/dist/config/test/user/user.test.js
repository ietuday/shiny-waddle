"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
const app = require("../../../index");
chai.use(chaiHttp);
const should = chai.should();
const moduleBaseUrl = `/api/v1/user`;
let token;
let user;
describe('User Module =>', () => {
    /**
     * Create
     */
    describe('POST add User', () => {
        it('it should add User', (done) => {
            let dataObj = {
                firstName: "Udayaditya",
                lastName: "Singh",
                email: "udayaditya.singh@gmail.com",
                password: "e123456"
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/create`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('email');
                user = res.body.data;
                done();
            });
        });
    });
    /**
     * Login
     */
    describe('POST login', () => {
        it('it should get login', (done) => {
            let dataObj = {
                email: "udayaditya.singh@gmail.com",
                password: "e123456",
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/login`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('token');
                token = res.body.data.token;
                done();
            });
        });
    });
    /**
     * Logged In User
     */
    describe('GET logged in user data', () => {
        it('it should get logged in user data', (done) => {
            chai.request(app)
                .get(`${moduleBaseUrl}/logged-in-user`)
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('email');
                done();
            });
        });
    });
    /**
     * Logout
     */
    describe('GET logout', () => {
        it('it should get logout', (done) => {
            chai.request(app)
                .get(`${moduleBaseUrl}/logout`)
                .set('authorization', `Bearer ${token}`)
                .send()
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
        });
    });
    /**
     * Retrive
     */
    describe('POST get all users', () => {
        it('it should get all users', (done) => {
            let dataObj = {
                pageNo: "1",
                limit: "20"
            };
            chai.request(app)
                .get(`${moduleBaseUrl}/retrieve`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
     * find by id
     */
    describe('POST Find user by Id', () => {
        it('it should get user', (done) => {
            chai.request(app)
                .get(`${moduleBaseUrl}/find-by-id`)
                .send({ id: user._id })
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
 * update by id
 */
    describe('PUT Update user by Id', () => {
        it('it should get updated user', (done) => {
            chai.request(app)
                .put(`${moduleBaseUrl}/update-by-id`)
                .send({ id: user._id })
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
     * Update User By ID
     */
    describe('POST Update user by Id', () => {
        it('it should get updated user', (done) => {
            const dataObj = {
                id: user._id,
                item: {
                    firstName: "test"
                }
            };
            chai.request(app)
                .put(`${moduleBaseUrl}/update-by-id`)
                .send({ id: user._id })
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
     * Add Money ID
     */
    describe('POST Add Money ', () => {
        it('it should get updated user', (done) => {
            const dataObj = {
                amount: 5000
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/add-money`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
 * Add Money
 */
    describe('POST Add Money ', () => {
        it('it should get updated user', (done) => {
            const dataObj = {
                amount: 5000
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/add-money`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
     * Add Plan
     */
    describe('POST Add Plan ', () => {
        it('it should get updated user', (done) => {
            const dataObj = {
                "userId": user._id,
                "planId": "5da6c027663acc4401737404"
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/add-plan-by-user`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
    * Add Plan
    */
    describe('POST Add Channel ', () => {
        it('it should get updated user', (done) => {
            const dataObj = {
                "userId": user._id,
                "channelId": "5e219e45b6d4de2bf091bf48"
            };
            chai.request(app)
                .post(`${moduleBaseUrl}/add-channel-by-user`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    /**
    * Delete User By Id
    */
    describe('POST Delete User', () => {
        it('it should get delete user', (done) => {
            const dataObj = {
                "id": user._id
            };
            chai.request(app)
                .delete(`${moduleBaseUrl}/delete-by-id`)
                .send(dataObj)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
});
//# sourceMappingURL=user.test.js.map