const chai = require('chai')
chai.should()
let mod

describe('#debug', () => {
  describe('unset process.env.DEBUG', () => {
    before(() => { mod = require('../../lib/debug') })
    it('NO IDEA WHAT DIFFERENCE DETECTABLY MAKES?', () =>
      mod('foo').namespace.should.equal('z2m:foo')
    )
  })
  describe('set process.env.DEBUG', () => {
    before(() => {
      process.env.DEBUG = 'f'
      mod = require('../../lib/debug')
    })
    it('NO IDEA WHAT DIFFERENCE DETECTABLY MAKES?', () =>
      mod('foo').namespace.should.equal('z2m:foo')
    )
  })
})
