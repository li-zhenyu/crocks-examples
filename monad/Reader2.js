const { Reader, Maybe, curry, liftA2, assign, B, objOf, option, prop } = require('crocks')

const { ask } = Reader

const data = {
  happy: true,
  sad: true
}

const pairUp = liftA2(curry(
  (x, y) => [x, y]
))

// Reader env (Maybe Bool)
const happy = ask(prop('happy'))
const sad = ask(prop('sad'))

const m = happy.chain(h => sad.map(pairUp(h)))

console.log(
  m.runWith(data)
)