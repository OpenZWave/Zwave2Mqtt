export class NodeCollection {
  constructor (nodes) {
    this.nodes = nodes
  }

  _strValue (str, caseSensitive) {
    return caseSensitive ? `${str}` : `${str}`.toLowerCase()
  }

  _createStringFilter (filterValue, caseSensitive) {
    if (filterValue === undefined || filterValue === null) {
      filterValue = ''
    }
    const strFilter = this._strValue(filterValue, caseSensitive)
    return value => this._strValue(value, caseSensitive).indexOf(strFilter) >= 0
  }

  _filterByProps (node, properties, filter) {
    const mergedProps = [properties].reduce(
      (merged, prop) => merged.concat(prop),
      []
    )
    return mergedProps.find(prop => filter(node[prop]))
  }

  filter (properties, filter) {
    const filtered = this.nodes.filter(node =>
      this._filterByProps(node, properties, filter)
    )
    return new NodeCollection(filtered)
  }

  contains (properties, value, caseSensitive = false) {
    return this.filter(
      properties,
      this._createStringFilter(value, caseSensitive)
    )
  }

  equals (properties, value) {
    return this.filter(properties, nodeValue => value === nodeValue)
  }

  betweenNumber(properties, minValue, maxValue) {
    return this.filter(properties, nodeValue =>
      (minValue === undefined || minValue === null || minValue === '' || minValue <= nodeValue)
      && (maxValue === undefined || maxValue === null || maxValue === '' || maxValue >= nodeValue)
    )
  }

  betweenDate(properties, minValue, maxValue) {
    return this.filter(properties, nodeValue =>
      (minValue === undefined || minValue === null || minValue === '' || new Date(minValue) <= nodeValue)
      && (maxValue === undefined || maxValue === null || maxValue === '' || new Date(maxValue) >= nodeValue)
    )
  }

  equalsAny (properties, values) {
    return this.filter(
      properties,
      nodeValue => values.length === 0 || values.indexOf(nodeValue) >= 0
    )
  }

  values (property) {
    const uniqueMap = {}
    this.nodes.forEach(node => {
      const strVal = this._strValue(node[property])
      uniqueMap[strVal] = uniqueMap[strVal] || node[property]
    })
    return Object.keys(uniqueMap)
      .sort()
      .map(key => uniqueMap[key])
  }
}

export default NodeCollection
