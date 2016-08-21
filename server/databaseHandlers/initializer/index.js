require('dotenv').config()
require('babel-register')
const readline = require('readline')

const instructions = `
====================
Enter 'createTable' to create tables. 
Enter 'initializeValues' to set initial values in tables. (do this only after the tables are created)
Enter 'close' to exit
====================
`
console.info(instructions)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '[createTable or initializeValues or close] > ',
})

rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'createTable':
      require('./createTables.js')
      break
    case 'initializeValues':
      require('./initializeValues')
      break
    case 'close':
      rl.close()
      break
    default:
      console.info(instructions)
      break
  }
  rl.prompt()
})

rl.on('close', () => {
  console.info('Have a great day!')
  process.exit(0)
})
