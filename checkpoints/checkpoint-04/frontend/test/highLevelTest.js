import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/main';


const expect = chai.expect;

chai.use(chaiHttp);


describe('App', function() {
  describe('/', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(res.text).to.have.string('ADR database');
          done();
        });
    });
  });
  describe('/submit', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/submit.html')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', function(done) {
      chai.request(app)
        .get('/submit.html')
        .end(function(err, res) {
          expect(res.text).to.have.string('Create new decision record');
          done();
        });
    });
  });
  describe('/view', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/view.html')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', function(done) {
      chai.request(app)
        .get('/view.html')
        .end(function(err, res) {
          expect(res.text).to.have.string('Conclusion');
          done();
        });
    });
  });
});
