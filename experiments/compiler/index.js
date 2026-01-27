import { delimitCode, tokenize } from "./lexer.js"
import Parser from "./parser.js"
import SymbolTable from "./symbolTable.js"
import Evaluator from "./evaluator.js"

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

    const evaluator = new Evaluator()
    return evaluator.evaluate(ast, parser.symbolTable)
  } catch (e) {
    console.error("Compilation failed", e.message)
  }
}

codeForm.addEventListener("submit", handleCodeSubmit)
