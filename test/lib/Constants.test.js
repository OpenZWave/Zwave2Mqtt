const chai = require('chai')
const sinon = require('sinon')
const _ = require('lodash')
chai.use(require('sinon-chai'))
chai.should()

const mod = require('../../lib/Constants')

describe('#Constants', () => {
  describe('#productionType()', () => {
    let map
    before(() => {
      map = mod._productionMap
      mod._productionMap = { 1: 'foo' }
    })
    after(() => { mod._productionMap = map })
    it('known', () =>
      mod.productionType(1).should.deep.equal({ objectId: 'foo', props: { device_class: 'power' }, sensor: 'energy_production' })
    )
    it('unknown', () =>
      mod.productionType(2).should.deep.equal({ objectId: 'unknown', props: { device_class: 'power' }, sensor: 'energy_production' })
    )
    it('timestamp', () =>
      mod.productionType(3).should.deep.equal({ objectId: 'unknown', props: { device_class: 'timestamp' }, sensor: 'energy_production' })
    )
  })
  describe('#meterType()', () => {
    let sensorType
    var map = mod._metersMap
    before(() => {
      sensorType = sinon.stub(mod, 'sensorType').returns({})
      mod._metersMap = { 1: 'foo' }
    })
    after(() => {
      mod._metersMap = map
      sensorType.restore()
    })
    it('known', () => mod.meterType(1).should.deep.equal({ objectId: 'foo_meter' }))
    it('unknown', () => mod.meterType(2).should.deep.equal({ objectId: 'unknown_meter' }))
    describe('electricity', () => {
      before(() => {
        sensorType.resetHistory()
        _.range(1, 16).forEach(i => mod.meterType(i))
        mod.meterType(48)
        mod.meterType(64)
      })
      it('electricity', () => sensorType.should.always.have.been.calledWith(4))
    })
    describe('gas', () => {
      before(() => {
        sensorType.resetHistory()
        _.range(16, 32).forEach(i => mod.meterType(i))
      })
      it('gas', () => sensorType.should.always.have.been.calledWith(55))
    })
    describe('water', () => {
      before(() => {
        sensorType.resetHistory()
        _.range(32, 48).forEach(i => mod.meterType(i))
      })
      it('water', () => sensorType.should.always.have.been.calledWith(12))
    })
  })
  describe('#alarmType()', () => {
    let map
    before(() => {
      map = mod._alarmMap
      mod._alarmMap = { 1: 'foo' }
    })
    after(() => { mod._alarmMap = map })
    it('known', () =>mod.alarmType(1).should.equal('foo'))
    it('unknown', () =>mod.alarmType(3).should.equal('unknown_3'))
  })
})
