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

// delimiters
const delimiters = {
  whitespace: [" ", "\n", "\t"], // Characters we truly want to throw away
  syntax: ["(", ")", "{", "}", "[", "]", ";", ",", "."], // Characters we want to keep
  operator: ["+", "-", "*", "/", "=", "!", "<", ">", "&", "|", "^", "%"],
}

// Delimiter
const delimitCode = (code) => {
  let codeArray = []
  let currentCode = ""
  let inString = false

  for (let i = 0; i < code.length; i++) {
    let char = code[i]
    let nextChar = code[i + 1]

    // 1. Strings (Unchanged)
    if (char === '"') {
      currentCode += char
      if (inString) {
        codeArray.push(currentCode)
        currentCode = ""
        inString = false
      } else {
        inString = true
      }
      continue
    }
    if (inString) {
      currentCode += char
      continue
    }

    const isWhitespace = delimiters.whitespace.includes(char)
    const isSyntax = delimiters.syntax.includes(char)
    const isOp = delimiters.operator.includes(char)

    // 2. If it's anything other than a normal letter, flush the buffer
    if (isWhitespace || isSyntax || isOp) {
      if (currentCode) {
        codeArray.push(currentCode)
        currentCode = ""
      }
    }

    // 3. Handle Operators (Peeking logic)
    if (isOp) {
      if (
        (char === "=" && nextChar === "=") ||
        (char === "+" && nextChar === "+") ||
        (char === "!" && nextChar === "=") ||
        (char === "&" && nextChar === "&") ||
        (char === "|" && nextChar === "|")
      ) {
        // Triple Equals check
        if (char === "=" && nextChar === "=" && code[i + 2] === "=") {
          codeArray.push("===")
          i += 2
        } else {
          codeArray.push(char + nextChar)
          i++
        }
      } else {
        codeArray.push(char)
      }
      continue
    }

    // 4. Handle Syntax (KEEP these)
    if (isSyntax) {
      codeArray.push(char)
      continue
    }

    // 5. Handle Whitespace (DISCARD these)
    if (isWhitespace) {
      continue
    }

    // 6. Normal Characters
    currentCode += char
  }

  if (currentCode) codeArray.push(currentCode)
  return codeArray
}
// Gets the code
// intialize
// codeArray - store the individual lexemes
// currentCode - current incomplete lexeme for looping
// start the loop on each character of the code
// if the char is not in the delimiters list add it to the current code and next loop
// if the char is in the delimiters list
// add the currentCode to the codeArray if the currentCode is not empty
// set currentCode to empty
// if the delimiter is a skip delimiter go to next loop
// if the delimiter is not a skip delimiter
// add it to the codeArray

// Tokens:
const keywords = [
  "const",
  "let",
  "var",
  "function",
  "if",
  "else",
  "return",
  "true",
  "false",
]

const tokenize = (lexemes) => {
  return lexemes.map((lexeme) => {
    if (keywords.includes(lexeme)) {
      return { type: "KEYWORD", value: lexeme }
    }

    if (lexeme.startsWith('"') || lexeme.startsWith("'")) {
      return { type: "STRING", value: lexeme }
    }

    if (!isNaN(lexeme) && lexeme.trim() !== "") {
      return { type: "NUMBER", value: lexeme }
    }

    if (delimiters.operator.includes(lexeme[0])) {
      return { type: "OPERATOR", value: lexeme }
    }

    if (delimiters.syntax.includes(lexeme)) {
      return { type: "PUNCTUATION", value: lexeme }
    }

    return { type: "IDENTIFIER", value: lexeme }
  })
}
