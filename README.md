Currently learning - Lexical analysis
Implementation goal - create a limited local lexer in js

User Lifecycle:
Get user to input code in html.
Take that code.
Break it into characters.
Use whitespaces to sepearte the characters into sequences
Compare the character sequences to the lexical analysis array.
Update the UI with lexical catergory assigned to each character.

JS lifecycle:
handleCodeSubmit event is triggered
Break the input into character sequences by seperating characters by whitespaces
Check each of those character sequence against the lexer's keyword and toke classification tables
Return the character sequence as token with accurate classification.
Update the UI with that classification.

---

GPT refinement:
User lifecycle:
user inputs source code in an html input area
the input code is captured as a raw string
the string is processed character by character
characters are grouped int lexemes using whitespace and delimiter rules. (? dunno atm)
each lexeme is compared against lexer's toke classification table
the ui is updated to display the token type assigned to each lexeme

JS lifecycle:
handleCodeSubmit event is triggered
read the input string
iterate throught the characters to form lexemes (using whitespace and delimiters)
match each lexeme against the lexer's keyword, operator, literal and identifier tables
emit a token object {type, value} for each lexeme
update the UI with the emitted tokens and their classifications

---

Program requirements:
HTML:

- frontpage (with textinput and js loaded)
  JS:
- Event handler to listen for the code submit
- Delimiters list
- Keywords list
- Character seperation function
- Delimit function
- Keyword match function
- Error push function
- Update the tokens to the frontpage
