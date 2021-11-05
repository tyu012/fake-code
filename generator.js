const _ = require('lodash')


/* settings */


const MAX_ID_LENGTH = 12
const MAX_INT = 128
const MAX_CODE_LENGTH = 500


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
const code = [
  'declaration',
  'assignment',
  'conditional',
]
const variableTypes = [
  'number',
  'string',
  'boolean',
]
const conditionalTypes = [
  'if',
  'ifElse',
]


/**
 * @returns string containing multiple lines of code
 * @param maxLength max length of generated code, defaults to MAX_CODE_LENGTH
 */
const generate = (maxLength, props) => {
  let generatedCode = ''

  while (generatedCode.length < (maxLength || MAX_CODE_LENGTH)) {
    // add generated code
    const nextCode = randomElementFrom(code)

    for (let i = 0; i < variables.length - 1; i++) {
      generatedCode += ' '
    }

    if (nextCode === 'declaration') {
      generatedCode += `${generateDeclaration(randomElementFrom(variableTypes))}\n`
    } else if (nextCode === 'assignment') {
      generatedCode += `${generateAssignment()}\n`
    } else if (nextCode === 'conditional') {
      generatedCode += `` 
    }
  }

  return generatedCode
}


/**
 * @param type string that is an appropriate variable type
 * @returns string creating one line of code for a variable declaration 
 */
const generateDeclaration = type => {
  let variable
  do {
    if (type === 'number') {
      variable = generateNumberDeclaration()
    } else if (type === 'string') {
      variable = generateStringDeclaration()
    } else if (type === 'boolean') {
      variable = generateBooleanDeclaration()
    }
  } while (variables[variables.length - 1][variable.id])

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
    value: randomInt(MAX_INT),
  }
}


const generateStringDeclaration = () => {
  return {
    id: generateId(),
    type: 'string',
    value: `'${generateId()}'`,
  }
}


const generateBooleanDeclaration = () => {
  return {
    id: generateId(),
    type: 'boolean',
    value: randomInt(2) === 0 ? false : true
  }
}

/* Assignment generators */


const generateAssignment = () => {
  // let name
  // let type
  // let value

  // for (let i = variables.length - 1; i >= 0; i--) {
  //   if (variables[i] !== undefined && variables[i] !== {}) {
  //     name = randomElementFrom(_.keys(variables[i]))
  //     type = variables[i][name]
  //     break
  //   }
  // }

  let v = findVariable()
  let name, type, value
  if (v !== undefined) { ({ name, type } = v) }

  if (name === undefined) { return generateDeclaration(_.sample(variableTypes)) }
  if (type === 'number') { value = randomInt(MAX_INT) }
  if (type === 'string') { value = `'${generateId()}'` }
  if (type === 'boolean') { value = randomInt(2) === 0 ? false : true }

  return `${name} = ${value}`
}


/*
 * Conditional generator
 * generated variables follow the format
 * {
 *   type:
 *   condition:
 *   code:
 * }
 */


/**
 * 
 * @param type the type of conditional that is used
 * @returns string of one block of conditional code
 */
const generateConditional = type => {
  
  return `${conditional.type} (${conditional.condition}) {\n ${conditional.code}}`
}


/* Helper functions */


/**
 * @param upperBound
 * @returns a random integer in the range [0, upperBound)
 */
const randomInt = upperBound => Math.floor(Math.random() * (upperBound || MAX_INT))


/**
 * @returns a random sequence of characters
 * @param maxLength max length for the sequence of characters;
 * if not present defaults to global constant MAX_ID_LENGTH
 */
const generateId = maxLength => {
  let id = ''
  const length = randomInt(maxLength || MAX_ID_LENGTH) + 1

  for (let i = 0; i < length; i++) {
    id += alphabet[randomInt(alphabet.length)]
  }

  return id
}


/**
 * @param arr
 * @returns random element from array arr
 */
const randomElementFrom = arr => arr[randomInt(arr.length)]


/**
 * @param type specified type, defaults to all variables
 * @returns a random object { name: '', type: '' } corresponding to a variable
 * that matches the specified type, or undefined if no match is found
 */
const findVariable = type => {
  for (let i = variables.length - 1; i >= 0; i--) {
    if (variables[i] !== undefined && variables[i] !== {}) {

      const keys = _.shuffle(_.keys(variables[i]))
      for (let j = 0; j < keys.length; j++) {
        const nameFound = keys[j]
        const typeFound = variables[i][nameFound]

        if (type === undefined || typeFound === type) {
          return {
            name: nameFound,
            type: typeFound,
          }
        }
      }

    }
  }
  return undefined
}

// WIP
console.log(generate())