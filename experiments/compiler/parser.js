// I did copy it without looking, but the logic for parseVariable declaration was taken from the AI.

export default class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.cursor = 0
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
    // If this starts with a keywords, it's a likely declaration
    if (
      token.type === "KEYWORD" &&
      (token.value === "let" || token.value === "const")
    ) {
      return this.parseVariableDeclaration() // If the token type is a keyword, it is likely a variable declaration
    }

    this.consume()
  }

  // This function is a real **** magic. Just consume and cursor moves forward. The brilliance to create such simplicity.
  parseVariableDeclaration() {
    const kind = this.consume().value // consume called. But what does .value() behind the consume do?
    const id = this.expect("IDENTIFIER", "Expected variable name").value
    this.expect("OPERATOR", "Expected '=' after variable name")
    const val = this.expect("NUMBER", "Expected number value").value
    this.expect("PUNCTUATION", "Expected ';' at the end of line")

    return {
      type: "VariableDeclaration",
      kind: kind,
      identifier: id,
      value: val,
    }
  }
}
