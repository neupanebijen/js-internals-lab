// I did copy it without looking, but the logic for parseVariable declaration was taken from the AI.
import SymbolTable from "./symbolTable.js"
export default class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.cursor = 0
    this.symbolTable = new SymbolTable()
  }

  // Return the token at the current cursor value
  peek() {
    return this.tokens[this.cursor]
  }

  // Return the token at the current cursor value and update the cursor by 1.
  consume() {
    return this.tokens[this.cursor++] // so this.cursor++ return the old value first then increment the value in the memory
  }

  // Present a type and the error message. get the token. if token type and the passed type match, return the token at the next cursor value? Doesn't make sense
  expect(type, errorMessage) {
    const token = this.peek()
    if (token && token?.type === type) {
      return this.consume()
    }

    throw new Error(`${errorMessage} - Expected ${type} but got ${token?.type}`)
  }

  // Create the to level program Node. Add to the body after calling the parseStatement
  parse() {
    const ast = { type: "Program", sourceType: "script", body: [] }
    while (this.cursor < this.tokens.length) {
      const statement = this.parseStatement()
      if (statement) {
        ast.body.push(statement)
      }
    }

    return ast
  }

  parseStatement() {
    const token = this.peek() // get the token at the current cursor position

    if (!token) return null

    // handle {} blocks

    if (token.type === "PUNCTUATION" && token.value === "{") {
      return this.parseBlock()
    }

    // If this starts with a keywords, it's a likely declaration
    if (
      token.type === "KEYWORD" &&
      (token.value === "let" || token.value === "const")
    ) {
      return this.parseVariableDeclaration() // If the token type is a keyword, it is likely a variable declaration
    }

    this.consume()
  }

  parseBlock() {
    this.expect("PUNCTUATION", "Expected '{' to start block")

    // Enter new scope
    this.symbolTable.pushScope()

    const body = []

    // keep parsing statements until we hit '}'
    while (this.peek() && this.peek().value !== "}") {
      const statement = this.parseStatement()
      if (statement) body.push(statement)
    }

    //leave the scope
    this.symbolTable.popScope()

    this.expect("PUNCTUATION", "Expected '}' to end block")

    return {
      type: "BlockStatement",
      body: body,
    }
  }

  // This function is a real magic. Just consume and cursor moves forward. The brilliance to create such simplicity.
  parseVariableDeclaration() {
    const kind = this.consume().value // consume called. But what does .value() behind the consume do?
    const id = this.expect("IDENTIFIER", "Expected variable name").value

    this.symbolTable.define(id, { kind: kind, initialized: true })

    this.expect("OPERATOR", "Expected '=' after variable name")

    const val = this.parseExpression()
    this.expect("PUNCTUATION", "Expected ';' at the end of line")

    return {
      type: "VariableDeclaration",
      kind: kind,
      identifier: id,
      value: val,
    }
  }
  // Test : 5+5(5/5)
  parseExpression() {
    let left = this.parseTerm()

    while (
      this.peek() && // important to check if the statement is already parsed
      (this.peek().value === "+" || this.peek().value === "-")
    ) {
      const operator = this.consume().value
      const right = this.parseTerm()

      left = {
        type: "BinaryExpression",
        operator: operator,
        left: left,
        right: right,
      }
    }
    return left
  }

  parseTerm() {
    let left = this.parseFactor()

    while (
      this.peek() &&
      (this.peek().value === "*" || this.peek().value === "/")
    ) {
      const operator = this.consume().value
      const right = this.parseFactor()

      left = {
        type: "BinaryExpression",
        operator: operator,
        left: left,
        right: right,
      }
    }
    return left
  }

  parseFactor() {
    const token = this.peek() // gives the current token?

    if (token.type === "NUMBER") {
      return { type: "Literal", value: this.consume().value }
    }

    if (token.type === "IDENTIFIER") {
      return { type: "Identifier", name: this.consume().value }
    }

    if (token.value === "(") {
      this.consume()
      const expression = this.parseExpression()
      this.expect("PUNCTUATION", "Expected ')' to close expression")

      if (this.peek().value !== ")") throw new Error("Expected ')'")
      this.consume()
      return expression
    }
    throw new Error(`Unexpected token in expression: ${token.value}`)
  }
}
