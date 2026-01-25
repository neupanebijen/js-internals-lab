import { delimitCode, tokenize } from "./lexer.js"

// This is the start of the lexer
console.log("Lexer Started")

const codeForm = document.getElementById("codeForm")

const handleCodeSubmit = (e) => {
  e.preventDefault()

  const code = document.getElementById("codeEntry").value
  const lexemes = delimitCode(code)
  const tokens = tokenize(lexemes)

  console.log("Delimited Code is: ", tokens)
}
