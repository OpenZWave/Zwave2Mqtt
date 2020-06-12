import chai from 'chai'
import { NodeCollection } from './NodeCollection'

describe('NodeCollection', () => {
  describe('#constructor', () => {
    it('uses the nodes passed in as the collection nodes', () => {
      const collection = new NodeCollection([{ id: 1 }])
      chai.expect(collection.nodes).to.eql([{ id: 1 }])
    })
  })
  describe('#filter', () => {
    const isOdd = (num) => num % 2
    it('returns nodes with the property matching the filter', () => {
      const collection = new NodeCollection([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 }
      ])
      const filtered = collection.filter('id', isOdd)
      chai.expect(filtered.nodes).to.eql([
        { id: 1 },
        { id: 3 }
      ])
    })
    it('returns nodes with any of the properties matching the filter', () => {
      const collection = new NodeCollection([
        { id: 1, value: 2 },
        { id: 2, value: 1 },
        { id: 3, value: 2 },
        { id: 4, value: 2 }
      ])
      const filtered = collection.filter(['id', 'value'], isOdd)
      chai.expect(filtered.nodes).to.eql([
        { id: 1, value: 2 },
        { id: 2, value: 1 },
        { id: 3, value: 2 }
      ])
    })
  })
  describe('#contains', () => {
    const stringCollection = new NodeCollection([
      { id: 'pippo' },
      { id: 'paRanza' },
      { id: 'PipPo' },
      { id: 'Ames' }
    ])

    it('returns nodes with the properties containing the value', () => {
      const collection = new NodeCollection([
        { id: 100 },
        { id: '210' },
        { id: 20 },
        { id: '300' }
      ])
      const filtered = collection.contains('id', '10')
      chai.expect(filtered.nodes).to.eql([
        { id: 100 },
        { id: '210' }
      ])
    })
    it('matches values over multiple properties', () => {
      const collection = new NodeCollection([
        { id: 100, name: 'sample' },
        { id: '210', name: 'trinity' },
        { id: 20, name: '10 packs' },
        { id: '300', name: 'fazuoli' }
      ])
      const filtered = collection.contains(['id', 'name'], '10')
      chai.expect(filtered.nodes).to.eql([
        { id: 100, name: 'sample' },
        { id: '210', name: 'trinity' },
        { id: 20, name: '10 packs' }
      ])
    })
    it('is case insensitive by default', () => {
      const filtered = stringCollection.contains('id', 'piPPo')
      chai.expect(filtered.nodes).to.eql([
        { id: 'pippo' },
        { id: 'PipPo' }
      ])
    })
    it('accepts a case sensitive flag', () => {
      const filtered = stringCollection.contains('id', 'PipPo', true)
      chai.expect(filtered.nodes).to.eql([
        { id: 'PipPo' }
      ])
    })
  })
  describe('#equals', () => {
    it('returns nodes with the properties with equal value', () => {
      const collection = new NodeCollection([
        { id: 10 },
        { id: '10' },
        { id: 20 },
        { id: '20' }
      ])
      const filtered = collection.equals('id', 10)
      chai.expect(filtered.nodes).to.eql([
        { id: 10 }
      ])
    })
    it('works over multiple properties', () => {
      const collection = new NodeCollection([
        { id: 10, sample: '20' },
        { id: '10', sample: 30 },
        { id: 20, sample: '10' },
        { id: '20', sample: 10 }
      ])
      const filtered = collection.equals(['id', 'sample'], 10)
      chai.expect(filtered.nodes).to.eql([
        { id: 10, sample: '20' },
        { id: '20', sample: 10 }
      ])
    })
  })
  describe('#equalsAny', () => {
    it('returns all nodes when values has no elements', () => {
      const collection = new NodeCollection([
        { id: 10 },
        { id: '10' },
        { id: 20 },
        { id: '20' }
      ])
      const filtered = collection.equalsAny('id', [])
      chai.expect(filtered.nodes).to.eql([
        { id: 10 },
        { id: '10' },
        { id: 20 },
        { id: '20' }
      ])
    })
    it('returns nodes with the properties equal to any of the values', () => {
      const collection = new NodeCollection([
        { id: 10 },
        { id: '10' },
        { id: 20 },
        { id: '20' }
      ])
      const filtered = collection.equalsAny('id', [10, '20'])
      chai.expect(filtered.nodes).to.eql([
        { id: 10 },
        { id: '20' }
      ])
    })
    it('works over multiple properties', () => {
      const collection = new NodeCollection([
        { id: 10, sample: 20 },
        { id: '10', sample: '20' },
        { id: 20, sample: '10' },
        { id: '20', sample: 'zdub' }
      ])
      const filtered = collection.equalsAny(['id', 'sample'], [10, '20'])
      chai.expect(filtered.nodes).to.eql([
        { id: 10, sample: 20 },
        { id: '10', sample: '20' },
        { id: '20', sample: 'zdub' }
      ])
    })
  })
  describe('#values', () => {
    it('returns a sorted list of unique values for a property - case ignored', () => {
      const collection = new NodeCollection([
        { name: 'Giacomo' },
        { name: 'GiaCOMO' },
        { name: 'Birretta' },
        { name: 10 },
        { name: 'giacomo' },
        { name: 10 }
      ])
      chai.expect(collection.values('name')).to.eql([
        10,
        'Birretta',
        'Giacomo'
      ])
    })
  })
})
