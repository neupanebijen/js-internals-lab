// This is to test the differences betweent the top level AST nodes
// Program vs Module
// Program has sourceType: "script"
// Module has sourceType: "module"

// Program
// top-level var => globla object?
// to-level let/const => global lexical environment?
// this === window (browser)

// Module
// Always strict mode
// No bidings on global object
// Top-level this === undefined
// Has its own module scope, not classic global scope

// A module does not create a traditional global scope, even though it is top level

function TestFunction(self) {
  if (self) {
    console.log("Logging this from inside a export (self called) : ", this)
  } else {
    console.log(
      "Logging this from inside a export (another file called: ",
      this,
    )
  }
}

TestFunction(false)

export default TestFunction
