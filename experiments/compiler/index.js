import { delimitCode, tokenize } from "./lexer.js"
import Parser from "./parser.js"

console.log("Compiler Started")

const codeForm = document.getElementById("codeForm")

const handleCodeSubmit = (e) => {
  e.preventDefault()
  try {
    const code = document.getElementById("codeEntry").value
    const lexemes = delimitCode(code)
    const tokens = tokenize(lexemes)

    const parser = new Parser(tokens)
    const ast = parser.parse()

    console.log("Parsed code is: ", ast)
  } catch (e) {
    console.error("Compilation failed", e.message)
  }
}

codeForm.addEventListener("submit", handleCodeSubmit)
