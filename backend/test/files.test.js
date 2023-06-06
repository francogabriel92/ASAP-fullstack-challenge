/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect

describe('GET /files/data', () => {
  it('should return an array of files', (done) => {
    chai.request(app)
      .get('/files/data')
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0].file).to.equal('test2.csv')
        done()
      })
  })
  it('should return a single file', () => {
    chai.request(app)
      .get('/files/data?fileName=test2.csv')
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.file).to.equal('test2.csv')
      })
  })
  it('should return 404 if file does not exist', () => {
    chai.request(app)
      .get('/files/data?fileName=wrong-name.csv')
      .end((_, res) => {
        expect(res).to.have.status(404)
      })
  })
})

describe('GET /files/list', () => {
  it('should return an object containing an array of available files', (done) => {
    chai.request(app)
      .get('/files/list')
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('files')
        done()
      })
  })
})
