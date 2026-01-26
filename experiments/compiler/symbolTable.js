export default class SymbolTable {
  constructor() {
    this.scopes = [{}]
  }

  pushScope() {
    this.scopes.push({})
  }

  popScope() {
    if (this.scopes.length > 1) {
      this.scopes.pop()
    } else {
      throw new Error(`Only Global Scope remaning`)
    }
  }

  // Check if variable exists in CURRENT top scope
  define(name, metadata) {
    const currentScope = this.scopes[this.scopes.length - 1] // we only check the current scope
    if (currentScope[name]) {
      throw new Error(
        `Semantic Error: Variable "${name}" has already been declared`,
      )
    }

    currentScope[name] = metadata
  }

  // Starts from the end of the array to find the scope first. If multiple variable names are repeated accross multiple scopes, the local one is always found first
  lookup(name) {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i][name]) {
        return this.scopes[i][name]
      }
    }
    throw new Error(`Sematic Error: Variable "${name}" is not defined.`)
  }
}
