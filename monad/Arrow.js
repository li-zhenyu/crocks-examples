const { Arrow, option, chain, safe, prop, isString } = require('crocks')
const { toUpper, compose } = require('ramda')

const arrUpper = Arrow(toUpper)
console.log(
    arrUpper.runWith('nice')
)

const getName = compose(
    option('no name'),
    chain(safe(isString)),
    prop('name')
)

console.log(
    getName({ nameB: 'zhenyu' })
)

