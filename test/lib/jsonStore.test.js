const chai = require('chai')
const sinon = require('sinon')
const rewire = require('rewire')
const _ = require('lodash')

chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))
const should = chai.should()

const mod = rewire('../../lib/jsonStore')

describe('#jsonStore', () => {
  describe('#getFile()', () => {
    let fun = mod.__get__('getFile')
    let config = {file: 'foo', default: 'defaultbar'}
    beforeEach(() => {
      sinon.stub(mod.__get__('utils'), 'joinPath')
      sinon.stub(mod.__get__('jsonfile'), 'readFile')
    })
    afterEach(() => {
      mod.__get__('utils').joinPath.restore()
      mod.__get__('jsonfile').readFile.restore()
    })

    it('uncaught error', () => {
      mod.__get__('jsonfile').readFile.callsArgWith(1, new Error('FOO'), 'mybar')
      return fun(config).should.eventually.be.rejectedWith(Error, 'FOO')
    })

    it('data returned', () => {
      mod.__get__('jsonfile').readFile.callsArgWith(1, false, 'mybar')
      return fun(config).should.eventually.deep.equal({ file: 'foo', data: 'mybar' })
    })

    it('no data, return default', () => {
      mod.__get__('jsonfile').readFile.callsArgWith(1, false, null)
      return fun(config).should.eventually.deep.equal({ file: 'foo', data: 'defaultbar' })
    })

    it('file not found, return default', () => {
      mod.__get__('jsonfile').readFile.callsArgWith(1, {code: 'ENOENT'}, null)
      return fun(config).should.eventually.deep.equal({ file: 'foo', data: 'defaultbar' })
    })
  })
})
