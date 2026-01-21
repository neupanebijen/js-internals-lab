const hoistingError = () => {
  console.log(x)
  var x = 10
}

hoistingError()

// Predicted Result - undefined
// Actual Result - undefined
// Reasoning: In JS, variable declarations using 'var' are hoisted to the top of the block scope.
// however, the initialization reamains in it original place. As such, the variable declartion is available for all of the block, even above intialization without having its actual value.
// Meaning - var x (the declaration) and x = 10(the initialization) are seperated.
// var x is sent to the top making it available for rest of the program above the actual declaration and intialization.
// let and const do not show this behavior and will throw a reference error when tried to access which lets the programmer know that they are trying to access a variable that is not there.
