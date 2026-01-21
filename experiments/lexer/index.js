// Attempt to build a simple local lexer for Javascript
console.log("Lexer started")

// Basic declarations
const codeForm = document.getElementById("codeForm")

// Event handlers
const handleCodeSubmit = (e) => {
  e.preventDefault()
  const code = document.getElementById("codeEntry").value

  const delimitedCharacters = delimitCode(code)
  console.log("Delimited Code: ", delimitedCharacters)
}

// delimiters
const delimitersSkip = [
  " ",
  "\n",
  "\t",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  ";",
  ",",
  ".",
]

const delimitersOperator = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "!",
  "<",
  ">",
  "&",
  "|",
  "^",
  "%",
]

const delimitCode = (code) => {
  let delimitedCode = []
  let currentCode = ""
  for (const char of code) {
    if (!delimitersSkip.includes(char) && !delimitersOperator.includes(char)) {
      currentCode = currentCode + char
      continue
    }
    // Add the characters before delimition to the array and rest the character storage
    if (currentCode) delimitedCode = [...delimitedCode, currentCode]
    currentCode = ""

    if (delimitersSkip.includes(char)) {
      continue
    }

    delimitedCode = [...delimitedCode, char]
  }
  if (currentCode) delimitedCode = [...delimitedCode, currentCode]
  return delimitedCode
}
