export class Settings {
  constructor (storage) {
    this.storage = storage ? storage : localStorage
  }

  load (key, defaultVal) {
    // Supports values of type 'string', 'number' and 'object'
    // A default value is required to determine the type.
    const valStr = this.storage.getItem(key)
    const type = typeof defaultVal
    let val
    switch (type) {
      case 'boolean':
        val = valStr === 'false' ? false : valStr === 'true' ? true : defaultVal
        break
      case 'number':
        val = valStr && !isNaN(valStr) ? Number(valStr) : defaultVal
        break
      case 'string':
        val = valStr || valStr === '' ? valStr : defaultVal
        break
      case 'object':
        try {
          val = JSON.parse(valStr)
        } catch (e) {
          val = undefined
        }
        val =
          val && (Object.keys(val).length !== 0 || val.constructor === Object)
            ? val
            : defaultVal
        break
    }
    return val
  }

  store (key, val) {
    let valStr
    if (typeof val === 'object') {
      valStr = JSON.stringify(val)
    } else {
      valStr = String(val)
    }
    this.storage.setItem(key, valStr)
  }
}

export default Settings
