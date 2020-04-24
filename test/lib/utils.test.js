const chai = require('chai')
chai.should()
const rewire = require('rewire')
const sinon = require('sinon')
let mod = rewire('../../lib/utils')

describe('#utils', () => {
  describe('#getPath()', () => {
    mod.__set__('appRoot', {toString: () => 'foo'})
    it('write && process.pkg', () => {
      process.pkg = true
      mod.getPath(true).should.equal(process.cwd())
    })
    it('write && !process.pkg', () => {
      process.pkg = false
      mod.getPath(true).should.equal('foo')
    })
    it('!write && process.pkg', () => {
      process.pkg = true
      mod.getPath(false).should.equal('foo')
    })
    it('!write && !process.pkg', () => {
      process.pkg = false
      mod.getPath(false).should.equal('foo')
    })
  })
  describe("#joinPath()", () => {
    let stub = sinon.stub()
    mod.__set__('path', {join: () => stub})
    it('zero length', () => {
      mod.joinPath('').should.equal('bar')
    })
  })
})
