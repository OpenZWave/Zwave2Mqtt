import { NodeCollection } from '@/modules/NodeCollection'

export default {
  props: {
    nodes: Array
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
    nodeSelected (node) {
      this.selectedNode = node
      this.$emit('node-selected', { node })
    },
    productName (node) {
      const manufacturer = node.manufacturer ? ` (${node.manufacturer})` : ''
      return node.ready ? `${node.product}${manufacturer}` : ''
    }
  },
  computed: {
    nodeCollection () {
      return new NodeCollection(this.nodes)
    },
    filteredNodes () {
      return this.nodeCollection
        .contains(
          ['product', 'manufacturer'],
          this.filters.product ? this.filters.product : ''
        )
        .contains(['name'], this.filters.name ? this.filters.name : '')
        .equalsAny('loc', this.filters.locations ? this.filters.locations : [])
        .equalsAny('status', this.filters.status ? this.filters.status : [])
        .equalsAny('type', this.filters.types ? this.filters.types : [])
        .filter('failed', failed => (this.showHidden ? true : !failed))
    },
    tableNodes () {
      return this.filteredNodes.nodes
    },
    locations () {
      return this.nodeCollection.values('loc')
    },
    states () {
      return this.nodeCollection.values('status')
    },
    types () {
      return this.nodeCollection.values('type')
    }
  }
}
