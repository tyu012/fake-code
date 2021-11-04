/* settings */


const MAX_ID_LENGTH = 12


/**
 * variables
 * 
 * Each variable created by the generator is saved in this array.
 * Variables in one scope are added to the object at the end of the array.
 * 
 * When a new scope is created, a new, empty object is pushed to the array;
 * when the scope is destroyed, that object is popped from the array.
 * 
 * @example: [{'foo': 'string', 'bar': 'number'}, {'hello': 'string'}]
 */
let variables = [{}]


/* data */


const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const variableTypes = [
  'number',
  'string',
  'boolean',
]


/**
 * @returns string containing multiple lines of code
 */
const generate = () => {
  return
}


/**
 * @param type string that is an appropriate variable type
 * @returns string creating one line of code for a variable declaration 
 */
const generateVariableDeclaration = type => {
  let variable
  if (type === 'number') {
    variable = generateNumberDeclaration()
  } else if (type === 'string') {
    variable = generateStringDeclaration()
  } else if (type === 'boolean') {
    variable = generateBooleanDeclaration()
  }

  variables[variables.length - 1][variable.id] = variable.type
  return `let ${variable.id} = ${variable.value}`
}


/*
 * Declaration generators
 * generated variables follows the format
 * {
 *   id:
 *   type:
 *   value: 
 * }
 */


const generateNumberDeclaration = () => {
  return {
    id: generateId(),
    type: 'number',
    value: randomInt(128),
  }
}


const generateStringDeclaration = () => {
  return {
    id: generateId(),
    type: 'string',
    value: generateId(12),
  }
}


const generateBooleanDeclaration = () => {
  return {
    id: generateId(),
    type: 'boolean',
    value: randomInt(2) === 0 ? false : true
  }
}

/* Helper functions */

/**
 * @param upperBound
 * @returns a random integer in the range [0, upperBound)
 */
const randomInt = upperBound => Math.floor(Math.random() * upperBound)


/**
 * @returns a random sequence of characters
 * @param 
 */
 const generateId = maxLength => {
  let id = ''
  const length = randomInt(maxLength || MAX_ID_LENGTH)

  for (let i = 0; i < length; i++) {
    id += alphabet[randomInt(alphabet.length)]
  }

  return id
}

// WIP
console.log(generate())