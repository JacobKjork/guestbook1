const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./index').app;

const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('chai').assert;
const ind = require('./index')
chai.use(chaiHttp);

let bodyAll;
let bodyPlusEn;
let bodyDeleted;

describe("get routs", () => {


    it("should ge all posts", (done) => {

        chai.request('http://localhost:4000')
            .get('/api/v1/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                bodyAll = res.text.toString();
                done();
            });
    })

    it("should get one post", (done) => {

        chai.request('http://localhost:4000')
            .get('/api/v1/posts/5')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    })

    it("should add one posts", (done) => {

        chai.request('http://localhost:4000')
            .get('/api/v1/posts/addPost?posterName=Jacob&posterEmail=jacob.kjork@gmail.com&posterIpAddress=192.168.10.101&postBody=HejsanTest')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                bodyPlusEn = res.text.toString();
                //console.log(bodyAll.length - bodyPlusEn.length);
                (bodyAll.length - bodyPlusEn.length).should.be.lessThan(-10);
                done();
            });
    })
})
describe    ("delete routs", (done)=>{

    it("should delete last post from get route", (done) => {

        chai.request('http://localhost:4000')
            .delete('/api/v1/deleteLastPost')
            .end((err, res) => {
                res.should.have.status(200);
                bodyDeleted = res.text.toString();
                
                let a = JSON.stringify('{"posts":'+bodyDeleted.toString().trim()+"}")
                let b = JSON.stringify(bodyAll.toString())
              
                assert.strictEqual(a, b, 'responses are strictly equal');

                done();
            });
    })
})
describe    ("post routs", (done)=>{

    it("should add one post", (done) => {

        chai.request('http://localhost:4000')
            .post('/api/v1//setPost')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
})

describe    ("delete routs", (done)=>{

    it("should delete last post from postroute", (done) => {

        chai.request('http://localhost:4000')
            .delete('/api/v1/deleteLastPost')
            .end((err, res) => {
                res.should.have.status(200);
                bodyDeleted = res.text.toString();
                
                let a = JSON.stringify('{"posts":'+bodyDeleted.toString().trim()+"}")
                let b = JSON.stringify(bodyAll.toString())
              
                assert.strictEqual(a, b, 'responses are strictly equal');

                done();
            });
    })
})
