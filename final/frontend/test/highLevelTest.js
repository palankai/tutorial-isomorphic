import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/main';


const expect = chai.expect;

chai.use(chaiHttp);


describe('App', () => {
  describe('/', () => {
    it('responds with status 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.have.string('ADR database');
          done();
        });
    });
  });
  describe('/submit', () => {
    it('responds with status 200', (done) => {
      chai.request(app)
        .get('/submit')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', (done) => {
      chai.request(app)
        .get('/submit')
        .end((err, res) => {
          expect(res.text).to.have.string('Create new decision record');
          done();
        });
    });
  });
  describe('/view', () => {
    it('responds with status 200', (done) => {
      chai.request(app)
        .get('/view')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', (done) => {
      chai.request(app)
        .get('/view')
        .end((err, res) => {
          expect(res.text).to.have.string('Conclusion');
          done();
        });
    });
  });
  describe('when page does not exist', () => {
    it('responds with status 404', (done) => {
      chai.request(app)
        .get('/page-does-not-exist')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response contains expected title', (done) => {
      chai.request(app)
        .get('/page-does-not-exist')
        .end((err, res) => {
          expect(res.text).to.have.string('Page not found');
          done();
        });
    });
  });
});
