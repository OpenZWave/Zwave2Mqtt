const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
chai.should()

const mod = require('../../lib/Constants')

describe('#Constants', () => {
  describe('#productionType()', () => {
    var map = mod._productionMap
    before(() => { mod._productionMap = {1: 'foo'} })
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
    before(() => { sensorType = sinon.stub(mod, 'sensorType').returns({}) })
    after(() => sensorType.restore())
    describe('electricity', () => {
      it('0', () => mod.meterType(0).should.deep.equal({ objectId: 'kwh_meter' }))
      it('1', () => mod.meterType(1).should.deep.equal({ objectId: 'kvah_meter' }))
      it('2', () => mod.meterType(2).should.deep.equal({ objectId: 'w_meter' }))
      it('3', () => mod.meterType(3).should.deep.equal({ objectId: 'pulses_meter' }))
      it('4', () => mod.meterType(4).should.deep.equal({ objectId: 'v_meter' }))
      it('5', () => mod.meterType(5).should.deep.equal({ objectId: 'a_meter' }))
      it('6', () => mod.meterType(6).should.deep.equal({ objectId: 'pf_meter' }))
      it('7', () => mod.meterType(7).should.deep.equal({ objectId: 'unknown_meter' }))
      it('8', () => mod.meterType(8).should.deep.equal({ objectId: 'kvar_meter' }))
      it('9', () => mod.meterType(9).should.deep.equal({ objectId: 'kvarh_meter' }))
      it('10', () => mod.meterType(10).should.deep.equal({ objectId: 'unknown_meter' }))
      it('15', () => mod.meterType(15).should.deep.equal({ objectId: 'unknown_meter' }))
      it('48', () => mod.meterType(48).should.deep.equal({ objectId: 'kwh_meter' }))
      it('64', () => mod.meterType(64).should.deep.equal({ objectId: 'kwh_meter' }))
      it('electricity', () => sensorType.should.always.have.been.calledWith(4))
      after(() => sensorType.resetHistory())
    })
    describe('gas', () => {
      it('16', () => mod.meterType(16).should.deep.equal({ objectId: 'm3_meter' }))
      it('17', () => mod.meterType(17).should.deep.equal({ objectId: 'ft3_meter' }))
      it('19', () => mod.meterType(19).should.deep.equal({ objectId: 'pulses_meter' }))
      it('gas', () => sensorType.should.always.have.been.calledWith(55))
      after(() => sensorType.resetHistory())
    })
    describe('water', () => {
      it('32', () => mod.meterType(32).should.deep.equal({ objectId: 'm3_meter' }))
      it('33', () => mod.meterType(33).should.deep.equal({ objectId: 'ft3_meter' }))
      it('34', () => mod.meterType(34).should.deep.equal({ objectId: 'gal_meter' }))
      it('35', () => mod.meterType(35).should.deep.equal({ objectId: 'pulses_meter' }))
      it('water', () => sensorType.should.always.have.been.calledWith(12))
      after(() => sensorType.resetHistory())
    })
  })
})
