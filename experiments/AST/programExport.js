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

console.log('Logging "this" from a normal script: ', this)
