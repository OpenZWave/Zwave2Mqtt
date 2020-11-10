'esversion: 6'

import { NodeCollection } from '@/modules/NodeCollection'
import filterOptions from '@/components/nodes-table/filter-options.vue'

export default {
  props: {
    nodes: Array,
    showHidden: Boolean
  },
  components: {
    filterOptions
  },
  data: () => ({
    selectedNode: undefined,
    filters: {},
    headers: [
      { text: 'ID', value: 'node_id' },
      { text: 'Type', value: 'type' },
      { text: 'Product', value: 'product' },
      { text: 'Name', value: 'name' },
      { text: 'Location', value: 'loc' },
      { text: 'Secure', value: 'secure' },
      { text: 'Status', value: 'status' },
      { text: 'Last Active', value: 'lastActive' }
    ]
  }),
  methods: {
    initFilters () {
      return {
        ids: { type: 'number' },
        types: { type: 'string' },
        products: { type: 'string' },
        names: { type: 'string' },
        locations: { type: 'string' },
        secures: { type: 'boolean' },
        states: { type: 'string' },
        lastActives: { type: 'date' }
      }
    },
    resetFilter () {
      this.filters = this.initFilters()
    },
    nodeSelected (node) {
      this.selectedNode = node
      this.$emit('node-selected', { node })
    },
    productName (node) {
      const manufacturer = node.manufacturer ? ` (${node.manufacturer})` : ''
      return node.ready ? `${node.product}${manufacturer}` : ''
    }
  },
  mounted: function () {
    this.filters = this.initFilters()
  },
  computed: {
    nodeCollection () {
      return new NodeCollection(this.nodes)
    },
    relevantNodes () {
      return this.nodeCollection
        .filter('failed', failed => {
          return (this.showHidden ? true : !failed)
        })
    },
    filteredNodes () {
      return this.relevantNodes
        .betweenNumber('node_id', this.filters.ids ? this.filters.ids.min : null, this.filters.ids ? this.filters.ids.max : null)
        .betweenDate('lastActive', this.filters.lastActives ? this.filters.lastActives.min : null, this.filters.lastActives ? this.filters.lastActives.max : null)

        .contains(
          ['product', 'manufacturer'],
          this.filters.products ? this.filters.products.search : ''
        )
        .contains(['type'], this.filters.types ? this.filters.types.search : '')
        .contains(['name'], this.filters.names ? this.filters.names.search : '')
        .contains(['loc'], this.filters.locations ? this.filters.locations.search : '')
        .contains(['secure'], this.filters.secures ? this.filters.secures.search : '')
        .contains(['status'], this.filters.states ? this.filters.states.search : '')

        .equalsAny('node_id', this.filters.ids ? (this.filters.ids.selections ? this.filters.ids.selections : []) : [])
        .equalsAny('type', this.filters.types ? (this.filters.types.selections ? this.filters.types.selections : []) : [])
        .equalsAny('product', this.filters.products ? (this.filters.products.selections ? this.filters.products.selections : []) : [])
        .equalsAny('name', this.filters.names ? (this.filters.names.selections ? this.filters.names.selections : []) : [])
        .equalsAny('loc', this.filters.locations ? (this.filters.locations.selections ? this.filters.locations.selections : []) : [])
        .equalsAny('secure', this.filters.secures ? (this.filters.secures.selections ? this.filters.secures.selections : []) : [])
        .equalsAny('status', this.filters.states ? (this.filters.states.selections ? this.filters.states.selections : []) : [])
    },
    tableNodes () {
      return this.filteredNodes.nodes
    },
    ids () {
      return this.relevantNodes.values('node_id')
    },
    products () {
      return this.relevantNodes.values('product')
    },
    names () {
      return this.relevantNodes.values('name')
    },
    locations () {
      return this.relevantNodes.values('loc')
    },
    secures () {
      return [undefined, false, true]
    },
    states () {
      return this.relevantNodes.values('status')
    },
    types () {
      return this.relevantNodes.values('type')
    },
    lastActives () {
      return this.relevantNodes.values('lastActive')
    }
  }
}
