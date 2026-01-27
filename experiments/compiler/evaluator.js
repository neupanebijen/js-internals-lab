// Making the evaluator
import SymbolTable from "./symbolTable.js"

export default class Evaluator {
  constructor() {
    this.symbolTable = null
  }

  evaluate(node, symbolTable) {
    console.log("Logging node: ", node)
    this.symbolTable = symbolTable
    console.log("Logging symbolTable: ", symbolTable)
    return this._eval(node)
  }

  _eval(node) {
    if (!node) return null

    switch (node.type) {
      case "Program":
        return this.evalProgram(node)

      case "BlockStatement":
        return this.evalBlock(node)

      case "VariableDeclaration":
        return this.evalVariableDeclaration(node)

      case "BinaryExpression":
        return this.evalBinaryExpression(node)

      case "Literal":
        return this.evalLiteral(node)

      case "Identifier":
        return this.evalIdentifier(node)

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  evalProgram(node) {
    let lastResult = null
    for (const statement of node.body) {
      lastResult = this._eval(statement)
    }

    return lastResult
  }

  evalLiteral(node) {
    return node.value
  }

  evalBlock(node) {
    this.symbolTable.pushScope()

    let result = null

    for (const statement of node.body) {
      result = this._eval(statement)
    }

    this.symbolTable.popScope()

    return result
  }

  evalBinaryExpression(node) {
    const left = this._eval(node.left)
    const right = this._eval(node.right)

    switch (node.operator) {
      case "+":
        return Number(left) + Number(right)
      case "-":
        return Number(left) - Number(right)
      case "*":
        return Number(left) * Number(right)
      case "/":
        return Number(left) / Number(right)
      default:
        throw new Error(`Unknown operator: ${node.operator}`)
    }
  }

  evalVariableDeclaration(node) {
    const value = this._eval(node.value)

    this.symbolTable.assign(node.identifier, {
      kind: node.kind,
      value: value,
    })

    return value
  }

  evalIdentifier(node) {
    const info = this.symbolTable.lookup(node.name)
    return info.value
  }
}
